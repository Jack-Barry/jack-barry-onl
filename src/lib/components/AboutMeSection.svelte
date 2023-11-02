<script lang="ts">
	// import { PrismicRichText } from '@prismicio/svelte';
	import type { AboutPageDocument } from '../../prismicio-types';
	import AccordionItem from './bootstrap/AccordionItem.svelte';

	export let aboutMe: AboutPageDocument;
	const accordionId = 'aboutMeAccordion';
</script>

<h2>About me</h2>
<div class="accordion mb-5" id={accordionId}>
	<AccordionItem parentId={accordionId} id="accordion-item-career" title="Career">
		<!-- <PrismicRichText field={aboutMe.data.about_me_professional} /> -->
	</AccordionItem>
	<AccordionItem parentId={accordionId} id="accordion-item-personal" title="Personal">
		<!-- <PrismicRichText field={aboutMe.data.about_me_personal} /> -->
	</AccordionItem>
</div>
