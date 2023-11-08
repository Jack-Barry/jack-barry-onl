<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { blur, scale } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import AppFooter from '$lib/components/AppFooter.svelte';
	// code snippet styles
	import nightOwl from 'svelte-highlight/styles/night-owl';
	// import solarizedLight from 'svelte-highlight/styles/solarized-light';

	import '../scss/index.scss';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import HeapAnalytics from '$lib/components/heap/HeapAnalytics.svelte';

	const ComponentConstructor = browser
		? // @ts-ignore -- don't need typings for this
		  import('bootstrap/dist/js/bootstrap.bundle').then((module) => module.Component)
		: new Promise(() => {});

	export let data;
</script>

<svelte:head>
	<HeapAnalytics />
	<!-- 	{@html solarizedLight} -->
	{@html nightOwl}
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	{#await ComponentConstructor}
		<div class="vh-100 vw-100 p-2 d-flex flex-column justify-content-center">
			<div class="d-flex justify-content-center">
				<LoadingSpinner />
			</div>
		</div>
	{:then _}
		{#if $page.data.breadcrumbs}
			<nav
				transition:scale
				aria-label="breadcrumb"
				class="py-4 px-4 px-sm-5 mw-main-content mx-auto"
			>
				<ol class="breadcrumb mb-0">
					{#each $page.data.breadcrumbs as breadcrumb, index}
						{#if index !== $page.data.breadcrumbs.length - 1}
							<li class="breadcrumb-item"><a href={breadcrumb.href}>{breadcrumb.label}</a></li>
						{:else}
							<li class="breadcrumb-item active" aria-current="page">{breadcrumb.label}</li>
						{/if}
					{/each}
				</ol>
			</nav>
		{/if}
		{#key data.pathname}
			<div transition:blur>
				<slot />
			</div>
		{/key}
		<AppFooter />
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
	<SvelteQueryDevtools />
</QueryClientProvider>
