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
      exclude: [
        'src/styles',
        'src/storybook',
        'src/tests',
        'src/tokens',
        'src/types',
        '**/*.test.*',
        '**/*.stories.*',
        '**/*.d.ts',
      ],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      provider: 'v8',
      reporter: ['json-summary', 'text', 'lcov'],
      reportsDirectory: 'coverage/report',
      thresholds: {
        branches: 71,
        functions: 84,
        lines: 90,
        statements: 90,
      },
    },
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.test.ts?(x)'],
    setupFiles: ['vitest.setup.ts'],
  },
})
