<script lang="ts">
  import type { Component } from 'svelte';
  import type { SVGAttributes } from 'svelte/elements';

  interface Props {
    href: string;
    Icon: Component<SVGAttributes<SVGSVGElement>>;
  }

  let { href, Icon }: Props = $props();
</script>

<a class="icon-link link-opacity-50 link-opacity-75-hover" {href} target="_blank">
  <Icon transform="scale(1.5)" />
</a>
