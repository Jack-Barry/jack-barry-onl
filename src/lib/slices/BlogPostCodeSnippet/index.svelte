<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import type { LanguageType } from 'svelte-highlight/languages';
	import java from 'svelte-highlight/languages/java';
	import javascript from 'svelte-highlight/languages/javascript';
	import powershell from 'svelte-highlight/languages/powershell';
	import shell from 'svelte-highlight/languages/shell';
	import typescript from 'svelte-highlight/languages/typescript';
	import yaml from 'svelte-highlight/languages/yaml';

	export let slice: Content.CodeBlockSlice;
	// prismic props https://prismic.io/docs/svelte-template#slices
	export let slices;
	slices;
	export let context;
	context;
	export let index;
	index;

	const lang = slice.primary.language;
	const code = (slice.primary.code[0] as { text: string }).text;
	let language: LanguageType<string>;
	switch (lang) {
		case 'java':
			language = java;
			break;
		case 'javascript':
			language = javascript;
			break;
		case 'powershell':
			language = powershell;
			break;
		case 'typescript':
			language = typescript;
			break;
		case 'yaml':
			language = yaml;
			break;
		case 'shell':
		default:
			language = shell;
			break;
	}
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="mb-3">
	<Highlight {code} {language} langtag let:highlighted>
		<LineNumbers {highlighted} hideBorder />
	</Highlight>
</section>
