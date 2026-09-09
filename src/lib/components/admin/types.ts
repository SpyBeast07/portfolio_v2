export type AdminFieldType = 'text' | 'textarea' | 'tags' | 'select' | 'children';

export interface AdminFieldDef {
	key: string;
	label: string;
	type?: AdminFieldType;
	placeholder?: string;
	hint?: string;
	rows?: number;
	options?: string[];
	childrenSchema?: AdminFieldDef[];
	addLabel?: string;
	full?: boolean;
}

// Loosely typed on purpose: editor forms accept many different array shapes
// from the site data (experiences, projects, blogs, …).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EditorItem = any;
export type EditorItems = EditorItem[];