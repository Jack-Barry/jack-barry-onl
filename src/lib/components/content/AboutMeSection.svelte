<script lang="ts">
	import { PrismicRichText } from '@prismicio/svelte';
	import type { AboutPageDocument } from '../../../prismicio-types';
	import AccordionItem from '../bootstrap/AccordionItem.svelte';
	import Image from '../prismic/Image.svelte';

	export let aboutMe: AboutPageDocument;
	const accordionId = 'aboutMeAccordion';
</script>

<h2>About me</h2>
<div class="accordion mb-5" id={accordionId}>
	<AccordionItem parentId={accordionId} id="accordion-item-career" title="Career">
		<PrismicRichText field={aboutMe.data.career} components={{ image: Image }} />
	</AccordionItem>
	<AccordionItem
		parentId={accordionId}
		id="accordion-item-personal"
		title="Personal"
		bodyClass="pb-1"
	>
		<PrismicRichText field={aboutMe.data.personal} components={{ image: Image }} />
	</AccordionItem>
</div>
