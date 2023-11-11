import { queryKeys } from '$lib/api/client/queryKeys.js';
import { fetchJson } from '$lib/utils/fetch.js';

export const prerender = true;

export const load = async ({ data, parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchInfiniteQuery({
		initialPageParam: 1,
		queryKey: queryKeys.prismic.blog_post.infinite({}),
		async queryFn() {
			return await fetchJson(fetch, '/api/prismic/blog_post?page=1');
		}
	});

	return data;
};
