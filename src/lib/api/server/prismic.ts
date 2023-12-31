import type { LoadEvent } from '@sveltejs/kit';
import { type Client, filter, type Ordering } from '@prismicio/client';

import { createClient } from '$lib/prismicio';
import type { AllDocumentTypes } from '../../../prismicio-types';
import type { ApiPrismicGetBlogPostsOptions } from '../common/prismic';

const ORDER_BY_DATE_DESCENDING: Ordering = {
	field: 'document.first_publication_date',
	direction: 'desc'
};

export function apiPrismic(options: { fetch: LoadEvent['fetch'] }) {
	const { fetch } = options;

	const queryClient = createClient({ fetch });

	return {
		aboutPage: {
			async get() {
				return await queryClient.getSingle('about_page');
			}
		},
		blogPosts: {
			async get(options: ApiPrismicGetBlogPostsOptions) {
				return await getBlogPosts(queryClient, options);
			},
			async getAll(options: Parameters<typeof queryClient.getAllByType>[1] = {}) {
				return await queryClient.getAllByType('blog_post', options);
			},
			async getByUid(uid: string) {
				return await queryClient.getByUID('blog_post', uid);
			},
			async getLatest() {
				return await queryClient.getSingle('blog_post', {
					orderings: [ORDER_BY_DATE_DESCENDING]
				});
			}
		},
		homePage: {
			async get() {
				return await queryClient.getSingle('home_page');
			}
		},
		privacyPolicy: {
			async get() {
				return await queryClient.getSingle('privacy_policy');
			}
		},
		tags: {
			async get() {
				const allTags = await queryClient.getTags();
				// temporary workaround since tags cannot currently be deleted in Primsic
				return allTags.filter(
					(tag) =>
						tag.startsWith('Language:') ||
						tag.startsWith('Skills:') ||
						tag === 'Home Life' ||
						tag === 'Home Server & Network'
				);
			}
		}
	};
}

async function getBlogPosts(
	client: Client<AllDocumentTypes>,
	options: ApiPrismicGetBlogPostsOptions
) {
	const { pageNumber: page, searchTerm, tags, graphQuery } = options;

	const filters: string[] = [];

	if (searchTerm) {
		filters.push(filter.fulltext('document', searchTerm));
	}

	if (tags?.length) {
		filters.push(filter.any('document.tags', tags));
	}

	return await client.getByType('blog_post', {
		pageSize: 10,
		page,
		filters,
		graphQuery,
		orderings: [ORDER_BY_DATE_DESCENDING]
	});
}
