<script lang="ts">
  import { writable } from 'svelte/store';
  import { page } from '$app/state';
  import Modal from '$lib/components/bootstrap/Modal.svelte';
  import {
    consentToCookieUsage,
    userPreviouslyConsentedToCookieUsage,
    userPreviouslyDeniedCookieUsage
  } from '$lib/utils/privacy';

  let modalComponent: Modal = $state() as Modal;

  const hasAcknowledged = writable(true);
  /**
   * If user lands on privacy policy page directly, don't bother them with the
   *   modal pop-up, they're already looking at the relevant info
   */
  const shouldPresentModal = page.route.id !== '/(app)/privacy-policy';
  if (shouldPresentModal) {
    // give the user a couple seconds to land before popping the cookie consent modal
    const popupTimer = setTimeout(
      () => {
        hasAcknowledged.set(
          !!(userPreviouslyConsentedToCookieUsage() || userPreviouslyDeniedCookieUsage())
        );
        clearTimeout(popupTimer);
      },
      page.data.isTestEnv ? 500 : 2000
    );
  }

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
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
      onclick={acknowledge}
    ></button>
  </div>
  <div class="modal-body">
    <section>
      <p>
        This site uses cookies to track user interactions, ensuring data anonymity. I won't sell
        your data; it's solely for fixing website issues and gauging impactful content. No
        Personally Identifying Information is collected.
      </p>
      <p>
        The anonymized data collected is retained for up to 12 months. <span class="text-bg-warning"
          >By using this site with analytics tracking enabled, you consent to the use of cookies and
          data collection as described in this site's privacy policy.</span
        >
      </p>
      <p>
        For more information or to opt in/out, please refer to the full <a
          href="/privacy-policy"
          onclick={modalComponent.hideModal}>Privacy Policy</a
        >.
      </p>
    </section>
  </div>
  <div class="modal-footer">
    <a class="btn btn-secondary" href="/privacy-policy" onclick={modalComponent.hideModal}>
      Show me my options
    </a>
    <button type="button" class="btn btn-primary" onclick={acknowledge}>OK, that's fine</button>
  </div>
</Modal>
