<script lang="ts">
  import ArrowRight from 'bootstrap-icons/icons/arrow-right.svg?component';
  import AboutMeSection from '$lib/components/content/AboutMeSection.svelte';
  import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';
  import { JACK_BARRY } from '$lib/utils/constants.js';
  import BlogPostPreview from '$lib/components/content/BlogPostPreview.svelte';

  let { data } = $props();
</script>

<HeadMetadata
  siteTitle="Home"
  ogImageTitle={JACK_BARRY}
  ogImageSubtitle="Professional Nerd"
  description="Jack Barry is a lucky guy who gets paid to be a nerd"
/>

<div class="animate__animated animate__pulse animate__delay-1s">
  <BlogPostPreview post={data.latestPost} withIcon />
</div>
<div class="mt-3 d-flex justify-content-end">
  <a class="icon-link icon-link-hover" href="/blog">
    See all blog posts
    <ArrowRight />
  </a>
</div>
<div class="mt-3">
  <AboutMeSection />
</div>
