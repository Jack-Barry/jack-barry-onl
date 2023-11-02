import { createClient } from '$lib/prismicio';

export const prerender = true;

export async function load({ params }) {
	const client = createClient();

	const blogPost = await client.getByUID('blog_post', params.uid);

	return {
		breadcrumbs: [
			{ label: 'Home', href: '/home' },
			{ label: 'Blog', href: '/blog' },
			{ label: blogPost.data.post_title, href: `/blog/${params.uid}` }
		],
		blogPost
	};
}
