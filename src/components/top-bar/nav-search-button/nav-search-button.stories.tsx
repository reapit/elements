import { TopBarNavSearchButton } from './nav-search-button'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/TopBar/NavSearchButton',
  component: TopBarNavSearchButton,
  argTypes: {
    onClick: {
      control: false,
    },
    shortcut: {
      control: 'text',
    },
  },
} satisfies Meta<typeof TopBarNavSearchButton>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    onClick: () => void 0,
    shortcut: '',
  },
}

/**
 * For products that facilitate a keyboard shortcut to launch the search experience, a `shortcut` can be supplied to
 * display the appropriate shortcut text. Typically, the shortcut should either be `Ctrl+K` or `⌘K` depending on the
 * platform used by the currently logged in user.
 *
 * Importantly, to communicate the keyboard shortcut to assistive technologies, the
 * [aria-keyshortcuts](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-keyshortcuts)
 * attribute should also be supplied.
 */
export const Shortcut: Story = {
  args: {
    ...Example.args,
    'aria-keyshortcuts': 'Meta+K',
    shortcut: '⌘K',
  },
}
