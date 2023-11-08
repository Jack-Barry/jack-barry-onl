<script lang="ts">
	import type { RTImageNode } from '@prismicio/client';

	export let node: RTImageNode;
</script>

<div class="d-flex align-items-center my-3">
	<img class="img-fluid mx-auto" src={node.url} alt={node.alt} />
	<slot />
</div>
