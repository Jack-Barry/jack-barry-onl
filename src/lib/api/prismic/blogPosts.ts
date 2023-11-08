import type { Query } from '@prismicio/client';
import type { PageLoadEvent } from '../../../routes/(app)/blog/$types';
import type { BlogPostDocument } from '../../../prismicio-types';

export const blogPosts = {
	getPosts: {
		invoke: getPosts,
		queryKeys: {
			all: ['blogPosts'],
			forOptions: (options: GetPostsOptions) => [...blogPosts.getPosts.queryKeys.all, options]
		}
	}
};

export type GetPostsOptions = { tags?: string[]; searchTerm?: string };
async function getPosts(fetch: PageLoadEvent['fetch'], options: GetPostsOptions = {}) {
	const { tags = [], searchTerm = '' } = options;

	const params: [string, string][] = [];
	if (tags.length) {
		params.push(...tags.map<[string, string]>((t) => ['tag', t]));
	}

	if (searchTerm.length) {
		params.push(['searchTerm', searchTerm]);
	}

	const search = new URLSearchParams(params);
	let requestUrl = '/api/prismic/blog_posts';
	if (params.length) {
		requestUrl += `?${search.toString()}`;
	}

	const response = await fetch(requestUrl, {
		method: 'GET',
		headers: { 'content-type': 'application/json' }
	});

	return (await response.json()) as Query<BlogPostDocument<string>>;
}
