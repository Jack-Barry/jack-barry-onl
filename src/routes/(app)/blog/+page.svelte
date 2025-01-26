<script lang="ts">
  import BlogPostPreview from '$lib/components/content/BlogPostPreview.svelte';
  import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';
  import { BY_JACK_BARRY } from '$lib/utils/constants.js';

  let { data } = $props();
</script>

<HeadMetadata
  siteTitle="Blog"
  ogImageTitle="Blog Posts"
  ogImageSubtitle={BY_JACK_BARRY}
  description="Writings and ramblings from the one of several Jack Barrys"
/>

<h1>Blog Posts</h1>

<div class="d-flex gap-3 flex-column pb-3">
  {#each data.posts as post (post.uid)}
    <BlogPostPreview {post} />
  {/each}
</div>
