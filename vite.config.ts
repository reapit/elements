/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import dts from 'vite-plugin-dts'
import wyw from '@wyw-in-js/vite'
import packageManifest from './package.json'

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
    rollupOptions: {
      // NOTE: This function ensures all peerDependencies defined in our package manifest are correctly externalised
      // (i.e. not bundled into our build artefact/s)
      external(id, _, isResolved) {
        // A resolved id is an absolute file path to the module being imported and since the names of our package's
        // peers do not correlate to the folder name thanks to the `@console` scope our package names typically
        // include, we cannot have enough confidence to externalise a resolved id. Thus we always return false.
        if (isResolved) {
          return false
        }

        const peerDependencies = Object.keys(packageManifest.peerDependencies)

        return peerDependencies.some((packageName) => {
          // Imports from a peer dependency fall into one of two categories:
          //  1. From the peer's root entry point, e.g. `import { Foo } from "my-peer-dependency"`; or,
          //  2. From a peer's subpath/non-root entry point, e.g. `import Foo from "my-peer-dependency/foo".
          //
          // The `id` we have here will be `my-peer-dependency` and `my-peer-dependency/foo` respectively.
          // Since `my-peer-dependency` is the name of a package declared as a peer, we want to externalise
          // both imports. However, we do not want to externalise an `id` like `my-peer-dependency-alt`, so
          // it is important we do not simply look for a substring match.
          //
          // So, for scenario (1), we check for an exact match, and for scenario (2), we check if the `id`
          // starts with the peer's name AND a `/`. The inclusion of the trailing slash is to avoid partial
          // matches against an `id` that happens to have our peer's name as a valid substring.
          return id === packageName || id.startsWith(`${packageName}/`)
        })
      },
    },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    wyw({
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
    dts(),
  ],
  test: {
    coverage: {
      exclude: [
        'src/styles',
        'src/storybook',
        'src/tests',
        'src/tokens',
        'src/types',
        // Note: We don't want to report coverage for:
        // - story utilities
        '**/__story__/**',
        // - barrel files
        '**/index.ts',
        // - our tests themselves
        '**/*.test.*',
        // - our stories
        '**/*.stories.*',
        // - any type declaration files
        '**/*.d.ts',
      ],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      provider: 'v8',
      reporter: ['json-summary', 'text', 'lcov'],
      reportsDirectory: 'coverage/report',
      thresholds: {
        branches: 71,
        functions: 84,
        lines: 87,
        statements: 87,
      },
    },
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.test.ts?(x)'],
    setupFiles: ['vitest.setup.ts'],
  },
})
