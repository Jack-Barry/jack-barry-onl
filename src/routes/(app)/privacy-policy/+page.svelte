<script lang="ts">
	import PrivacyPolicy from '$lib/slices/PrivacyPolicy/index.svelte';
	import { formattedDate } from '$lib/utils/dates.js';
	import type { PrivacyPolicySlice } from '../../../prismicio-types.js';

	export let data;

	const { privacyPolicy } = data;
	const slice = privacyPolicy.data.slices[0] as PrivacyPolicySlice;
</script>

<h1>Privacy Policy</h1>
<div class="fs-fine-print text-secondary mb-2">
	Last updated: {formattedDate(privacyPolicy.last_publication_date)}
</div>
<PrivacyPolicy {slice} />
