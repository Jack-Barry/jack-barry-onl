import type { EntryGenerator } from './$types';
import { getPosts, readPost } from '$lib/api/server/blogPosts';

export const prerender = true;

export const entries: EntryGenerator = async () => {
  return await getPosts();
};

export async function load({ params, parent }) {
  const { breadcrumbs } = await parent();
  const { postAsHtml, metadata } = await readPost(params.uid);

  return {
    breadcrumbs: [...breadcrumbs, { label: 'Post', href: `/blog/${params.uid}` }],
    content: postAsHtml,
    metadata
  };
}
