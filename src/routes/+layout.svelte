<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { blur } from 'svelte/transition';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import HeapAnalytics from '$lib/analytics/HeapAnalytics.svelte';
	import AppFooter from '$lib/components/layout/AppFooter.svelte';
	import Breadcrumbs from '$lib/components/layout/Navbar.svelte';
	import PrivacyPolicyModal from '$lib/components/content/PrivacyPolicyModal.svelte';
	import { getUserThemePreference } from '$lib/utils/theme/getUserThemePreference';
	import type { PrivacyPolicyModalContentSlice } from '../prismicio-types';

	import '../scss/index.scss';
	import { onMount } from 'svelte';

	export let data;

	if (browser) {
		getUserThemePreference();
	}

	const privacyPolicyModalSlice = data.privacyPolicy.data
		.slices[0] as PrivacyPolicyModalContentSlice;

	onMount(() => {
		// facilitate e2e testing by waiting for hydration
		document.body.classList.add('base-layout-mounted');
	});
</script>

<svelte:head>
	{#if !$page.data.isTestEnv}
		<HeapAnalytics />
	{/if}
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	<Breadcrumbs />
	{#key $page.route?.id}
		<!-- <div in:blur={{ delay: 400 }}> -->
		<slot />
		<!-- </div> -->
	{/key}
	<AppFooter />
	<PrivacyPolicyModal privacyPolicyContent={privacyPolicyModalSlice} />
	<SvelteQueryDevtools styleNonce={undefined} />
</QueryClientProvider>
