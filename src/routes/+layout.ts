import { QueryClient } from '@tanstack/svelte-query';

import { browser } from '$app/environment';

export const prerender = true;

export const load = async ({ data }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: Infinity
			}
		}
	});

	return { ...data, queryClient };
};
