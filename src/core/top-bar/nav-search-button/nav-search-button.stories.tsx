import preview from '#.storybook/preview'
import { TopBar } from '../top-bar'

const meta = preview.meta({
  title: 'Core/TopBar/NavSearchButton',
  component: TopBar.NavSearchButton,
  argTypes: {
    onClick: {
      control: false,
    },
    shortcut: {
      control: 'text',
    },
  },
})

export const Example = meta.story({
  args: {
    onClick: () => void 0,
    shortcut: '',
  },
})

/**
 * For products that facilitate a keyboard shortcut to launch the search experience, a `shortcut` can be supplied to
 * display the appropriate shortcut text. Typically, the shortcut should either be `Ctrl+K` or `⌘K` depending on the
 * platform used by the currently logged in user.
 *
 * Importantly, to communicate the keyboard shortcut to assistive technologies, the
 * [aria-keyshortcuts](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-keyshortcuts)
 * attribute should also be supplied.
 */
export const Shortcut = Example.extend({
  args: {
    'aria-keyshortcuts': 'Meta+K',
    shortcut: '⌘K',
  },
})
