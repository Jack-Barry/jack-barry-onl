export const prerender = false;

export async function load({ parent }) {
	const { tags } = await parent();

	return {
		breadcrumbs: [
			{ label: 'Home', href: '/home' },
			{ label: 'Blog', href: '/blog' }
		],
		tags
	};
}
