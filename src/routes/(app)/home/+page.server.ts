import { createClient } from '$lib/prismicio';

export const prerender = true;

export async function load() {
	const client = createClient();

	const latestPost = await client.getSingle('blog_post', {
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		}
	});
	const aboutMe = await client.getSingle('about_page');

	return {
		breadcrumbs: [{ label: 'Home', href: '/home' }],
		latestPost,
		aboutMe
	};
}
