<script lang="ts">
	import JbLogoSvg from '$lib/assets/jb-logo.svg?raw';
	const decodedSvg = `data:image/svg+xml,${encodeURIComponent(JbLogoSvg)}`;

	export let title = 'Jack Barry';
	export let subtitle: string;
</script>

<div
	style="height: 100vh; display: flex; flex-direction: column; align-items: stretch; justify-content: center; padding: 4vw; background: rgb(255,255,255); background: linear-gradient(315deg, rgba(245, 249, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);"
>
	<div style="display: flex; flex-direction: column; align-items: center;">
		<h1>{title}</h1>
		{#if subtitle}
			<h2>{subtitle}</h2>
		{/if}
	</div>
	<div style="display: flex; justify-content: center; gap: 10vh;">
		<img style="height: 16vh" alt="" src={decodedSvg} />
	</div>
</div>
