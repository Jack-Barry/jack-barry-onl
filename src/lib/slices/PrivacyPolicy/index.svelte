<script lang="ts">
	import LoadingEllipsis from '$lib/components/LoadingEllipsis.svelte';
	import {
		checkTrackingDataDeletionStatus,
		consentToCookieUsage,
		denyCookieUsage,
		getTrackingDataDeletionRequestId,
		userPreviouslyDeniedCookieUsage
	} from '$lib/utils/privacy';
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { writable } from 'svelte/store';

	export let slice: Content.PrivacyPolicySlice;

	const hasDeniedCookieUsage = userPreviouslyDeniedCookieUsage();
	let isOptedIn = writable(!hasDeniedCookieUsage);
	let checkingDataDeletionStatus = writable(false);
	let dataDeletionStatus = writable('');

	async function handleConsentChange(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const optIn = (e.target as { checked?: boolean })?.checked;
		optIn ? consentToCookieUsage() : await denyCookieUsage();
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

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<PrismicRichText field={slice.primary.policy} />
	<h2>Cookie preferences for this browser</h2>
	<div class="form-check form-switch">
		<input
			class="form-check-input"
			type="checkbox"
			role="switch"
			id="flexSwitchCheckDefault"
			bind:checked={$isOptedIn}
			on:change={handleConsentChange}
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
