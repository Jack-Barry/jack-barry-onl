<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import { formattedDate } from '$lib/utils/dates';
	import { TITLE_PREFIX } from '$lib/utils/titles';

	export let data;
</script>

<svelte:head>
	<title>{TITLE_PREFIX}{data.blogPost.data.meta_title}</title>
	<meta name="description" content={data.blogPost.data.meta_description} />
</svelte:head>

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
