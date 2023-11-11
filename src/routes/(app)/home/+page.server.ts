import { apiPrismic } from '$lib/api/server/prismic.js';

export const prerender = true;

export async function load({ fetch, parent }) {
	const { allTags, breadcrumbs } = await parent();
	const api = apiPrismic({ fetch });
	const latestPost = await api.blogPosts.getLatest();
	const aboutPage = await api.aboutPage.get();

	return {
		breadcrumbs,
		allTags,
		latestPost,
		aboutPage
	};
}
