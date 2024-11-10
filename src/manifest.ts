import { defineManifest } from '@crxjs/vite-plugin';

export const manifest = defineManifest({
  manifest_version: 3,
  name: 'Language switcher',
  version: '1.0.0',
  action: {
    default_popup: 'index.html',
  },
  default_locale: 'ru',
  icons: {
    '16': 'logo_16.png',
    '32': 'logo_32.png',
    '48': 'logo_48.png',
    '128': 'logo_128.png',
  },
  background: {
    service_worker: './src/background/background.ts',
  },
  content_scripts: [
    {
      matches: ['https://*/*', 'http://*/*'],
      js: ['src/content-script/content-script.ts'],
    },
  ],
  permissions: [
    'tabs',
    'storage',
    'downloads',
    'activeTab',
    'scripting',
    'contextMenus',
  ],
});
