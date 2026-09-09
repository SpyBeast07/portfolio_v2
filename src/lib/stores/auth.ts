import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { getAuthInstance } from '$lib/auth';

// The signed-in Firebase user (null when signed out) and whether the initial
// session check has finished. `authReady` flips to true exactly once, after the
// first onAuthStateChanged callback fires, so guard routes can wait for it
// before deciding where to redirect.
export const user = writable<User | null>(null);
export const authReady = writable(false);

let started = false;

export function initAuth() {
	if (!browser || started) return;
	started = true;
	onAuthStateChanged(getAuthInstance(), (currentUser) => {
		user.set(currentUser);
		authReady.set(true);
	});
}