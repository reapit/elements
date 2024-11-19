/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import wyw from '@wyw-in-js/vite'

export default defineConfig({
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      },
      formats: ['es', 'cjs'],
    },
    outDir: 'dist/js',
  },
  plugins: [
    react(),
    svgr(),
    wyw({
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
  test: {
    coverage: {
      provider: 'v8',
    },
    environment: 'happy-dom',
    globals: true,
    include: ["src/**/*.test.ts?(x)"],
    setupFiles: ['vitest.setup.ts'],
  },
})
