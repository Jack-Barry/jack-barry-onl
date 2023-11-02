<script lang="ts">
	import { blur, fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import AppFooter from '$lib/components/AppFooter.svelte';

	import '../scss/index.scss';
	import { navigating, page } from '$app/stores';

	const ComponentConstructor = browser
		? // @ts-ignore -- don't need typings for this
		  import('bootstrap/dist/js/bootstrap.bundle').then((module) => module.Component)
		: new Promise(() => {});

	export let data;
	$: if ($navigating) console.log();
</script>

{#await ComponentConstructor}
	<div class="vh-100 vw-100 p-2 d-flex flex-column justify-content-center">
		<div class="d-flex justify-content-center">
			<div class="animate__animated animate__heartBeat animate__infinite">
				<div class="spinner-border" role="status" style="width:5rem;height:5rem;">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
		</div>
	</div>
{:then _}
	{#if $page.data.breadcrumbs}
		<nav aria-label="breadcrumb" class="pt-4 px-4 px-sm-5 mw-main-content mx-auto">
			<ol class="breadcrumb">
				{#each $page.data.breadcrumbs as breadcrumb, index}
					{#if index !== $page.data.breadcrumbs.length - 1}
						<li class="breadcrumb-item"><a href={breadcrumb.href}>{breadcrumb.label}</a></li>
					{:else}
						<li class="breadcrumb-item active" aria-current="page">{breadcrumb.label}</li>
					{/if}
				{/each}
			</ol>
		</nav>
	{/if}
	{#key data.pathname}
		<div in:blur={{ duration: 300, delay: 400 }} out:blur={{ duration: 300 }}>
			<slot />
		</div>
	{/key}
	<AppFooter />
{:catch error}
	<p>Something went wrong: {error.message}</p>
{/await}
