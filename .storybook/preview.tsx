import React from 'react'
import { ThemeProvider } from '../src/components/theme-provider'
import '../src/styles/globals'

import type { Preview } from '@storybook/react'
import type { Theme } from '../src/tokens'

const preview: Preview = {
  decorators: [
    // NOTE: This decorator is used to wrap all stories with the ThemeProvider
    // and apply the selected `theme` from the Storybook toolbar.
    (Story, { globals: { theme } }) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  globals: {
    theme: 'reapit',
  },
  globalTypes: {
    theme: {
      description: 'Reapit Design System theme',
      toolbar: {
        dynamicTitle: true,
        icon: 'paintbrush',
        items: ['reapit', 'payprop'] satisfies Theme[],
        title: 'Theme',
      },
    },
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'Light', value: '#F2F4F6' },
        { name: 'Dark', value: '#222B33' },
      ],
    },
    viewMode: 'docs',
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Welcome', 'Introduction', 'Concepts', 'Change Log', '*'],
      },
    },
  },
}

export default preview
