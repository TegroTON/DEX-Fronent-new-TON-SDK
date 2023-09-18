import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { nodeResolve } from '@rollup/plugin-node-resolve';


export default defineConfig({
 server: {
    https: true,
    host: 'socialland.ru',
    port: 443
  },
  plugins: [react()],
  resolve: {
    alias: {
      util: 'web-encoding',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Преобразование глобальных переменных Node.js в globalThis для браузера
      define: {
        global: 'globalThis',
      },
      // Включение esbuild плагина для полифиллинга Node.js
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  build: {
    // Указание цели сборки на ESNext
    target: ['ESNext'],
    rollupOptions: {
      plugins: [
        // Использование плагина для полифиллинга Node.js
        nodePolyfills(),
        NodeModulesPolyfillPlugin(),
        nodeResolve({ browser: true }),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true, // Включение опции для смешанных модулей ES
    },
  },
});
