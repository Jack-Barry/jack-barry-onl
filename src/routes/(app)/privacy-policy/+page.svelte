<script lang="ts">
  import PrivacyPolicyContent from '$lib/components/content/privacyPolicy/PrivacyPolicyContent.svelte';
  import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';
  import { JACK_BARRY } from '$lib/utils/constants.js';
  import { formattedDate } from '$lib/utils/dates.js';
  import {
    consentToCookieUsage,
    userPreviouslyConsentedToCookieUsage,
    userPreviouslyDeniedCookieUsage
  } from '$lib/utils/privacy.js';

  const publishDate = '2023-11-11T21:51:06+0000';
  const modifiedDate = '2023-12-05T02:14:43+0000';

  /**
   * If user hasn't denied or consented before and lands on this page, consider
   *   it as consenting to cookies usage
   */
  if (!userPreviouslyDeniedCookieUsage() && !userPreviouslyConsentedToCookieUsage()) {
    consentToCookieUsage();
  }
</script>

<HeadMetadata
  siteTitle={'Privacy Policy'}
  ogImageTitle={JACK_BARRY}
  ogImageSubtitle={'Privacy Policy'}
  description={"Privacy policy for Jack Barry's personal website"}
  {publishDate}
  {modifiedDate}
/>

<h1>Privacy Policy</h1>
<div class="fs-fine-print text-secondary mb-2">
  Last updated: {formattedDate(modifiedDate)}
</div>
<PrivacyPolicyContent />
