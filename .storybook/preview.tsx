import addonDocs from '@storybook/addon-docs'
import addonA11y from '@storybook/addon-a11y'
import addonLinks from '@storybook/addon-links'
import { definePreview } from '@storybook/react-vite'
import { ThemeProvider } from '#src/core/theme-provider'
import { BreakpointMinimumDimensions } from '#src/utils/breakpoints'

import '../src/styles/globals'
import './preview.css'

import type { Theme } from '../src/tokens'

export default definePreview({
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
      options: {
        light: { name: 'light', value: 'var(--colour-fill-neutral-lightest)' },
        dark: { name: 'dark', value: 'var(--colour-fill-neutral-darkest)' },
      },
    },
    viewport: {
      options: {
        '2XL': {
          name: '2XL (4KScreen)',
          type: 'desktop',
          styles: {
            width: BreakpointMinimumDimensions['2XL'],
            height: '1500px',
          },
        },
        XL: {
          name: 'XL (SuperWideScreen)',
          type: 'desktop',
          styles: {
            width: BreakpointMinimumDimensions.XL,
            height: '1500px',
          },
        },
        LG: {
          name: 'LG (WideScreen)',
          type: 'desktop',
          styles: {
            width: BreakpointMinimumDimensions.LG,
            height: '900px',
          },
        },
        MD: {
          name: 'MD (Desktop)',
          type: 'desktop',
          styles: {
            width: BreakpointMinimumDimensions.MD,
            height: '900px',
          },
        },
        SM: {
          name: 'SM (Tablet)',
          type: 'tablet',
          styles: {
            width: BreakpointMinimumDimensions.SM,
            height: '1024px',
          },
        },
        XS: {
          name: 'XS (Mobile)',
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
        order: ['Welcome', 'Getting Started', 'Changelog', '*'],
      },
    },
  },

  initialGlobals: {
    theme: 'reapit',
  },

  tags: ['autodocs'],
  addons: [addonLinks(), addonA11y(), addonDocs()],
})
