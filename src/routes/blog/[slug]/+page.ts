import { blogs } from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export interface TocItem {
    id: string;
    text: string;
    level: number;
}

export const load: PageLoad = async ({ params }) => {
    const blog = blogs.find((b) => b.slug === params.slug);
    if (!blog) {
        throw error(404, {
            message: 'Blog not found'
        });
    }

    // Auto-generate TOC and inject IDs into headings
    const toc: TocItem[] = [];

    // Replace h2/h3 tags and capture content to build TOC
    const parsedContent = blog.content.replace(/<h([23])>(.*?)<\/h\1>/g, (match, levelChar, text) => {
        // Create a URL-friendly ID from the heading text
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        toc.push({
            id,
            text: text.replace(/<\/?[^>]+(>|$)/g, ''), // Strip any inner HTML tags (e.g. <em>)
            level: parseInt(levelChar, 10)
        });

        return `<h${levelChar} id="${id}">${text}</h${levelChar}>`;
    });

    return { blog, parsedContent, toc };
};
