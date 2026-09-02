import { app } from '$lib/firebase';
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	deleteDoc as firestoreDeleteDoc,
	onSnapshot,
	initializeFirestore,
	persistentLocalCache,
	persistentMultipleTabManager
} from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

// Firestore collection that holds the site content. One document per domain:
//   data/now    → { now }
//   data/about  → about, experiences, education, skills
//   data/work   → projectCategories, projects, pageHeadings
//   data/blogs  → blogs
// This mirrors the local files that used to live in src/lib/data. The local
// files remain as the seed source (via `npm run seed:firebase`) and as an
// offline fallback if Firestore ever errors; the site's primary data source is
// Firestore itself.
export const DATA_COLLECTION = 'data';

// Persistent local cache (IndexedDB). Firestore caches every read document in
// the browser, so on a reload it serves them instantly from cache instead of
// re-fetching — then re-checks the server in the background (via the onSnapshot
// listeners in loadSiteData) and refreshes the cache when anything changed.
// It also keeps the site working while offline. Only used client-side.
export const db: Firestore = initializeFirestore(app, {
	localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

export function docRef(docId: string) {
	return doc(db, DATA_COLLECTION, docId);
}

// ─── Reads ───────────────────────────────────────────────────────────────────
// All read helpers are client-side. Use them inside browser contexts only.

export async function readDoc<T>(docId: string): Promise<T | null> {
	const snap = await getDoc(docRef(docId));
	return snap.exists() ? (snap.data() as T) : null;
}

// Real-time subscription. Returns an unsubscribe function.
export function subscribeDoc<T>(
	docId: string,
	onData: (data: T | null) => void,
	onError?: (err: Error) => void
): () => void {
	return onSnapshot(docRef(docId), {
		next: (snap) => onData(snap.exists() ? (snap.data() as T) : null),
		error: (err) => onError?.(err instanceof Error ? err : new Error(String(err)))
	});
}

// ─── Writes (used by the admin portal + future CRUD) ────────────────────────
// These are user-side writes, so they pass only when the signed-in user is the
// owner (see the Firestore rules). Domain-specific add/update/delete functions
// can be built on top of these later, e.g.:
//   export const addBlog = (blog: Blog) => saveDoc('blogs', { blogs: [...current, blog] })

export function saveDoc(docId: string, data: Record<string, unknown>): Promise<void> {
	return setDoc(docRef(docId), data);
}

export function patchDoc(docId: string, data: Record<string, unknown>): Promise<void> {
	return updateDoc(docRef(docId), data);
}

export function deleteDocData(docId: string): Promise<void> {
	return firestoreDeleteDoc(docRef(docId));
}