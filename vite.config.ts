import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: 'src/app/styles/quasar-variables.sass',
    }),
    eslintPlugin(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
