<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	import Image from '$lib/components/prismic/Image.svelte';

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
