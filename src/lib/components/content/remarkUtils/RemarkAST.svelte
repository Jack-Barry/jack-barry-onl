<script lang="ts">
  import type { Root } from 'hast';
  import RemarkAstNode from './RemarkASTNode.svelte';

  interface Props {
    content: Root['children'];
  }

  let { content }: Props = $props();
</script>

{#each content as node}
  <RemarkAstNode content={node} />
{/each}
