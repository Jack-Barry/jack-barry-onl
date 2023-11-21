import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'https://cdn.heapanalytics.com', 'https://heapanalytics.com'],
				'img-src': [
					'self',
					'data:',
					'https://heapanalytics.com',
					'https://images.prismic.io',
					'https://prismic-io.s3.amazonaws.com'
				],
				'style-src': ['self', 'https://fonts.googleapis.com', 'https://heapanalytics.com'],
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
