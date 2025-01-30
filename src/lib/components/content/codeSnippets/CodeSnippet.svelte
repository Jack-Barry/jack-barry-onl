<script module lang="ts">
  import CopySvg from 'bootstrap-icons/icons/clipboard.svg?component';
  import CopiedSvg from 'bootstrap-icons/icons/clipboard-check.svg?component';
  import { writable } from 'svelte/store';

  import hljs, { type LanguageFn } from 'highlight.js';
  // Begin supported langs
  import go from 'highlight.js/lib/languages/go';
  import java from 'highlight.js/lib/languages/java';
  import javascript from 'highlight.js/lib/languages/javascript';
  import powershell from 'highlight.js/lib/languages/powershell';
  import python from 'highlight.js/lib/languages/python';
  import rust from 'highlight.js/lib/languages/rust';
  import shell from 'highlight.js/lib/languages/shell';
  import typescript from 'highlight.js/lib/languages/typescript';
  import yaml from 'highlight.js/lib/languages/yaml';
  // End supported langs

  import { browser } from '$app/environment';
  import { getUserThemePreference } from '$lib/utils/theme/getUserThemePreference';

  if (browser) {
    const { userPrefersDark } = getUserThemePreference();
    if (userPrefersDark) {
      import('highlight.js/styles/atom-one-dark.min.css');
    } else {
      import('highlight.js/styles/atom-one-light.min.css');
    }
  }
</script>

<script lang="ts">
  interface Props {
    lang?: string;
    code: string;
  }

  let { lang = 'shell', code }: Props = $props();

  let langFn: LanguageFn;
  switch (lang) {
    case 'go':
      langFn = go;
      break;
    case 'java':
      langFn = java;
      break;
    case 'javascript':
      langFn = javascript;
      break;
    case 'powershell':
      langFn = powershell;
      break;
    case 'python':
      langFn = python;
      break;
    case 'rust':
      langFn = rust;
      break;
    case 'typescript':
      langFn = typescript;
      break;
    case 'yaml':
      langFn = yaml;
      break;
    case 'shell':
    default:
      langFn = shell;
      break;
  }

  if (!hljs.getLanguage(lang)) {
    hljs.registerLanguage(lang, langFn);
  }

  const codeWasCopied = writable(false);

  function copyCode() {
    navigator.clipboard.writeText(code);
    codeWasCopied.set(true);
    setTimeout(() => {
      codeWasCopied.set(false);
    }, 2000);
  }

  const highlighted = $derived(hljs.highlight(code, { language: lang }).value);
</script>

<section class="position-relative mb-3">
  <div class="position-absolute top-0 end-0 mt-2 me-2">
    <button onclick={copyCode} class="btn btn-outline-secondary">
      {#if $codeWasCopied}
        <CopiedSvg />
      {:else}
        <CopySvg />
      {/if}
    </button>
  </div>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- only used for trusted content -->
  <pre data-language={lang}><code class="hljs rounded">{@html highlighted}</code></pre>
</section>

<style>
  @media (max-width: 767.98px) {
    code.hljs {
      padding-top: 3rem;
    }
  }
</style>
