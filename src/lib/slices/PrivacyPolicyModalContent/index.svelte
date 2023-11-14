<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import type Modal from '$lib/components/bootstrap/Modal.svelte';

	export let slice: Content.PrivacyPolicyModalContentSlice;
	export let modalComponent: Modal;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<PrismicRichText field={slice.primary.policy_notice} />
	<p>
		For more information or to opt in/out, please refer to the full <a
			href="/privacy-policy"
			on:click={modalComponent.hideModal}>Privacy Policy</a
		>.
	</p>
</section>
