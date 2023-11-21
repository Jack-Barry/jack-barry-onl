import type { Query } from '@prismicio/client';
import { createInfiniteQuery } from '@tanstack/svelte-query';
import { derived, writable } from 'svelte/store';

import type { BlogPostDocument } from '../../../prismicio-types';
import type { ApiPrismicGetBlogPostsOptions } from '../common/prismic';
import { queryKeys } from './queryKeys';
import { fetchJson } from './fetch';
import {
	BlogPostSearchParams,
	PARAM_KEY_PAGE_NUMBER
} from '$lib/api/common/prismic/BlogPostSearchParams';

type InfiniteQueryBlogPostsOptions = Omit<
	ApiPrismicGetBlogPostsOptions,
	'pageNumber' | 'graphQuery'
> & {
	previewsOnly?: boolean;
};

export function infiniteQueryBlogPosts(defaultOptions: InfiniteQueryBlogPostsOptions = {}) {
	const queryOptions = writable<InfiniteQueryBlogPostsOptions>(
		BlogPostSearchParams.fromOptions(defaultOptions).asOptions
	);

	const query = createInfiniteQuery(
		derived(queryOptions, ($queryOptions) => ({
			...defaultInfiniteQueryOptionsPrismic,
			queryKey: queryKeys.prismic.blog_post.infinite($queryOptions),
			async queryFn(params: { pageParam: number }) {
				const search = BlogPostSearchParams.fromOptions($queryOptions);
				search.setPageNumber(params.pageParam);
				return await fetchJson(`/api/prismic/blog_post?${search.asURLSearchParams.toString()}`);
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
