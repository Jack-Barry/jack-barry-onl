import { createClient } from '$lib/prismicio.js';
import { filter } from '@prismicio/client';

export const prerender = false;

/** Gets blog posts from prismic */
export const GET = async ({ url, fetch }) => {
	const { searchParams } = url;

	const tags = searchParams.getAll('tag');
	const searchTerm = searchParams.get('searchTerm');

	const client = createClient({ fetch });
	const filters: string[] = [];
	if (tags.length) {
		filters.push(filter.any('document.tags', tags));
	}

	if (searchTerm?.length) {
		filters.push(filter.fulltext('document', searchTerm));
	}

	const getByTypeOptions: Parameters<typeof client.getByType>[1] = {
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		}
	};

	if (filters.length) {
		getByTypeOptions.filters = filters;
	}

	const data = await client.getByType('blog_post', getByTypeOptions);
	return new Response(JSON.stringify(data));
};
