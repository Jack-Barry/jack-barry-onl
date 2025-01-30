<script lang="ts">
  import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';
  import { BY_JACK_BARRY } from '$lib/utils/constants';
</script>

<HeadMetadata
  siteTitle="Projects"
  ogImageTitle="Projects"
  ogImageSubtitle={BY_JACK_BARRY}
  description="A collection of small projects I maintaing as part of my personal site"
/>

<h1>Projects</h1>
<p>Here are a few little projects I maintain as part of my personal site</p>

<ul>
  <li>
    <a href="/projects/ugly-json-viewer">Ugly JSON Viewer</a> is a lightweight utility for prettifying
    stringified JSON. It helps in particular with JSON that has nested stringified JSON in it, like when
    you're reading CloudWatch Logs for SQS messages and things of that sort.
  </li>
</ul>
