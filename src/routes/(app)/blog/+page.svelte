<script>
	import BlogPostPreview from '$lib/components/BlogPostPreview.svelte';

	export let data;
</script>

<svelte:head>
	<title>Jack Barry | Blog</title>
	<meta name="description" content="Blog posts by Jack Barry" />
</svelte:head>

<h1>Blog</h1>
{#each data.blogPosts.results as post}
	<BlogPostPreview {post} />
{/each}
