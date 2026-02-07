import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
    if (browser) {
        const stored = localStorage.getItem('theme') as Theme;
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark'; // Default SSR theme
};

export const theme = writable<Theme>(getInitialTheme());

if (browser) {
    theme.subscribe((value) => {
        localStorage.setItem('theme', value);
        if (value === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    });
}
