import { apiPrismic } from '$lib/api/server/prismic.js';

export const prerender = false;

/** Gets blog posts from prismic */
export const GET = async ({ fetch, url }) => {
	const { searchParams } = url;
	const page = searchParams.get('page');
	const pageNumber = parseInt(page || '');

	const searchTerm = searchParams.get('searchTerm');
	const tags = searchParams.getAll('tag');

	const data = await apiPrismic({ fetch }).blogPosts.get({
		page: isNaN(pageNumber) ? 1 : pageNumber,
		searchTerm,
		tags
	});
	return new Response(JSON.stringify(data));
};
