<script lang="ts">
  import ArrowRight from 'bootstrap-icons/icons/arrow-right.svg?component';
  import NewsSvg from 'bootstrap-icons/icons/newspaper.svg?component';
  import { formattedDate } from '$lib/utils/dates';
  import type { BlogPostWithUid } from '$lib/api/server/blogPosts';

  interface Props {
    post: BlogPostWithUid;
    withIcon?: boolean;
  }

  let { post, withIcon = false }: Props = $props();
</script>

<div class="card w-100 position-relative shadow-sm">
  {#if withIcon}
    <span
      class="position-absolute top-0 start-100 translate-middle pt-1 px-2 pb-1 rounded-circle text-bg-primary"
    >
      <NewsSvg class="mb-1" />
      <span class="visually-hidden">Most recent blog post</span>
    </span>
  {/if}
  <div class="card-body">
    <h5 class="card-title">{post.metadata.title}</h5>
    <p class="mb-0">{formattedDate(post.metadata.published, { condensed: true })}</p>
    <p class="mb-0">{post.metadata.description}</p>
    <div class="text-end">
      <a
        data-testid="preview-link-to-blog-post-{post.uid}"
        href={`/blog/${post.uid}`}
        class="icon-link icon-link-hover"
      >
        Read more
        <ArrowRight />
      </a>
    </div>
  </div>
</div>
