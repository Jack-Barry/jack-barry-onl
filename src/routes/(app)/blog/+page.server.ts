import type { BlogPostWithUid } from '$lib/api/server/blogPosts.js';

export const prerender = false;

export async function load({ fetch, parent }) {
  const { breadcrumbs } = await parent();

  const apiResponse = await fetch('/api/content/blog/posts?sort_by=published');
  const posts = (await apiResponse.json()) as BlogPostWithUid[];

  return {
    breadcrumbs,
    posts: posts.sort(
      (a, b) => new Date(b.metadata.published).valueOf() - new Date(a.metadata.published).valueOf()
    )
  };
}
