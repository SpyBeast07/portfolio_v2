import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { Auth, User } from 'firebase/auth';
import { app } from '$lib/firebase';

// Lazy auth instance — only created the first time it's needed, always in the
// browser (the /login and /admin pages are client-only, never SSR'd).
let auth: Auth | null = null;

export function getAuthInstance(): Auth {
	if (!auth) {
		auth = getAuth(app);
	}
	return auth;
}

const AUTH_ERROR_MESSAGES: Record<string, string> = {
	'auth/invalid-email': 'Enter a valid email address.',
	'auth/user-disabled': 'This account has been disabled.',
	'auth/user-not-found': 'No account found with this email.',
	'auth/wrong-password': 'Incorrect password.',
	'auth/invalid-credential': 'Incorrect email or password.',
	'auth/invalid-login-credentials': 'Incorrect email or password.',
	'auth/too-many-requests': 'Too many tries. Please wait a bit and try again.'
};

export async function signIn(email: string, password: string): Promise<User> {
	try {
		const credentials = await signInWithEmailAndPassword(getAuthInstance(), email, password);
		return credentials.user;
	} catch (err) {
		const code = err instanceof Error ? (err as { code?: string }).code : undefined;
		const message = code ? AUTH_ERROR_MESSAGES[code] : undefined;
		throw new Error(message ?? 'Unable to sign in. Please try again.');
	}
}

export async function signOutUser(): Promise<void> {
	await signOut(getAuthInstance());
}