<script lang="ts">
	import { page } from '$app/stores';
	import { METADATA_IMAGE_DIMENSIONS } from '$lib/components/metadata/constants';
	import OgImage from '$lib/components/metadata/OGImage.svelte';
	import type { ImagePlatform } from '$lib/components/metadata/types';

	const title = $page.url.searchParams.get('title') ?? undefined;
	const subtitle = $page.url.searchParams.get('subtitle') ?? undefined;
	const platform = ($page.url.searchParams.get('platform') as ImagePlatform) ?? 'facebook';
	const imageDimensions =
		platform === 'twitter' ? METADATA_IMAGE_DIMENSIONS.TWITTER : METADATA_IMAGE_DIMENSIONS.FACEBOOK;
</script>

<div class="vh-100 vw-100 d-flex align-items-center justify-content-center">
	<div
		class="image-wrapper"
		style:width={`${imageDimensions.width}px`}
		style:height={`${imageDimensions.height}px`}
	>
		<OgImage {title} {subtitle} />
	</div>
</div>
