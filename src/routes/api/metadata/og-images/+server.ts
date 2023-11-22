import satori from 'satori';
import { html as toReactNode } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import PlayfairDisplay from '$lib/assets/fonts/Playfair_Display/static/PlayfairDisplay-Medium.ttf';
import OGCard from '$lib/components/metadata/OGCard.svelte';

const HEIGHT = 630;
const WIDTH = 1200;

export const GET = async ({ url }) => {
	const { searchParams } = url;
	// build HTML
	const title = searchParams.get('title') ?? undefined;
	const subtitle = searchParams.get('subtitle') ?? undefined;
	const result = OGCard.render({ title, subtitle });
	const html = toReactNode(`${result.html}<style>${result.css.code}</style>`);

	// translate HTML to SVG
	const svg = await satori(html, {
		fonts: [
			{
				name: 'Playfair Display',
				data: Buffer.from(PlayfairDisplay),
				style: 'normal'
			}
		],
		height: HEIGHT,
		width: WIDTH
	});

	// translate SVG to PNG
	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: WIDTH
		}
	});
	const image = resvg.render();

	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
};
