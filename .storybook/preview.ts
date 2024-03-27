import { Preview } from '@storybook/react'
import '../src/styles/globals'

const preview: Preview = {
  parameters: {
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
