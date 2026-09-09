export function jsonEqual(a: unknown, b: unknown): boolean {
	return JSON.stringify(a ?? undefined) === JSON.stringify(b ?? undefined);
}