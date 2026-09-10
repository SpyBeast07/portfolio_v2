import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import {
	navItems,
	sideNavItems,
	role,
	email,
	quote,
	resume,
	socialLinks,
	now as nowData,
	about as aboutData,
	experiences,
	education,
	skills,
	projectCategories,
	projects,
	pageHeadings,
	blogs as blogsData
} from '$lib/data';

// localStorage snapshot of the full SiteData. Firestore's IndexedDB cache is
// async to read, so it can't prevent an empty first paint on reload — this
// synchronous snapshot can. On bootstrap the store hydrates instantly from it,
// then Firestore re-checks for changes in the background and keeps it fresh.
const STORAGE_KEY = 'site-data-cache-v1';

function readCache(): Partial<SiteData> | null {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === 'object' ? (parsed as Partial<SiteData>) : null;
	} catch {
		return null;
	}
}

function writeCache(value: SiteData) {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	} catch {
		// Storage full/unavailable (private mode, quota) — cache is best-effort.
	}
}

export interface SiteData {
	navItems: { name: string; href: string }[];
	sideNavItems: { name: string; href: string }[];
	role: { line1: string; line2: string };
	email: string;
	quote: string;
	resume: { url: string; filename: string };
	socialLinks: SocialLink[];
	now: {
		lastUpdated: string;
		sections: {
			title: string;
			items: { text: string; links?: { label: string; url: string }[] }[];
		}[];
	};
	about: { headline: string; photo: string; long: string[] };
	experiences: Experience[];
	education: Education[];
	skills: Record<string, string[]>;
	projectCategories: string[];
	projects: Project[];
	pageHeadings: {
		work: { title: string; description: string };
		blogs: { title: string; description: string };
	};
	blogs: Blog[];
}

interface SocialLink {
	label: string;
	href: string;
}

interface Experience {
	title: string;
	subtitle: string;
	date: string;
	location: string;
	type: string;
	description: string;
	story?: string;
	tags: string[];
}

interface Education {
	title: string;
	subtitle: string;
	date: string;
	cgpa?: string;
	description: string;
	related?: Education[];
	logo?: string;
	story?: string;
}

interface Project {
	title: string;
	description: string;
	tags: string[];
	image?: string;
	githubLink?: string;
	demoLink?: string;
	category: string;
	slug?: string;
	timeline?: string;
	highlights?: string[];
	about?: string;
	screenshots?: string[];
}

interface Blog {
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	slug: string;
	image?: string;
	content: string;
}

// Empty defaults — the template for what gets filled in from Firestore. The
// shared fields below are always taken from src/lib/data/index.ts (the codebase)
// and never stored in or read from Firestore.
export const emptySiteData: SiteData = {
	navItems: [],
	sideNavItems: [],
	role: { line1: '', line2: '' },
	email: '',
	quote: '',
	resume: { url: '', filename: '' },
	socialLinks: [],
	now: { lastUpdated: '', sections: [] },
	about: { headline: '', photo: '', long: [] },
	experiences: [],
	education: [],
	skills: {},
	projectCategories: [],
	projects: [],
	pageHeadings: {
		work: { title: '', description: '' },
		blogs: { title: '', description: '' }
	},
	blogs: []
};

// Hydrate instantly from the last known data (localStorage snapshot) if there
// is one, so reloads render full content immediately with zero empty flash.
// The shared fields are pinned to the codebase (src/lib/data/index.ts) and
// never taken from the cache.
export const siteData = writable<SiteData>({
	...emptySiteData,
	...readCache(),
	navItems,
	sideNavItems,
	role,
	email,
	quote,
	resume,
	socialLinks,
	pageHeadings
});

// Every store change is mirrored into localStorage so the next reload can
// restore from it synchronously. (Writes don't feed back into the store, so
// no loop occurs.)
siteData.subscribe((value) => writeCache(value));

// 'loading' until the first Firestore snapshot arrives, then 'firebase'.
// Falls back to 'local' only when Firestore itself errors.
export const dataSource = writable<'loading' | 'firebase' | 'local'>('loading');

// Full snapshot of src/lib/data, matching the SiteData shape, used only when
// Firestore is unreachable/errored. Kept as a fallback, never the primary read.
function buildFallback(): SiteData {
	return {
		navItems,
		sideNavItems,
		role,
		email,
		quote,
		resume,
		socialLinks,
		now: nowData,
		about: aboutData,
		experiences,
		education,
		skills,
		projectCategories,
		projects,
		pageHeadings,
		blogs: blogsData
	};
}

let fallbackApplied = false;
function applyFallback() {
	if (fallbackApplied) return;
	fallbackApplied = true;
	siteData.set(buildFallback());
	dataSource.set('local');
	console.warn(
		'[site-data] Firestore unavailable — site is running on the local fallback data (src/lib/data).'
	);
}

let started = false;

// Subscribe to the Firestore docs and mirror every change straight into the
// siteData store — so data changed in Firestore (or by admin CRUD) shows up on
// the site live, without a redeploy or refresh.
export async function loadSiteData() {
	if (!browser || started) return;
	started = true;

	const { subscribeDoc } = await import('$lib/firestore');

	const subscribe = (docId: string, onData?: (data: Record<string, unknown>) => void) => {
		subscribeDoc<Record<string, unknown>>(
			docId,
			(data) => {
				if (data === null) return;
				dataSource.set('firebase');
				onData?.(data);
			},
			(err) => {
				console.warn(`[site-data] Firestore unavailable for "${docId}".`, err);
				applyFallback();
			}
		);
	};

	// Each document's fields are already the top-level SiteData keys, so the
	// store can be extended with a plain spread of the document. Shared fields
	// (navItems, sideNavItems, role, email, quote, resume, socialLinks,
	// pageHeadings) always come from the codebase and are never read from
	// Firestore. The 'shared' doc is intentionally NOT subscribed here.
	const stripShared = (data: Record<string, unknown>, shared: string[]) => {
		const rest: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(data)) {
			if (!shared.includes(key)) rest[key] = value;
		}
		return rest;
	};

	const sharedKeys = [
		'navItems',
		'sideNavItems',
		'role',
		'email',
		'quote',
		'resume',
		'socialLinks',
		'pageHeadings'
	];

	subscribe('now', (data) => siteData.update((s) => ({ ...s, ...data })));
	subscribe('about', (data) => siteData.update((s) => ({ ...s, ...data })));
	subscribe('work', (data) => siteData.update((s) => ({ ...s, ...stripShared(data, sharedKeys) })));
	subscribe('blogs', (data) => siteData.update((s) => ({ ...s, ...data })));
}
