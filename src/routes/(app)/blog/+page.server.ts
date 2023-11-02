import { createClient } from '$lib/prismicio';

export const prerender = true;

export async function load() {
	const client = createClient();

	const blogPosts = await client.getByType('blog_post', {
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		},
		pageSize: 10
	});

	return {
		breadcrumbs: [
			{ label: 'Home', href: '/home' },
			{ label: 'Blog', href: '/blog' }
		],
		blogPosts
	};
}
