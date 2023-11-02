<script lang="ts">
	import NewsSvg from 'bootstrap-icons/icons/newspaper.svg?component';
	import type { BlogPostDocument } from '../../prismicio-types';
	import { formattedDate } from '$lib/utils/dates';

	export let post: BlogPostDocument;
	export let withIcon: boolean = false;
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
		<!-- <h5 class="card-title">{post.data.title}</h5> -->
		<p class="mb-0">{formattedDate(post.first_publication_date, { condensed: true })}</p>
		<!-- <p class="mb-0 text-truncate">{post.data.meta_description}</p> -->
		<div class="text-end">
			<a href={`/blog/${post.uid}`}>Read more</a>
		</div>
	</div>
</div>
