import { queryKeys } from '$lib/api/client/queryKeys.js';
import { GRAPH_QUERIES_PRISMIC } from '$lib/api/common/prismic/index.js';
import { fetchJson } from '$lib/utils/fetch.js';
import { BlogPostSearchParams } from '$lib/api/common/prismic/BlogPostSearchParams.js';

export const prerender = false;

export const load = async ({ data, parent, fetch }) => {
	const { queryClient } = await parent();

	const initialPageParam = 1;
	await queryClient.prefetchInfiniteQuery({
		initialPageParam,
		queryKey: queryKeys.prismic.blog_post.infinite({
			graphQuery: GRAPH_QUERIES_PRISMIC.GET_BLOG_POSTS.PREVIEWS_ONLY
		}),
		async queryFn() {
			const searchParams = BlogPostSearchParams.fromOptions({
				pageNumber: initialPageParam,
				previewsOnly: true
			});
			return await fetchJson(
				fetch,
				'/api/prismic/blog_post?' + searchParams.asURLSearchParams.toString()
			);
		}
	});

	return data;
};
