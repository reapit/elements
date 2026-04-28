import { defineMain } from '@storybook/react-vite/node'

export default defineMain({
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-mcp'],
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
  // StorybookConfigRaw types experimental_manifests as a static Manifests object, but the
  // preset pipeline accepts a function (PresetValue) at runtime, exactly as the framework and
  // addon presets that generate the manifest do. The cast is necessary because StorybookConfig
  // doesn't expose the PresetValue<Manifests> overload for user config.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experimental_manifests: ((manifests: any) => {
    const components: Record<string, { path: string }> | undefined = manifests?.components?.components
    if (!components) return manifests
    return {
      ...manifests,
      components: {
        ...manifests.components,
        components: Object.fromEntries(
          Object.entries(components).filter(([, c]) => !c.path.startsWith('src/deprecated/')),
        ),
      },
    }
  }) as any,
})
