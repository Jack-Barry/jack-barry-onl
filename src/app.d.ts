// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			breadcrumbs?: { label: string; href: string }[];
		}
		// interface Platform {}
	}
}

export {};

import '@poppanator/sveltekit-svg/dist/svg';
