<script lang="ts">
	import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';
	import PrivacyPolicy from '$lib/slices/PrivacyPolicy/index.svelte';
	import { JACK_BARRY } from '$lib/utils/constants.js';
	import { formattedDate } from '$lib/utils/dates.js';
	import {
		consentToCookieUsage,
		userPreviouslyConsentedToCookieUsage,
		userPreviouslyDeniedCookieUsage
	} from '$lib/utils/privacy.js';
	import type { PrivacyPolicySlice } from '../../../prismicio-types.js';

	export let data;

	const { privacyPolicy } = data;
	const slice = privacyPolicy.data.slices[1] as PrivacyPolicySlice;

	/**
	 * If user hasn't denied or consented before and lands on this page, consider
	 *   it as consenting to cookies usage
	 */
	if (!userPreviouslyDeniedCookieUsage() && !userPreviouslyConsentedToCookieUsage()) {
		consentToCookieUsage();
	}
</script>

<HeadMetadata
	siteTitle={`${privacyPolicy.data.meta_title}`}
	ogImageTitle={JACK_BARRY}
	ogImageSubtitle={`${privacyPolicy.data.meta_title}`}
	description={`${privacyPolicy.data.meta_description}`}
	publishDate={privacyPolicy.first_publication_date}
	modifiedDate={privacyPolicy.last_publication_date}
/>

<h1>Privacy Policy</h1>
<div class="fs-fine-print text-secondary mb-2">
	Last updated: {formattedDate(privacyPolicy.last_publication_date)}
</div>
<PrivacyPolicy {slice} />
