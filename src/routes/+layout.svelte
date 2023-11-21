<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { blur } from 'svelte/transition';
	// code snippet styles
	import dracula from 'svelte-highlight/styles/dracula';
	import solarizedLight from 'svelte-highlight/styles/solarized-light';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import HeapAnalytics from '$lib/analytics/HeapAnalytics.svelte';
	import AppFooter from '$lib/components/layout/AppFooter.svelte';
	import Breadcrumbs from '$lib/components/layout/Navbar.svelte';
	import PrivacyPolicyModal from '$lib/components/content/PrivacyPolicyModal.svelte';
	import { getUserThemePreference } from '$lib/utils/theme/getUserThemePreference';
	import type { PrivacyPolicyModalContentSlice } from '../prismicio-types';

	import '../scss/index.scss';

	export let data;

	let darkTheme: boolean;
	if (browser) {
		const { userPrefersDark } = getUserThemePreference();
		darkTheme = userPrefersDark;
	}

	const privacyPolicyModalSlice = data.privacyPolicy.data
		.slices[0] as PrivacyPolicyModalContentSlice;
</script>

<svelte:head>
	<script>
		const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		document.body?.dataset.bsTheme = userPrefersDark ? 'dark' : 'light';
	</script>
	<HeapAnalytics />
	{#if darkTheme}
		{@html dracula}
	{:else}
		{@html solarizedLight}
	{/if}
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	<Breadcrumbs />
	{#key $page.route.id}
		<div in:blur={{ delay: 400 }}>
			<slot />
		</div>
	{/key}
	<AppFooter />
	<PrivacyPolicyModal privacyPolicyContent={privacyPolicyModalSlice} />
	<SvelteQueryDevtools styleNonce={undefined} />
</QueryClientProvider>
