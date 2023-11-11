export const prerender = true;

export async function load({ parent }) {
	const { allTags, breadcrumbs } = await parent();

	return {
		breadcrumbs: [
			...breadcrumbs,
			{ label: 'Blog', href: '/blog' }
		],
		allTags
	};
}
