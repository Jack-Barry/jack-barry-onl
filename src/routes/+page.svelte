<script lang="ts">
  import ArrowRight from 'bootstrap-icons/icons/arrow-right.svg?component';

  import JbLogoSvg from '$lib/assets/jb-logo.svg?component';
  import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';
  import { JACK_BARRY } from '$lib/utils/constants';
</script>

<HeadMetadata
  siteTitle={'Professional Nerd'}
  ogImageTitle={JACK_BARRY}
  ogImageSubtitle={'Professional Nerd'}
  description={'Jack Barry is a software developer based in El Paso, TX. He loves Jesus, his family, music, and tinkering with tech.'}
/>

<div class="h-main-content vw-100 p-2 d-flex flex-column justify-content-center">
  <div class="d-flex align-items-center justify-content-center">
    <div class="card shadow-sm">
      <div class="card-body">
        <div
          class="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 p-4"
        >
          <div>
            <h1>Jack Barry</h1>
            <h2>Professional Nerd</h2>
            <p>Welcome to my over-engineered personal site</p>
          </div>
          <div class="animate__animated animate__flip">
            <JbLogoSvg />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center overflow-hidden">
    <a
      class="icon-link icon-link-hover animate__animated animate__bounceInUp animate__delay-1s"
      href="/home"
    >
      Enter
      <ArrowRight />
    </a>
  </div>
</div>
