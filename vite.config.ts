import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { manifest } from './src/manifest';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), tsconfigPaths(), crx({ manifest }), svgr()],
    // @todo: remove it when the problem is solved https://github.com/crxjs/chrome-extension-tools/issues/696
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173,
      },
    },
  };
});
