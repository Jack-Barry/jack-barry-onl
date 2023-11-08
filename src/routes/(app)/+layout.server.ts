import { createClient } from '$lib/prismicio.js';

export const load = async ({ fetch }) => {
	const prismicClient = createClient({ fetch });
	const tags = await prismicClient.getTags();

	return {
		// temporary workaround since tags cannot currently be deleted in Primsic
		tags: tags.filter(
			(tag) =>
				tag.startsWith('Language:') ||
				tag.startsWith('Skills:') ||
				tag === 'Home Life' ||
				tag === 'Home Server & Network'
		)
	};
};
