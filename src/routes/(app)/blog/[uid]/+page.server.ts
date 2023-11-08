import { createClient } from '$lib/prismicio.js';
import type { EntryGenerator } from './$types.js';

// TODO: should prerender individual blog posts
export const prerender = true;
// export const csr = false;

export async function load({ params, fetch }) {
	const prismicClient = createClient({ fetch });
	const blogPost = await prismicClient.getByUID('blog_post', params.uid);

	return {
		breadcrumbs: [
			{ label: 'Home', href: '/home' },
			{ label: 'Blog', href: '/blog' },
			{ label: blogPost.data.meta_title, href: `/blog/${params.uid}` }
		],
		blogPost
	};
}

const graphQuery = `{
	blog_post {
		uid
	}
}`;
export const entries: EntryGenerator = async () => {
	const allPosts = await createClient().getAllByType('blog_post', { graphQuery });

	return allPosts.map((p) => ({ uid: p.uid }));
};
