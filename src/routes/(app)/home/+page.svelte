<script lang="ts">
	import ArrowRight from 'bootstrap-icons/icons/arrow-right.svg?component';

	import AboutMeSection from '$lib/components/content/AboutMeSection.svelte';
	import BlogPostPreview from '$lib/components/content/BlogPostPreview.svelte';
	import { readable } from 'svelte/store';
	import type { TagObject } from '$lib/components/content/types.js';
	import { goto } from '$app/navigation';
	import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';
	import { JACK_BARRY } from '$lib/utils/constants.js';

	export let data;

	const activeTags = readable(data.allTags);

	function filterByTag(tag: TagObject) {
		const searchParams = new URLSearchParams({ tag: tag.tag });
		goto('/blog?' + searchParams.toString());
	}
</script>

<HeadMetadata
	siteTitle="Home"
	ogImageTitle={JACK_BARRY}
	ogImageSubtitle="Professional Nerd"
	description="Jack Barry is a lucky guy who gets paid to be a nerd"
/>

<div class="animate__animated animate__pulse animate__delay-1s">
	<BlogPostPreview post={data.latestPost} {activeTags} onTagClick={filterByTag} withIcon />
</div>
<div class="mt-3 d-flex justify-content-end">
	<a class="icon-link icon-link-hover" href="/blog">
		See all blog posts
		<ArrowRight />
	</a>
</div>
<div class="mt-3">
	<AboutMeSection aboutMe={data.aboutPage} />
</div>
