<script lang="ts">
  import type { RootContent } from 'hast';
  import RemarkAst from './RemarkAST.svelte';
  import CodeSnippet from '$lib/components/content/codeSnippets/CodeSnippet.svelte';
  import {
    getCodeSnippetParamsForNode,
    isCodeSnippet
  } from '$lib/components/content/codeSnippets/utils';
  import Image from '$lib/components/content/Image.svelte';

  interface Props {
    content: RootContent;
  }

  let { content }: Props = $props();

  const { lang: codeLang, text: codeText } = getCodeSnippetParamsForNode(content);
</script>

{#if content.type === 'element'}
  {#if content.tagName === 'img'}
    <Image
      src={content.properties.src as string}
      alt={content.properties.alt as string}
      width={content.properties.width as string}
    />
  {:else if isCodeSnippet(content)}
    <CodeSnippet code={codeText} lang={codeLang}></CodeSnippet>
  {:else}
    <svelte:element
      this={content.tagName}
      {...content.properties}
      class={(content.properties.className as string[])?.join(' ')}
    >
      <RemarkAst content={content.children}></RemarkAst>
    </svelte:element>
  {/if}
{:else if content.type === 'text'}
  {content.value}
{:else}
  <div class="text-bg-warning">
    <h6>Unhandled Content Type</h6>
    <div>{JSON.stringify(content)}</div>
  </div>
{/if}
