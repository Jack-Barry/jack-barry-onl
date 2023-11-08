import { createClient } from '$lib/prismicio.js';

export const prerender = true;
export const csr = true;

export async function load({ fetch, parent }) {
	const { tags } = await parent();
	const prismicClient = createClient({ fetch });

	const latestPost = await prismicClient.getSingle('blog_post', {
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		}
	});
	const aboutMe = await prismicClient.getSingle('about_page');

	return {
		breadcrumbs: [{ label: 'Home', href: '/home' }],
		tags,
		latestPost,
		aboutMe
	};
}
