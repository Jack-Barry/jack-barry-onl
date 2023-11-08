import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';

export const prerender = true;

export const load = async ({ url }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: Infinity
			}
		}
	});

	return { pathname: url.pathname, queryClient };
};
