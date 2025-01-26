import satori from 'satori';
import { html as toReactNode } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import PlayfairDisplay from '$lib/assets/fonts/Playfair_Display/static/PlayfairDisplay-Medium.ttf';
import OgImage from '$lib/components/metadata/OGImage.svelte';
import { METADATA_IMAGE_DIMENSIONS } from '$lib/components/metadata/constants.js';
import type { ImagePlatform } from '$lib/components/metadata/types.js';
import { render } from 'svelte/server';

export const GET = async ({ url }) => {
  const { searchParams } = url;

  // build HTML
  const title = searchParams.get('title') ?? undefined;
  const subtitle = searchParams.get('subtitle') ?? undefined;

  const result = render(OgImage, {
    props: {
      title,
      subtitle
    }
  });

  const html = toReactNode(`<head>${result.head}</head><body>${result.body}</body>`);

  // translate HTML to SVG
  const platform = (searchParams.get('platform') as ImagePlatform) ?? 'facebook';
  const imageDimensions =
    platform === 'twitter' ? METADATA_IMAGE_DIMENSIONS.TWITTER : METADATA_IMAGE_DIMENSIONS.FACEBOOK;
  const svg = await satori(html, {
    fonts: [
      {
        name: 'Playfair Display',
        data: Buffer.from(PlayfairDisplay),
        style: 'normal'
      }
    ],
    ...imageDimensions
  });

  // translate SVG to PNG
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: imageDimensions.width }
  });
  const image = resvg.render();

  return new Response(image.asPng(), {
    headers: { 'content-type': 'image/png' }
  });
};
