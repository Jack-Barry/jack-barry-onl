import { GRAPH_QUERIES_PRISMIC } from '$lib/api/common/prismic/index.js';
import { apiPrismic } from '$lib/api/server/prismic.js';
import { BlogPostSearchParams } from '$lib/api/common/prismic/BlogPostSearchParams.js';

export const prerender = false;

/** Gets blog posts from prismic */
export const GET = async ({ fetch, url }) => {
	const { searchParams } = url;

	const { asOptions } = new BlogPostSearchParams(searchParams);

	const data = await apiPrismic({ fetch }).blogPosts.get({
		...asOptions,
		graphQuery: asOptions.previewsOnly
			? GRAPH_QUERIES_PRISMIC.GET_BLOG_POSTS.PREVIEWS_ONLY
			: undefined
	});
	return new Response(JSON.stringify(data), { status: 200 });
};
