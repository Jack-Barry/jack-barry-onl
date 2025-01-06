import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

run();
async function run() {
  const postUid = process.argv[2];
  if (!postUid) {
    throw new Error('Need to provide a post UID');
  }

  let scaffold = '---\n';
  scaffold += 'title:\n';
  scaffold += 'description:\n';
  scaffold += 'published:\n';
  scaffold += '---\n';

  await writeFile(
    resolve(import.meta.dirname, '..', 'content/blog', `${postUid}.md`),
    scaffold,
    'utf8'
  );
}
