import { readFileSync } from 'node:fs';

import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';

import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), svg(), rawFonts(['.ttf'])],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

function rawFonts(ext: string[]) {
	return {
		name: 'vite-plugin-raw-fonts',
		transform(_: unknown, id: string) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = readFileSync(id);
				return { code: `export default ${JSON.stringify(buffer)}`, map: null };
			}
		}
	};
}
