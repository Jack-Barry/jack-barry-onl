import { apiPrismic } from '$lib/api/server/prismic.js';

export const prerender = true;

export async function load({ fetch, parent }) {
	const { allTags } = await parent();
	const api = apiPrismic({ fetch });
	const latestPost = await api.blogPosts.getLatest();
	const aboutPage = await api.aboutPage.get();

	return {
		breadcrumbs: [{ label: 'Home', href: '/home' }],
		allTags,
		latestPost,
		aboutPage
	};
}
