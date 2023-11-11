<script lang="ts">
	import EnableAllIcon from 'bootstrap-icons/icons/check-circle-fill.svg?component';
	import FilterIcon from 'bootstrap-icons/icons/funnel-fill.svg?component';
	import ClearIcon from 'bootstrap-icons/icons/x-circle-fill.svg?component';
	import { derived, writable } from 'svelte/store';
	import { scale, fly } from 'svelte/transition';

	import { infiniteQueryBlogPosts } from '$lib/api/client/prismic';
	import BlogPostPreview from '$lib/components/content/BlogPostPreview.svelte';
	import TagsList from '$lib/components/content/TagsList.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { useDebouncedInput } from '$lib/utils/debounce.js';
	import LoadingEllipsis from '$lib/components/LoadingEllipsis.svelte';
	import TransitionContainer from '$lib/components/layout/TransitionContainer.svelte';

	export let data;

	const { queryOptions, query } = infiniteQueryBlogPosts();
	const filtersActive = derived(queryOptions, ($queryOptions) => {
		return !!($queryOptions.searchTerm?.length || $queryOptions.tags?.length);
	});

	const showFilter = writable(false);
	function toggleShowFilter() {
		showFilter.update((prev) => !prev);
	}

	const { debouncedInputValue: debouncedSearchTerm, liveInputValue: liveSearchTerm } =
		useDebouncedInput();

	const tags = writable(data.allTags.map((t) => ({ tag: t, selected: false })));
	const ratioTagsSelected = writable(1);

	function toggleTag(tag: string) {
		tags.update((prev) =>
			prev.map((t) => {
				if (t.tag !== tag) {
					return t;
				}

				return { ...t, selected: !t.selected };
			})
		);
	}

	function toggleAllTags(selected: boolean) {
		tags.update((prev) => prev.map((t) => ({ ...t, selected })));
	}

	$: {
		queryOptions.update((prev) => ({ ...prev, searchTerm: $debouncedSearchTerm }));
	}
	$: {
		const selectedTags = $tags.filter((t) => t.selected).map((t) => t.tag);
		ratioTagsSelected.set(selectedTags.length / data.allTags.length);
		if (!selectedTags.length || selectedTags.length === data.allTags.length) {
			// if all or none are selected, tag filtering is irrelevant
			queryOptions.update((prev) => ({ ...prev, tags: undefined }));
		} else {
			queryOptions.update((prev) => ({ ...prev, tags: selectedTags }));
		}
	}

	$: visiblySelectedTags = $queryOptions.tags || $ratioTagsSelected ? data.allTags : [];
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
			{$showFilter ? 'Hide' : 'Show'} filters
			{#if $filtersActive}
				<span
					class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
				>
					<span class="visually-hidden">Filters are currently active</span>
				</span>
			{/if}
		</button>
		{#if $showFilter}
			<button
				transition:scale
				type="button"
				class="btn btn-outline-danger order-sm-first"
				disabled={!$filtersActive}
				on:click={() => {
					liveSearchTerm.set('');
					toggleAllTags(false);
				}}
			>
				<ClearIcon /> Clear all filters
			</button>
		{/if}
	</div>
</div>
{#if $showFilter}
	<div transition:scale class="mb-3">
		<div class="form-floating mb-3">
			<input
				type="search"
				class="form-control"
				id="searchInput"
				placeholder="Search"
				bind:value={$liveSearchTerm}
			/>
			<label for="floatingInput">Search</label>
		</div>
		<div>
			<header>Filter by tag:</header>
			<div class="d-flex align-items-start gap-2 flex-column flex-sm-row">
				<div>
					<TagsList
						tags={$tags}
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
							disabled={$ratioTagsSelected === 1}
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
							disabled={$ratioTagsSelected === 0}
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
<TransitionContainer>
	<div class="d-flex gap-3 flex-column pb-3">
		{#if $query.isLoading}
			<div class="w-100 d-flex justify-content-center mt-5">
				<LoadingSpinner size="3rem" />
			</div>
		{:else if $query.error}
			<div>{JSON.stringify($query.error.message)}</div>
		{:else if $query.data?.pages.length && $query.data.pages[0].results.length}
			<div transition:fly class="d-flex flex-column gap-3">
				{#each $query.data.pages as page}
					{#each page.results || [] as post}
						<BlogPostPreview
							{post}
							activeTags={visiblySelectedTags}
							onTagClick={(t) => {
								toggleTag(t.tag);
							}}
						/>
					{/each}
				{/each}
				<button
					class="btn btn-outline-primary"
					on:click={() => {
						$query.fetchNextPage();
					}}
					disabled={!$query.hasNextPage || $query.isFetchingNextPage}
				>
					{#if $query.isFetchingNextPage}
						Loading more<LoadingEllipsis />
					{:else if $query.hasNextPage}
						Load More
					{:else}
						All posts{$filtersActive ? ' matching current filters' : ''} have been loaded
					{/if}
				</button>
			</div>
		{:else}
			<div transition:fly class="alert alert-warning" role="alert">
				No posts match the current filters
			</div>
		{/if}
	</div>
</TransitionContainer>
