<script lang="ts">
	import { formattedDate } from '$lib/utils/dates';
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.EditNoticeSlice;

	// prismic props https://prismic.io/docs/svelte-template#slices
	export let slices;
	slices;
	export let context;
	context;
	export let index;
	index;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="alert alert-info">
		{#if slice.primary.edit_time}
			<p class="text-end">{formattedDate(slice.primary.edit_time)}</p>
		{/if}
		<PrismicRichText field={slice.primary.edit_notes} />
	</div>
</section>
