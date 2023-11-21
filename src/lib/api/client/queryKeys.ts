import { BlogPostSearchParams } from '$lib/api/common/prismic/BlogPostSearchParams';
import type { ApiPrismicGetBlogPostsOptions } from '../common/prismic';

/** All query keys used throughout the app */
export const queryKeys = {
	prismic: {
		all: ['prismic-api'],
		blog_post: {
			all() {
				return [...queryKeys.prismic.all, 'blog_post'];
			},
			infinite(options: Omit<ApiPrismicGetBlogPostsOptions, 'pageNumber'>) {
				return [
					...queryKeys.prismic.blog_post.all(),
					BlogPostSearchParams.fromOptions(options).asOptions
				];
			}
		}
	}
};
