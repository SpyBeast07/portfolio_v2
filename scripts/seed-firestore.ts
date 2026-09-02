/**
 * Seeds Firestore with the exact contents of src/lib/data.
 *
 * Uses the Firebase Admin SDK (service account), which bypasses the locked-down
 * Firestore rules — so this only needs GOOGLE_APPLICATION_CREDENTIALS pointing
 * at a service account JSON, never an interactive login.
 *
 * Setup:
 *   1. Get a service account key from Firebase Console → Project settings →
 *      Service accounts → Generate new private key.
 *   2. Save the downloaded JSON to ./service-account.json (git-ignored).
 *   3. npm run seed:firebase
 *
 * The site itself never reads these local files — they exist solely as the
 * source of truth used to populate Firestore via this script (and as reference
 * for the future admin portal).
 */
import 'dotenv/config';
import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { now } from '../src/lib/data/now';
import { about, experiences, education, skills } from '../src/lib/data/about';
import { projectCategories, projects, pageHeadings } from '../src/lib/data/work';
import { blogs } from '../src/lib/data/blogs';

const DATA_COLLECTION = 'data';

// One document per domain in src/lib/data. The shared data (nav, socials,
// identity) is NOT seeded — the site always reads it from src/lib/data/index.ts.
const DOCS: { id: string; data: Record<string, unknown> }[] = [
	{ id: 'now', data: { now } },
	{ id: 'about', data: { about, experiences, education, skills } },
	{ id: 'work', data: { projectCategories, projects, pageHeadings } },
	{ id: 'blogs', data: { blogs } }
];

function getCredentials() {
	if (process.env.FIREBASE_SERVICE_ACCOUNT) {
		return { credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) };
	}
	return { credential: applicationDefault() };
}

async function main() {
	const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
	if (!projectId) {
		throw new Error(
			'VITE_FIREBASE_PROJECT_ID is missing. Add it to .env (copy from .env.example).'
		);
	}
	if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.FIREBASE_SERVICE_ACCOUNT) {
		console.warn(
			'\n[seed] GOOGLE_APPLICATION_CREDENTIALS not set. Set it to the path of your ' +
				'service-account.json in .env, e.g.:\n' +
				'  GOOGLE_APPLICATION_CREDENTIALS=./service-account.json\n'
		);
	}

	initializeApp({ ...getCredentials(), projectId });
	const db = getFirestore();

	const force = process.argv.includes('--force');

	for (const { id, data } of DOCS) {
		const ref = db.collection(DATA_COLLECTION).doc(id);
		const snap = await ref.get();
		if (force || !snap.exists) {
			await ref.set(data);
			console.log(`Seeded ${DATA_COLLECTION}/${id}`);
		} else {
			console.log(`Skipped ${DATA_COLLECTION}/${id} (already has data). Use --force to overwrite.`);
		}
	}

	console.log('Done.');
	process.exit(0);
}

main().catch((err) => {
	console.error('Seeding failed:', err);
	process.exit(1);
});