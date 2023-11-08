<script lang="ts">
	import FilterIcon from 'bootstrap-icons/icons/funnel-fill.svg?component';
	import ClearIcon from 'bootstrap-icons/icons/x-circle-fill.svg?component';
	import EnableAllIcon from 'bootstrap-icons/icons/check-circle-fill.svg?component';
	import { scale } from 'svelte/transition';
	import BlogPostPreview from '$lib/components/BlogPostPreview.svelte';
	import TagsList from '$lib/components/TagsList.svelte';
	import { blogPosts } from '$lib/api/prismic/blogPosts.js';
	import { createQuery } from '@tanstack/svelte-query';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	export let data;
	let showFilter = false;
	function toggleShowFilter() {
		showFilter = !showFilter;
	}

	let searchTerm = '';

	const tagsMap = data.tags.map((tag) => ({ tag, active: true }));

	function toggleTag(tag: string) {
		const matchingTagIndex = tagsMap.findIndex((t) => t.tag === tag);
		if (matchingTagIndex > -1) {
			tagsMap[matchingTagIndex].active = !tagsMap[matchingTagIndex].active;
		}
	}

	function toggleAllTags(active: boolean) {
		for (let i = 0; i < tagsMap.length; i++) {
			tagsMap[i].active = active;
		}
	}

	let debouncedSearchTerm = '';
	let searchTimeout: NodeJS.Timeout;
	function handleSearch(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		searchTimeout = setTimeout(() => {
			debouncedSearchTerm = (event.target as { value?: string })?.value ?? '';
		}, 300);
	}

	let activeTags: string[] = [];
	$: allTagsEnabled = tagsMap.every((t) => t.active);
	$: noTagsEnabled = !tagsMap.some((t) => t.active);
	$: filtersActive = !(allTagsEnabled || noTagsEnabled) || !!searchTerm.length;
	$: {
		activeTags = tagsMap.reduce<string[]>((result, current) => {
			if (current.active) {
				result.push(current.tag);
			}
			return result;
		}, []);
	}

	const { queryKeys, invoke } = blogPosts.getPosts;
	$: options = {
		tags: activeTags.length === data.tags.length ? [] : activeTags,
		searchTerm: debouncedSearchTerm
	};
	$: filteredPosts = createQuery({
		queryKey: queryKeys.forOptions(options),
		queryFn: async () => await invoke(fetch, options)
	});
</script>

<svelte:head>
	<title>Jack Barry | Blog</title>
	<meta name="description" content="Blog posts by Jack Barry" />
</svelte:head>

<div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-2">
	<h1>Blog</h1>
	<div class="d-flex gap-2">
		<button
			type="button"
			class="btn btn-outline-secondary position-relative"
			on:click={toggleShowFilter}
		>
			<FilterIcon />
			{showFilter ? 'Hide' : 'Show'} filters
			{#if filtersActive}
				<span
					class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
				>
					<span class="visually-hidden">Filters are currently active</span>
				</span>
			{/if}
		</button>
		{#if showFilter}
			<button
				transition:scale
				type="button"
				class="btn btn-outline-danger order-sm-first"
				disabled={!filtersActive}
				on:click={() => {
					searchTerm = '';
					toggleAllTags(true);
				}}
			>
				<ClearIcon /> Clear all filters
			</button>
		{/if}
	</div>
</div>
{#if showFilter}
	<div transition:scale class="mb-3">
		<div class="form-floating mb-3">
			<input
				type="search"
				class="form-control"
				id="searchInput"
				placeholder="Search"
				bind:value={searchTerm}
				on:input={handleSearch}
			/>
			<label for="floatingInput">Search</label>
		</div>
		<div>
			<header>Filter by tag:</header>
			<div class="d-flex align-items-start gap-2 flex-column flex-sm-row">
				<div>
					<TagsList
						tags={tagsMap}
						onClick={(tag) => {
							toggleTag(tag.tag);
						}}
					/>
				</div>
				<div class="flex-fill d-flex flex-row flex-sm-column gap-1">
					<div>
						<button
							type="button"
							class="btn btn-outline-success btn-sm text-nowrap"
							disabled={allTagsEnabled}
							on:click={() => {
								toggleAllTags(true);
							}}
						>
							<EnableAllIcon /> Enable all tags
						</button>
					</div>
					<div>
						<button
							type="button"
							class="btn btn-outline-danger btn-sm text-nowrap"
							disabled={noTagsEnabled}
							on:click={() => {
								toggleAllTags(false);
							}}
						>
							<ClearIcon /> Clear all tags
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<hr />
{/if}
<div class="d-flex gap-3 flex-column pb-3">
	{#if $filteredPosts.isLoading}
		<div class="w-100 d-flex justify-content-center mt-5">
			<LoadingSpinner size="3rem" />
		</div>
	{:else if $filteredPosts.error}
		<div>{JSON.stringify($filteredPosts.error)}</div>
	{:else if $filteredPosts.data?.results.length}
		{#each $filteredPosts.data?.results || [] as post}
			<BlogPostPreview
				{post}
				{activeTags}
				onTagClick={(t) => {
					toggleTag(t.tag);
				}}
			/>
		{/each}
	{:else}
		<div class="alert alert-warning" role="alert">No posts match the current filters</div>
	{/if}
</div>
