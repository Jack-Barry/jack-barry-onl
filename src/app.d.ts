import '@poppanator/sveltekit-svg/dist/svg';

import type { BreadcrumbConfig } from '$lib/components/layout/types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			breadcrumbs?: BreadcrumbConfig[];
		}
		// interface Platform {}
	}
}

export { };

