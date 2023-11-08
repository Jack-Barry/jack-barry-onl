import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';

export const prerender = false;

export const load = async ({ url }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: Infinity
				// refetchOnWindowFocus: false,
				// refetchOnMount: false,
				// refetchOnReconnect: false
			}
		}
	});

	return { pathname: url.pathname, queryClient };
};
