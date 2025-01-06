import type { BlogPostWithUid } from '../../../src/lib/api/server/blogPosts';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function getLatestBlogPost() {
  const postText = readFileSync(
    resolve((import.meta.dirname, 'static/content/blog/latest.json')),
    'utf8'
  );
  const latestPost = JSON.parse(postText) as BlogPostWithUid;
  return latestPost;
}
