<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="px-4 px-sm-5 mw-main-content mx-auto">
  {@render children?.()}
</div>
