import React from 'react'
import { ThemeProvider } from '../src/components/theme-provider'
import '../src/styles/globals'

import type { Preview } from '@storybook/react-vite'
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
        { name: 'light', value: 'var(--colour-fill-neutral-lightest)' },
        { name: 'dark', value: 'var(--colour-fill-neutral-darkest)' },
      ],
    },
    viewport: {
      viewports: {
        superWideScreen: {
          name: 'Super Wide Screen',
          type: 'desktop',
          styles: {
            width: '1920px',
            height: '1500px',
          },
        },
        wideScreen: {
          name: 'Wide Screen',
          type: 'desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
        desktop: {
          name: 'Desktop',
          type: 'desktop',
          styles: {
            width: '1024px',
            height: '900px',
          },
        },
        tablet: {
          name: 'Tablet',
          type: 'tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        mobile: {
          name: 'Mobile',
          type: 'mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
      },
    },
    viewMode: 'docs',
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Welcome', 'Introduction', 'Concepts', 'Change Log', '*'],
      },
    },
  },

  initialGlobals: {
    theme: 'reapit',
  },

  tags: ['autodocs']
}

export default preview
