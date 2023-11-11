import { apiPrismic } from '$lib/api/server/prismic.js';
import type { EntryGenerator } from './$types.js';

export const prerender = true;

const entriesGraphQuery = `{
	blog_post {
		uid
	}
}`;
export const entries: EntryGenerator = async () => {
	const allPosts = await apiPrismic({ fetch }).blogPosts.getAll({ graphQuery: entriesGraphQuery });

	return allPosts.map((p) => ({ uid: p.uid }));
};

export async function load({ params, fetch, parent }) {
	const blogPost = await apiPrismic({ fetch }).blogPosts.getByUid(params.uid);

	const { breadcrumbs } = await parent()
	return {
		breadcrumbs: [
			...breadcrumbs,
			{ label: 'Post', href: `/blog/${params.uid}` }
		],
		blogPost
	};
}

