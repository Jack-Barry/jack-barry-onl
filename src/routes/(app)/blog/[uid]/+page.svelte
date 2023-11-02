<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import { formattedDate } from '$lib/utils/dates';
	import type {} from // CodeSnippetSlice,
	// EditNoticeSlice,
	// SectionContentSlice
	'../../../../prismicio-types.js';
	export let data;

	// const editSlices: EditNoticeSlice[] = [];
	// const contentSlices: (SectionContentSlice | CodeSnippetSlice)[] = [];
	// data.blogPost.data.slices.forEach((slice) => {
	// 	if (slice.slice_type === 'edit_notice') {
	// 		editSlices.push(slice);
	// 	} else {
	// 		contentSlices.push(slice);
	// 	}
	// });
</script>

<svelte:head>
	<title>Jack Barry | {data.blogPost.data.post_title}</title>
	<!-- <meta name="description" content={data.blogPost.data.meta_description} /> -->
</svelte:head>

<h1>{data.blogPost.data.post_title}</h1>
<div class="d-flex flex-column gap-2">
	<p>{formattedDate(data.blogPost.first_publication_date)}</p>
	{#if data.blogPost.last_publication_date !== data.blogPost.first_publication_date}
		<p class="text-secondary">
			Last edited: {formattedDate(data.blogPost.last_publication_date)}
		</p>
	{/if}
</div>
<hr class="mt-0" />
<!-- {#if editSlices.length}
	<SliceZone slices={editSlices} {components} />
	<hr />
{/if}
<div class="mt-3">
	<SliceZone slices={contentSlices} {components} />
</div> -->
