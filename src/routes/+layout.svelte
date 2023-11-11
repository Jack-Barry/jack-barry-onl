<script>
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { blur } from 'svelte/transition';
	// code snippet styles
	import nightOwl from 'svelte-highlight/styles/night-owl';
	// import solarizedLight from 'svelte-highlight/styles/solarized-light';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import HeapAnalytics from '$lib/analytics/HeapAnalytics.svelte';
	import AppFooter from '$lib/components/layout/AppFooter.svelte';
	import Breadcrumbs from '$lib/components/layout/Navbar.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	import '../scss/index.scss';

	export let data;

	const ComponentConstructor = browser
		? // @ts-ignore -- don't need typings for this
		  import('bootstrap/dist/js/bootstrap.bundle').then((module) => module.Component)
		: new Promise(() => {});
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
		<Breadcrumbs />
		{#key $page.route.id}
			<div in:blur>
				<slot />
			</div>
		{/key}
		<AppFooter />
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
	<SvelteQueryDevtools styleNonce={undefined} />
</QueryClientProvider>
