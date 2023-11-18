import type { Query } from '@prismicio/client';
import { createInfiniteQuery } from '@tanstack/svelte-query';
import { derived, writable } from 'svelte/store';

import type { BlogPostDocument } from '../../../prismicio-types';
import type { ApiPrismicGetBlogPostsOptions } from '../common/prismic';
import { queryKeys } from './queryKeys';
import { fetchJson } from './fetch';

type infiniteQueryBlogPostsOptions = Omit<ApiPrismicGetBlogPostsOptions, 'page' | 'graphQuery'> & {
	previewsOnly?: boolean;
};

export function infiniteQueryBlogPosts(defaultOptions: infiniteQueryBlogPostsOptions = {}) {
	const queryOptions = writable<infiniteQueryBlogPostsOptions>(defaultOptions);

	const query = createInfiniteQuery(
		derived(queryOptions, ($queryOptions) => ({
			...defaultInfiniteQueryOptionsPrismic,
			queryKey: queryKeys.prismic.blog_post.infinite($queryOptions),
			async queryFn({ pageParam }: { pageParam: number }) {
				const search = searchParamsWithPage({ pageParam });

				if ($queryOptions.previewsOnly) {
					search.set('previewsOnly', 'true');
				}

				if ($queryOptions.searchTerm?.length) {
					search.set('searchTerm', $queryOptions.searchTerm);
				}

				$queryOptions.tags?.forEach((tag) => {
					search.append('tag', tag);
				});

				return await fetchJson(`/api/prismic/blog_post?${search.toString()}`);
			}
		}))
	);

	return { queryOptions, query };
}

export const defaultInfiniteQueryOptionsPrismic = {
	initialPageParam: 1,
	getNextPageParam: getNextPageParamForPrismicQuery
};

function getNextPageParamForPrismicQuery(current: Query<BlogPostDocument<string>>) {
	if (current.page >= current.total_pages) {
		return;
	}

	return current.page + 1;
}

function searchParamsWithPage({ pageParam }: { pageParam: number }) {
	const search = new URLSearchParams();
	search.set('page', pageParam.toString());
	return search;
}
