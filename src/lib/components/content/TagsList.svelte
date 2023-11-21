<script lang="ts">
	import type { TagObject } from './types';

	export let tags: TagObject[];
	export let onClick: (tag: TagObject) => void | Promise<void> = () => {};
</script>

<div class="d-flex flex-wrap gap-1">
	{#each tags.sort((a, b) => a.tag.localeCompare(b.tag)) as tag (tag.tag)}
		<button
			class="btn btn-sm"
			class:btn-primary={tag.selected}
			class:btn-outline-primary={!tag.selected}
			on:click={() => {
				onClick(tag);
			}}
		>
			{tag.tag}
		</button>
	{/each}
</div>
