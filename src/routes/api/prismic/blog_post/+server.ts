import { GRAPH_QUERIES_PRISMIC } from '$lib/api/common/prismic.js';
import { apiPrismic } from '$lib/api/server/prismic.js';
import { boolFromString } from "$lib/utils/boolean.js";

export const prerender = false;

/** Gets blog posts from prismic */
export const GET = async ({ fetch, url }) => {
	const { searchParams } = url;
	const page = searchParams.get('page');
	const pageNumber = parseInt(page || '');

	const searchTerm = searchParams.get('searchTerm');
	const tags = searchParams.getAll('tag');
	const previewsOnly = boolFromString(searchParams.get('previewsOnly'));

	const data = await apiPrismic({ fetch }).blogPosts.get({
		page: isNaN(pageNumber) ? 1 : pageNumber,
		searchTerm,
		tags,
		graphQuery: previewsOnly ? GRAPH_QUERIES_PRISMIC.GET_BLOG_POSTS.PREVIEWS_ONLY : undefined
	});
	return new Response(JSON.stringify(data), { status: 200 });
};
