<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { browser } from '$app/environment';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import HeapAnalytics from '$lib/analytics/HeapAnalytics.svelte';
  import AppFooter from '$lib/components/layout/AppFooter.svelte';
  import Breadcrumbs from '$lib/components/layout/Navbar.svelte';
  import PrivacyPolicyModal from '$lib/components/content/privacyPolicy/PrivacyPolicyModal.svelte';
  import { getUserThemePreference } from '$lib/utils/theme/getUserThemePreference';

  import '../scss/index.scss';

  let { data, children } = $props();

  if (browser) {
    getUserThemePreference();
  }

  onMount(() => {
    // facilitate e2e testing by waiting for hydration
    document.body.classList.add('base-layout-mounted');
  });

  beforeNavigate(async () => {
    if (!browser) return;
    document.getElementsByTagName('html')[0].classList.add('pageSwitch');
  });

  afterNavigate(async () => {
    if (!browser) return;
    await tick();
    document.getElementsByTagName('html')[0].classList.remove('pageSwitch');
  });
</script>

<svelte:head>
  {#if !data.isTestEnv}
    <HeapAnalytics />
  {/if}
</svelte:head>

<Breadcrumbs />
{@render children?.()}
<AppFooter />
<PrivacyPolicyModal />

<style>
  :global(html.pageSwitch) {
    scroll-behavior: auto;
  }
</style>
