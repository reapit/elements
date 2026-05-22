import { defineMain } from '@storybook/react-vite/node'
import fs from 'node:fs'
import { rewriteImports } from './rewrite-imports'

const layerOrder = fs.readFileSync(new URL('../src/styles/layer-order.css', import.meta.url), 'utf-8')

export default defineMain({
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-mcp'],
  // Inject the cascade layer order declaration into the preview iframe's <head>
  // before any component CSS loads. See src/styles/ARCHITECTURE.md for context.
  previewHead: (head = '') => `<style>${layerOrder}</style>\n${head}`,
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  typescript: {
    // The default, react-docgen, does not support namespace-based prop types. So we use
    // react-docgen-typescript instead to ensure the arg types are properly extracted.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      exclude: ['.storybook/preview.tsx'],
    },
  },
  features: {
    experimentalReactComponentMeta: true,
  },
  // StorybookConfigRaw types experimental_manifests as a static Manifests object, but the
  // preset pipeline accepts a function (PresetValue) at runtime, exactly as the framework and
  // addon presets that generate the manifest do. The suppression below is necessary because
  // StorybookConfig doesn't expose the PresetValue<Manifests> overload for user config.
  //
  // @ts-expect-error -- StorybookConfig does not expose the PresetValue<Manifests> overload
  experimental_manifests: (manifests: any) => {
    const components: Record<string, { path: string; import?: string }> | undefined = manifests?.components?.components
    if (!components) return manifests

    const entries = Object.entries(components)
      // We don't want our deprecated components available via MCP, so we exclude them here
      .filter(([, c]) => !c.path.startsWith('src/deprecated/'))
      // We currently need to rewrite the imports for our components to ensure they use subpath imports
      .map(([id, c]) => [id, { ...c, import: rewriteImports(c.import) }])

    return {
      ...manifests,
      components: {
        ...manifests.components,
        components: Object.fromEntries(entries),
      },
    }
  },
})
