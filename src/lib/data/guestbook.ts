// ─── Guestbook Data ───────────────────────────────────────────────────────────
// Defines the shape of a guestbook entry stored in Firestore at data/guestbook.
// Each entry represents a visitor's signature on the site.

export interface GuestbookEntry {
	/** Unique ID (crypto.randomUUID or Date.now-based) */
	id: string;
	/** Display name from Google / GitHub profile */
	name: string;
	/** Email from auth profile */
	email: string;
	/** Avatar URL */
	photoURL: string;
	/** The visitor's message */
	message: string;
	/** Unix timestamp (Date.now()) */
	createdAt: number;
	/** Whether the entry is pinned by admin */
	isPinned?: boolean;
}

