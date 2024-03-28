<script context="module" lang="ts">
	import type { Content } from '@prismicio/client';
	import CopySvg from 'bootstrap-icons/icons/clipboard.svg?component';
	import CopiedSvg from 'bootstrap-icons/icons/clipboard-check.svg?component';
	import { writable } from 'svelte/store';

	import hljs, { type LanguageFn } from 'highlight.js';
	// Begin supported langs
	import go from 'highlight.js/lib/languages/go';
	import java from 'highlight.js/lib/languages/java';
	import javascript from 'highlight.js/lib/languages/javascript';
	import powershell from 'highlight.js/lib/languages/powershell';
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
	export let slice: Content.CodeBlockSlice;
	// prismic props https://prismic.io/docs/svelte-template#slices
	export let slices;
	slices;
	export let context;
	context;
	export let index;
	index;

	const lang = slice.primary.language || 'shell';
	const code = (slice.primary.code[0] as { text: string }).text;
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

	const highlighted = hljs.highlight(code, { language: lang }).value;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="position-relative mb-3"
>
	<div class="position-absolute top-0 end-0 mt-2 me-2">
		<button on:click={copyCode} class="btn btn-outline-secondary">
			{#if $codeWasCopied}
				<CopiedSvg />
			{:else}
				<CopySvg />
			{/if}
		</button>
	</div>
	<pre data-language={lang}><code class="hljs rounded">{@html highlighted}</code></pre>
</section>

<style>
	@media (max-width: 767.98px) {
		code.hljs {
			padding-top: 3rem;
		}
	}
</style>
