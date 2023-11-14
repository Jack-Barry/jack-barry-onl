<script lang="ts">
	import PrivacyPolicyModalContent from '$lib/slices/PrivacyPolicyModalContent/index.svelte';
	import {
		consentToCookieUsage,
		userPreviouslyConsentedToCookieUsage,
		userPreviouslyDeniedCookieUsage
	} from '$lib/utils/privacy';
	import { writable } from 'svelte/store';
	import type { PrivacyPolicyModalContentSlice } from '../../../prismicio-types';
	import Modal from '../bootstrap/Modal.svelte';

	export let privacyPolicyContent: PrivacyPolicyModalContentSlice;
	let modalComponent: Modal;

	const hasAcknowledged = writable(true);
	// give the user a couple seconds to land before popping the cookie consent modal
	const popupTimer = setTimeout(() => {
		hasAcknowledged.set(
			!!(userPreviouslyConsentedToCookieUsage() || userPreviouslyDeniedCookieUsage())
		);
		clearTimeout(popupTimer);
	}, 2000);

	function acknowledge() {
		consentToCookieUsage();
		modalComponent.hideModal();
	}
</script>

<Modal
	modalId="cookies-consent-modal"
	showOnLoad={!$hasAcknowledged}
	dialogClass="modal-fullscreen-sm-down modal-dialog-centered"
	bind:this={modalComponent}
>
	<div class="modal-header">
		<h5 class="modal-title">Obligatory Cookies Disclosure</h5>
		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	</div>
	<div class="modal-body">
		<PrivacyPolicyModalContent slice={privacyPolicyContent} {modalComponent} />
	</div>
	<div class="modal-footer">
		<a class="btn btn-secondary" href="/privacy-policy" on:click={modalComponent.hideModal}>
			Show me my options
		</a>
		<button type="button" class="btn btn-primary" on:click={acknowledge}>OK, that's fine</button>
	</div>
</Modal>
