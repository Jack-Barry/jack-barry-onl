import { queryKeys } from '$lib/api/client/queryKeys.js';
import { GRAPH_QUERIES_PRISMIC } from '$lib/api/common/prismic.js';
import { fetchJson } from '$lib/utils/fetch.js';

export const prerender = true;

export const load = async ({ data, parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchInfiniteQuery({
		initialPageParam: 1,
		queryKey: queryKeys.prismic.blog_post.infinite({ graphQuery: GRAPH_QUERIES_PRISMIC.GET_BLOG_POSTS.PREVIEWS_ONLY }),
		async queryFn() {
			return await fetchJson(fetch, '/api/prismic/blog_post?page=1&previewsOnly=true');
		}
	});

	return data;
};
