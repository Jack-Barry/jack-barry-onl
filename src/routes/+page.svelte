<script lang="ts">
	// import { infiniteQueryBlogPosts } from '$lib/api/client/prismic';

	// const { queryOptions, query } = infiniteQueryBlogPosts();

	import { PrismicRichText } from '@prismicio/svelte';
	import ArrowRight from 'bootstrap-icons/icons/arrow-right.svg?component';
	import JbLogoSvg from '$lib/assets/jb-logo.svg?component';

	export let data;
</script>

<!-- <div>
	<a href="/page-2">Page 2</a>
	<input bind:value={$queryOptions.searchTerm} placeholder="Search" />
	<ul>
		{#each $query.data?.pages || [] as page}
			{#each page.results as result}
				<li>{result.uid}</li>
			{/each}
		{/each}
	</ul>
	{#if $query.hasNextPage}
		<button
			on:click={() => {
				$query.fetchNextPage();
			}}>Get more stuff</button
		>
	{/if}
</div> -->

<svelte:head>
	<title>{data.homePage.data.meta_title}</title>
	<meta name="description" content={data.homePage.data.meta_description} />
</svelte:head>

<div class="h-main-content vw-100 p-2 d-flex flex-column justify-content-center">
	<div class="d-flex align-items-center justify-content-center">
		<div class="card shadow-sm">
			<div class="card-body">
				<div
					class="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 p-4"
				>
					<div>
						<PrismicRichText field={data.homePage.data.welcome_message} />
					</div>
					<div class="animate__animated animate__flip">
						<JbLogoSvg />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="text-center overflow-hidden">
		<a
			class="icon-link icon-link-hover animate__animated animate__bounceInUp animate__delay-1s"
			href="/home"
		>
			Enter
			<ArrowRight />
		</a>
	</div>
</div>
