<script lang="ts">
	import ArrowRight from 'bootstrap-icons/icons/arrow-right.svg?component';
	import NewsSvg from 'bootstrap-icons/icons/newspaper.svg?component';
	import { formattedDate } from '$lib/utils/dates';

	import type { BlogPostDocument } from '../../../prismicio-types';
	import TagsList from './TagsList.svelte';
	import type { TagObject } from './types';
	import { readable, type Readable } from 'svelte/store';

	export let post: Pick<BlogPostDocument, 'uid' | 'first_publication_date' | 'data' | 'tags'>;
	export let withIcon: boolean = false;
	export let activeTags: Readable<string[]> = readable([]);
	export let onTagClick: (tag: TagObject) => void | Promise<void> = () => {};

	$: tags = post.tags.map((tag) => ({ tag, selected: $activeTags.includes(tag) }));
</script>

<div class="card w-100 position-relative shadow-sm">
	{#if withIcon}
		<span
			class="position-absolute top-0 start-100 translate-middle pt-1 px-2 pb-1 rounded-circle text-bg-primary"
		>
			<NewsSvg class="mb-1" />
			<span class="visually-hidden">Most recent blog post</span>
		</span>
	{/if}
	<div class="card-body">
		<div class="mb-1">
			<TagsList {tags} onClick={onTagClick} />
		</div>
		<h5 class="card-title">{post.data.meta_title}</h5>
		<p class="mb-0">{formattedDate(post.first_publication_date, { condensed: true })}</p>
		<p class="mb-0">{post.data.meta_description}</p>
		<div class="text-end">
			<a href={`/blog/${post.uid}`} class="icon-link icon-link-hover">
				Read more
				<ArrowRight />
			</a>
		</div>
	</div>
</div>
