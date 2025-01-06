import type { BlogPostWithUid } from '$lib/api/server/blogPosts.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const postsIndex = await import('../../../../../../static/content/blog/index.json');
  const posts = postsIndex.default as BlogPostWithUid[];

  const sortBy = url.searchParams.get('sort_by');
  if (sortBy) {
    switch (sortBy) {
      case 'published': {
        posts.sort(
          (a, b) =>
            new Date(b.metadata.published).valueOf() - new Date(a.metadata.published).valueOf()
        );
        break;
      }

      default:
        console.warn(`Unsupported sort_by value: ${sortBy}`);
    }
  }

  return json(posts);
}
