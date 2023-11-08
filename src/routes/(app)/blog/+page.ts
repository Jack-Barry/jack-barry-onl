import { blogPosts, type GetPostsOptions } from '$lib/api/prismic/blogPosts.js';

export const load = async ({ data, parent, fetch }) => {
	const { queryClient } = await parent();

	const { queryKeys, invoke } = blogPosts.getPosts;
	const initialDataOptions: GetPostsOptions = { searchTerm: '', tags: [] };
	await queryClient.prefetchQuery({
		queryKey: queryKeys.forOptions(initialDataOptions),
		queryFn: async () => await invoke(fetch, initialDataOptions)
	});

	return data;
};
