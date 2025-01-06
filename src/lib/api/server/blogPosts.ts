import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import matter from 'gray-matter';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import { unified } from 'unified';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import strip from 'strip-markdown';
import rehypeRaw from 'rehype-raw';

export interface BlogPost {
  metadata: BlogPostMetadata;
  rawText: string;
  postAsHtml: Root;
}

export type BlogPostWithUid = BlogPost & {
  uid: string;
};

interface BlogPostMetadata {
  title: string;
  description: string;
  published: string;
  updated?: string;
  tags?: string[];
}

const BLOG_CONTENT_DIR = 'content/blog';
const BLOG_INDEX_DIR = 'static/content/blog';

export async function getPosts(dir = BLOG_CONTENT_DIR): Promise<BlogPostWithUid[]> {
  const posts: BlogPostWithUid[] = [];
  const dirContents = await readdir(dir);

  await Promise.all(
    dirContents.map(async (p) => {
      if (extname(p) === '.md') {
        const subPath = dir.slice(dir.indexOf(BLOG_CONTENT_DIR) + BLOG_CONTENT_DIR.length + 1);

        let uid = p.replace(/\.md$/, '');
        if (subPath.length > 0) {
          uid = `${subPath}/${uid}`;
        }

        const post = await readPost(uid);

        posts.push({ uid, ...post });
        return;
      }

      const pStat = await stat(resolve(dir, p));
      if (pStat.isDirectory()) {
        const dirPosts = await getPosts(resolve(dir, p));
        posts.push(...dirPosts);
      }
    })
  );

  return posts;
}

export async function getLatestPost(dir = BLOG_INDEX_DIR): Promise<BlogPostWithUid> {
  const latestPostText = await readFile(resolve(dir, 'latest.json'), 'utf8');
  return JSON.parse(latestPostText) as BlogPostWithUid;
}

export async function readPost(uid: string): Promise<BlogPost> {
  const postFilePath = resolve(BLOG_CONTENT_DIR, `${uid}.md`);
  const postText = await readFile(postFilePath, 'utf8');
  // published, updated

  const metadata = matter(postText).data;
  assertIsBlogPostMetadata(metadata);

  const rawText = await remark().use(strip).process(removeFrontMatter(postText));
  const postAsHtml = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(addCommonUrlProperties)
    .use(replaceLocalImageUrls)
    .run(unified().use(remarkParse).parse(removeFrontMatter(postText)));

  return { rawText: String(rawText), postAsHtml, metadata };
}

/** Validates blog post frontmatter has provided all required metadata */
function assertIsBlogPostMetadata(
  data: ReturnType<typeof matter>['data']
): asserts data is BlogPostMetadata {
  if (!data.title || !data.description || !data.published) {
    throw new Error('metadata is missing "title"');
  }
}

/** Strips frontmatter to simplify remark parsing */
function removeFrontMatter(content: string): string {
  return content.replace(/^---(.|\n)*---\n$/m, '');
}

/**
 * Allows for having local filesystem URLs in Markdown so that I can preview
 * those without spinning up full-blown SvelteKit app. This plugin just
 * rewrites the URLs so that the built app knows where to pull them from
 */
function replaceLocalImageUrls() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type !== 'element') {
        return;
      }

      if (node.tagName !== 'img') {
        return;
      }

      const localUrl = node.properties.src as string;
      const buildUrl = localUrl.replace(/^(\.\.\/)+static/, '');
      node.properties.src = buildUrl;
    });
  };
}

function addCommonUrlProperties() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type !== 'element') {
        return;
      }

      if (node.tagName !== 'a') {
        return;
      }

      node.properties.target = '_blank';
    });
  };
}
