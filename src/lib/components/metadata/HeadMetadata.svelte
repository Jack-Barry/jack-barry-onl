<script lang="ts">
	import { page } from '$app/stores';
	import { JACK_BARRY, SITE_TITLE_PREFIX } from '$lib/utils/constants';
	import { METADATA_IMAGE_DIMENSIONS } from './constants';

	export let siteTitle: string;
	export let description: string;
	export let ogImageTitle = siteTitle;
	export let ogImageSubtitle: string | undefined = undefined;
	export let publishDate: string | undefined = undefined;
	export let modifiedDate: string | undefined = undefined;

	const ogImageSearchParams = new URLSearchParams();
	if (ogImageTitle) {
		ogImageSearchParams.set('title', ogImageTitle);
	}
	if (ogImageSubtitle) {
		ogImageSearchParams.set('subtitle', ogImageSubtitle);
	}
	let baseUrl = $page.url.protocol + '//' + $page.url.hostname;
	if ($page.url.protocol !== 'https') {
		baseUrl += ':';
		baseUrl += $page.url.port;
	}
	const ogImageUrl = baseUrl + '/api/metadata/og-images?';

	const ogImageSearchParamsFacebook = new URLSearchParams(ogImageSearchParams);
	ogImageSearchParamsFacebook.set('platform', 'facebook');
	const ogImageUrlFacebook = ogImageUrl + ogImageSearchParamsFacebook.toString();

	const ogImageSearchParamsTwitter = new URLSearchParams(ogImageSearchParams);
	ogImageSearchParamsTwitter.set('platform', 'twitter');
	const ogImageUrlTwitter = ogImageUrl + ogImageSearchParamsTwitter.toString();
</script>

<svelte:head>
	<!-- Standard metadata -->
	<title>{SITE_TITLE_PREFIX + siteTitle}</title>
	<meta name="description" content={description} />
	<meta name="author" content={JACK_BARRY} />
	<!-- OpenGraph metadata -->
	<meta property="og:title" content={ogImageTitle} />
	<meta property="og:description" content={description} />
	<meta name="image" property="og:image" content={ogImageUrlFacebook} />
	<meta property="og:image:width" content={`${METADATA_IMAGE_DIMENSIONS.FACEBOOK.width}`} />
	<meta property="og:image:height" content={`${METADATA_IMAGE_DIMENSIONS.FACEBOOK.height}`} />
	<!-- Twitter metadata -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@JackBarryOnl" />
	<meta name="twitter:creator" content="@JackBarryOnl" />
	<meta name="twitter:title" content={ogImageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image:src" content={ogImageUrlTwitter} />
	<meta name="twitter:image:width" content={`${METADATA_IMAGE_DIMENSIONS.TWITTER.width}`} />
	<meta name="twitter:image:height" content={`${METADATA_IMAGE_DIMENSIONS.TWITTER.height}`} />
	<!-- Publish date(s) metadata -->
	{#if publishDate}
		<meta name="article-published_time" property="article:published_time" content={publishDate} />
		<meta name="publish_date" property="og:publish_date" content={publishDate} />
	{/if}
	{#if modifiedDate}
		<meta name="article-modified_time" property="article:modified_time" content={modifiedDate} />
	{/if}
</svelte:head>
