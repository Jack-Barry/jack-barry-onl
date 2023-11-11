<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	const ellipsis = writable('.');
	const interval = setInterval(() => {
		ellipsis.update((prev) => {
			if (prev.length < 3) {
				return `${prev}.`;
			}

			return '';
		});
	}, 200);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<span class="d-inline-block text-start">{$ellipsis}</span>

<style>
	span {
		width: 1rem;
	}
</style>
