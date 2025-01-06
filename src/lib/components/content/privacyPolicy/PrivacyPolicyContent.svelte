<script lang="ts">
  import { writable } from 'svelte/store';

  import LoadingEllipsis from '$lib/components/LoadingEllipsis.svelte';
  import {
    checkTrackingDataDeletionStatus,
    consentToCookieUsage,
    denyCookieUsage,
    getTrackingDataDeletionRequestId,
    userPreviouslyDeniedCookieUsage
  } from '$lib/utils/privacy';

  const hasDeniedCookieUsage = userPreviouslyDeniedCookieUsage();
  let isOptedIn = writable(!hasDeniedCookieUsage);
  let checkingDataDeletionStatus = writable(false);
  let dataDeletionStatus = writable('');

  async function handleConsentChange(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    const optIn = (e.target as { checked?: boolean })?.checked;
    if (!optIn) {
      await denyCookieUsage();
      return;
    }

    consentToCookieUsage();
  }

  checkDataDeletionStatus();
  async function checkDataDeletionStatus() {
    if (getTrackingDataDeletionRequestId()) {
      checkingDataDeletionStatus.set(true);
      try {
        const response = await checkTrackingDataDeletionStatus();
        dataDeletionStatus.set(response?.status || '');
      } catch {
        dataDeletionStatus.set('unknown');
      } finally {
        checkingDataDeletionStatus.set(false);
      }
    }
  }
</script>

<section>
  <p>
    I'm a developer, not a data-harvesting megacorp or cash-strapped startup looking to make a quick
    buck. I use cookies on my site, and I want you to know why and what data is collected. Here's my
    concise privacy policy (I'm clearly not a lawyer).
  </p>
  <p>
    I use <a href="https://www.heap.io/" target="_blank">Heap Analytics</a> to track user interactions,
    ensuring data anonymity. I won't sell your data; it's solely for fixing website issues and gauging
    impactful content. No Personally Identifying Information is collected.
  </p>
  <p>
    The anonymized data collected by Heap Analytics is retained for up to 12 months. <span
      class="text-bg-warning"
      >By using this site with analytics tracking enabled, you consent to the use of cookies and
      data collection (for yourself and anyone else using the browser you are using to view this
      site) as described in this policy.</span
    >
  </p>
  <p>
    If you're like me and block ad trackers with PiHole, cookies from <code>heapanalytics.com</code>
    used for my site are ineffective. I'm committed to transparency and respect your right to privacy.
    If you have any concerns or questions, feel free to DM me on Discord or Reddit.
  </p>
  <h2>Cookie preferences for this browser</h2>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="checkbox"
      role="switch"
      id="flexSwitchCheckDefault"
      bind:checked={$isOptedIn}
      onchange={handleConsentChange}
    />
    <label class="form-check-label" for="flexSwitchCheckDefault">
      Allow anonymous analytics tracking
    </label>
  </div>
  {#if !$isOptedIn}
    <div>
      Status of tracking data deletion request: {#if $checkingDataDeletionStatus}
        <LoadingEllipsis />
      {:else}
        {$dataDeletionStatus}
      {/if}
    </div>
  {/if}
</section>
