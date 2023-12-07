<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.BlogPostImageSlice;

	// prismic props https://prismic.io/docs/svelte-template#slices
	export let slices;
	slices;
	export let context;
	context;
	export let index;
	index;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="d-flex justify-content-center mb-3">
		<PrismicImage field={slice.primary.image} class="img-fluid" />
	</div>
</section>
