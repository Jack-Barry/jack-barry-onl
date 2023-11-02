<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
	import type { SVGAttributes } from 'svelte/elements';

	export let href: string;
	export let Icon: ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>;
</script>

<a class="icon-link link-opacity-50 link-opacity-75-hover" {href} target="_blank">
	<svelte:component this={Icon} transform="scale(1.5)" />
</a>
