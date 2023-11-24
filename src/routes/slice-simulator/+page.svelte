<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { SliceSimulator } from '@slicemachine/adapter-sveltekit/simulator';

	import { components } from '$lib/slices';
</script>

<SliceSimulator let:slices>
	<SliceZone {slices} {components} />
</SliceSimulator>
