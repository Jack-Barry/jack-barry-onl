import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getPosts } from '../src/lib/api/server/blogPosts';

run();
async function run() {
  const startTime = new Date();
  console.log('Beginning content index compilation');
  const indexDir = resolve(import.meta.dirname, '../static/content/blog');
  await mkdir(indexDir, { recursive: true });

  const posts = await getPosts();
  await writeFile(resolve(indexDir, 'index.json'), JSON.stringify(posts), 'utf8');

  const latestPost = posts.sort(
    (a, b) => new Date(b.metadata.published).valueOf() - new Date(a.metadata.published).valueOf()
  )[0];
  await writeFile(resolve(indexDir, 'latest.json'), JSON.stringify(latestPost), 'utf8');

  const endTime = new Date();
  const compilationTime = endTime.valueOf() - startTime.valueOf();
  console.log(`Content index compilation complete, took ${compilationTime}ms`);
}
