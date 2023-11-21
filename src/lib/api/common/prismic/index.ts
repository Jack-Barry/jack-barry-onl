import type { BlogPostSearchOptions } from '$lib/api/common/prismic/BlogPostSearchParams';

export type ApiPrismicGetBlogPostsOptions = Pick<BlogPostSearchOptions, 'pageNumber'> &
	Partial<Pick<BlogPostSearchOptions, 'searchTerm' | 'tags'>> & {
		graphQuery?: string;
	};

const GET_BLOG_POSTS_ENTRIES = `{
	blog_post {
		meta_title
	}
}`;
const GET_BLOG_POSTS_PREVIEWS_ONLY = `{
	blog_post {
		meta_title
		meta_description
	}
}`;
export const GRAPH_QUERIES_PRISMIC = {
	GET_BLOG_POSTS: {
		ENTRIES: GET_BLOG_POSTS_ENTRIES,
		PREVIEWS_ONLY: GET_BLOG_POSTS_PREVIEWS_ONLY
	}
};
