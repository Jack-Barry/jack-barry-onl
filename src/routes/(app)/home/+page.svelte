<script lang="ts">
	import ArrowRight from 'bootstrap-icons/icons/arrow-right.svg?component';

	import AboutMeSection from '$lib/components/content/AboutMeSection.svelte';
	import BlogPostPreview from '$lib/components/content/BlogPostPreview.svelte';
	import { readable } from 'svelte/store';
	import { TITLE_PREFIX } from '$lib/utils/titles';
	import type { TagObject } from '$lib/components/content/types.js';
	import { goto } from '$app/navigation';

	export let data;

	const activeTags = readable(data.allTags);

	function filterByTag(tag: TagObject) {
		const searchParams = new URLSearchParams({ tag: tag.tag });
		goto('/blog?' + searchParams.toString());
	}
</script>

<svelte:head>
	<title>{TITLE_PREFIX}Professional Nerd</title>
	<meta name="description" content="Jack Barry is a lucky guy who gets paid to be a nerd" />
</svelte:head>

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
