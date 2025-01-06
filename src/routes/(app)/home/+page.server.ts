import { getLatestPost } from '$lib/api/server/blogPosts.js';

export const prerender = true;

export async function load({ parent }) {
  const { breadcrumbs } = await parent();

  const latestPost = await getLatestPost();

  return {
    breadcrumbs,
    latestPost
  };
}
