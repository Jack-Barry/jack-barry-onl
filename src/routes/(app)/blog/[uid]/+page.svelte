<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import { formattedDate } from '$lib/utils/dates';
	import { BY_JACK_BARRY, SITE_TITLE_PREFIX } from '$lib/utils/constants.js';
	import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';

	export let data;
</script>

<HeadMetadata
	siteTitle={`${data.blogPost.data.meta_title}`}
	ogImageSubtitle={BY_JACK_BARRY}
	description={`${data.blogPost.data.meta_description}`}
	publishDate={data.blogPost.first_publication_date}
	modifiedDate={data.blogPost.last_publication_date}
/>

<h1>{data.blogPost.data.meta_title}</h1>
<div class="d-flex flex-column gap-2">
	<p class="mb-0">{formattedDate(data.blogPost.first_publication_date)}</p>
	{#if data.blogPost.last_publication_date !== data.blogPost.first_publication_date}
		<p class="text-secondary fs-fine-print">
			Last edited: {formattedDate(data.blogPost.last_publication_date)}
		</p>
	{/if}
</div>
<hr class="mt-0" />
<SliceZone slices={data.blogPost.data.body} {components} />
<hr />
<!-- <div class="d-flex gap-2 align-items-center">
	<span>If you found this article useful, feel free to</span>
	<a href="https://ko-fi.com/B0B3QXRUV" target="_blank">
		<img
			height="36"
			style="border:0px;height:36px;"
			src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
			alt="buy me a drink"
		/>
	</a>
</div> -->
