import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'https://heapanalytics.com', 'https://*.heapanalytics.com'],
				'img-src': [
					'self',
					'data:',
					'https://heapanalytics.com',
					'https://images.prismic.io',
					'https://prismic-io.s3.amazonaws.com',
					'https://storage.ko-fi.com'
				],
				'style-src': [
					'self',
					// 'unsafe-inline', // Would like to get rid of this...
					'https://fonts.googleapis.com',
					'https://heapanalytics.com'
				],
				'font-src': [
					'self',
					'https://fonts.gstatic.com',
					'https://heapanalytics.com',
					'https://*.auryc.com'
				],
				'connect-src': ['self', 'https://heapanalytics.com', 'https://*.auryc.com'],
				'worker-src': ['self', 'blob:']
			}
		}
	}
};

export default config;
