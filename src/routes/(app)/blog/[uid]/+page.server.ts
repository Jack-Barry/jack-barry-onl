import { GRAPH_QUERIES_PRISMIC } from '$lib/api/common/prismic/index.js';
import { apiPrismic } from '$lib/api/server/prismic.js';
import type { EntryGenerator } from './$types.js';

export const prerender = true;
export const csr = false;

export const entries: EntryGenerator = async () => {
	const allPosts = await apiPrismic({ fetch }).blogPosts.getAll({
		graphQuery: GRAPH_QUERIES_PRISMIC.GET_BLOG_POSTS.ENTRIES
	});

	return allPosts.map(({ uid }) => ({ uid }));
};

export async function load({ params, fetch, parent }) {
	const blogPost = await apiPrismic({ fetch }).blogPosts.getByUid(params.uid);

	const { breadcrumbs } = await parent();
	return {
		breadcrumbs: [...breadcrumbs, { label: 'Post', href: `/blog/${params.uid}` }],
		blogPost
	};
}
