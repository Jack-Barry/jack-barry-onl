<script lang="ts">
  import { browser } from '$app/environment';
  import RemarkAst from '$lib/components/content/remarkUtils/RemarkAST.svelte';
  import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';
  import { BY_JACK_BARRY } from '$lib/utils/constants.js';
  import { formattedDate } from '$lib/utils/dates.js';
  import { getUserThemePreference } from '$lib/utils/theme/getUserThemePreference';
  let { data } = $props();

  if (browser) {
    const { userPrefersDark } = getUserThemePreference();
    if (userPrefersDark) {
      import('highlight.js/styles/atom-one-dark.min.css');
    } else {
      import('highlight.js/styles/atom-one-light.min.css');
    }
  }
</script>

<HeadMetadata
  siteTitle={`${data.metadata.title}`}
  ogImageSubtitle={BY_JACK_BARRY}
  description={`${data.metadata.description}`}
  publishDate={data.metadata.published}
  modifiedDate={data.metadata.updated}
/>

<article>
  <h1>{data.metadata.title}</h1>
  <div class="d-flex flex-column gap-2">
    <p class="mb-0">{formattedDate(data.metadata.published)}</p>
    {#if data.metadata.updated && data.metadata.updated !== data.metadata.published}
      <p class="text-secondary fs-fine-print">
        Last edited: {formattedDate(data.metadata.updated)}
      </p>
    {/if}
  </div>
  <hr class="mt-0" />
  <RemarkAst content={data.content.children} />
</article>
