import '@poppanator/sveltekit-svg/dist/svg';

import type { BreadcrumbConfig } from '$lib/components/layout/types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      /** App was build with `IS_TEST` environment variable set to `true` */
      isTestEnv: boolean;
      /** Breadcrumb data used for a route */
      breadcrumbs?: BreadcrumbConfig[];
    }
    // interface Platform {}
  }
}

export {};
