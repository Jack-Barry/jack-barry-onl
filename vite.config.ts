import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), svg()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
