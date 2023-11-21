<script>
	import { scale } from 'svelte/transition';

	import { page } from '$app/stores';
	import JbLogoSvg from '$lib/assets/jb-logo.svg?component';
</script>

{#if $page.data.breadcrumbs}
	<!-- Padding to account for fixed header -->
	<div class="py-5 mb-5" />
	<div class="fixed-top py-3 bg-body shadow-sm">
		<nav
			transition:scale
			aria-label="breadcrumb"
			class="px-4 px-sm-5 mw-main-content mx-auto d-flex gap-3 align-items-center"
		>
			<a href="/">
				<JbLogoSvg height="2rem" width="2rem" />
			</a>
			<ol class="breadcrumb mb-0">
				{#each $page.data.breadcrumbs as breadcrumb, index}
					{#if index !== $page.data.breadcrumbs.length - 1}
						<li class="breadcrumb-item"><a href={breadcrumb.href}>{breadcrumb.label}</a></li>
					{:else}
						<li class="breadcrumb-item active" aria-current="page">{breadcrumb.label}</li>
					{/if}
				{/each}
			</ol>
		</nav>
	</div>
{/if}
