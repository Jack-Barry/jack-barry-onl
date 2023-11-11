import type { ApiPrismicGetBlogPostsOptions } from '../types/prismic';

/** All query keys used throughout the app */
export const queryKeys = {
	prismic: {
		all: ['prismic-api'],
		blog_post: {
			all() {
				return [...queryKeys.prismic.all, 'blog_post'];
			},
			infinite(options: Omit<ApiPrismicGetBlogPostsOptions, 'page'>) {
				return [...queryKeys.prismic.blog_post.all(), options];
			}
		}
	}
};
