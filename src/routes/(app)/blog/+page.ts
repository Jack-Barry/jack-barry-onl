import { blogPosts, type GetPostsOptions } from '$lib/api/prismic/blogPosts.js';

let hasPrefetched = false;

export const load = async ({ data, parent, fetch }) => {
	const { queryClient } = await parent();

	if (!hasPrefetched) {
		const { queryKeys, invoke } = blogPosts.getPosts;
		const initialDataOptions: GetPostsOptions = { searchTerm: '', tags: [] };
		await queryClient.prefetchQuery({
			queryKey: queryKeys.forOptions(initialDataOptions),
			queryFn: async () => await invoke(fetch, initialDataOptions)
		});
		hasPrefetched = true;
	}

	return data;
};
