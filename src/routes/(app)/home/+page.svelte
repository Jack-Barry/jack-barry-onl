<script>
	import ArrowRight from 'bootstrap-icons/icons/arrow-right.svg?component';
	import BlogPostPreview from '$lib/components/BlogPostPreview.svelte';
	import AboutMeSection from '$lib/components/AboutMeSection.svelte';

	export let data;
</script>

<svelte:head>
	<title>Jack Barry | Professional Nerd</title>
	<meta name="description" content="" />
</svelte:head>

<div class="animate__animated animate__pulse animate__delay-1s">
	<BlogPostPreview post={data.latestPost} withIcon activeTags={data.tags} />
</div>
<div class="mt-3 d-flex justify-content-end">
	<a class="icon-link icon-link-hover" href="/blog">
		See all blog posts
		<ArrowRight />
	</a>
</div>
<div class="mt-3">
	<AboutMeSection aboutMe={data.aboutMe} />
</div>
