import { readFileSync } from 'node:fs';

import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import { defineConfig, type Plugin } from 'vitest/config';
import { extname, relative } from 'node:path';

const reloadPlugin: Plugin = {
  name: 'reload',
  configureServer(server) {
    const { ws, watcher } = server;
    watcher.on('change', (file) => {
      if (extname(file) === '.json') {
        console.log(`Reloading for change to ${relative(import.meta.dirname, file)}`);
        ws.send({
          type: 'full-reload'
        });
      }
    });
  }
};

export default defineConfig({
  plugins: [sveltekit(), svg(), rawFonts(['.ttf']), reloadPlugin],

  build: {
    sourcemap: true
  },

  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});

/** Allows fonts to be used for social media image generation */
function rawFonts(ext: string[]) {
  return {
    name: 'vite-plugin-raw-fonts',
    transform(_: unknown, id: string) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return { code: `export default ${JSON.stringify(buffer)}`, map: null };
      }
    }
  };
}
