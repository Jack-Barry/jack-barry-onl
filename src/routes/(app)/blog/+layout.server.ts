export const prerender = true;

export async function load({ parent }) {
	const { allTags } = await parent();

	return {
		breadcrumbs: [
			{ label: 'Home', href: '/home' },
			{ label: 'Blog', href: '/blog' }
		],
		allTags
	};
}
