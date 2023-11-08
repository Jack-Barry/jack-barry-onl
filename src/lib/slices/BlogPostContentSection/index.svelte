<script lang="ts">
	import Image from '$lib/components/prismic/Image.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.BlogPostSectionSlice;

	// prismic props https://prismic.io/docs/svelte-template#slices
	export let slices;
	slices;
	export let context;
	context;
	export let index;
	index;
</script>

<div data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<PrismicRichText field={slice.primary.content} components={{ image: Image }} />
</div>
