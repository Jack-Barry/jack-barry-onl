<script lang="ts">
  import BlogPostPreview from '$lib/components/content/BlogPostPreview.svelte';

  let { data } = $props();
</script>

<h1>Blog Posts</h1>

<div class="d-flex gap-3 flex-column pb-3">
  {#each data.posts as post (post.uid)}
    <BlogPostPreview {post} />
  {/each}
</div>
