<script lang="ts">
	import { PrismicRichText } from '@prismicio/svelte';
	import ArrowRight from 'bootstrap-icons/icons/arrow-right.svg?component';

	import JbLogoSvg from '$lib/assets/jb-logo.svg?component';
	import HeadMetadata from '$lib/components/metadata/HeadMetadata.svelte';
	import { JACK_BARRY } from '$lib/utils/constants';

	export let data;
	const { data: homePage } = data.homePage;
</script>

<HeadMetadata
	siteTitle={`${homePage.meta_title}`}
	ogImageTitle={JACK_BARRY}
	ogImageSubtitle={`${homePage.meta_title}`}
	description={`${homePage.meta_description}`}
/>

<div class="h-main-content vw-100 p-2 d-flex flex-column justify-content-center">
	<div class="d-flex align-items-center justify-content-center">
		<div class="card shadow-sm">
			<div class="card-body">
				<div
					class="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 p-4"
				>
					<div>
						<PrismicRichText field={homePage.welcome_message} />
					</div>
					<div class="animate__animated animate__flip">
						<JbLogoSvg />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="text-center overflow-hidden">
		<a
			class="icon-link icon-link-hover animate__animated animate__bounceInUp animate__delay-1s"
			href="/home"
		>
			Enter
			<ArrowRight />
		</a>
	</div>
</div>
