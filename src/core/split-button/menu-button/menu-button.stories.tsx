import preview from '#.storybook/preview'
import { SplitButton } from '../split-button'
import { SplitButtonContext } from '../context'

const meta = preview.meta({
  title: 'Buttons/SplitButton/MenuButton',
  component: SplitButton.MenuButton,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    'aria-disabled': {
      control: 'boolean',
    },
    'aria-expanded': {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <SplitButtonContext.Provider value={{ busy: undefined, size: 'medium', variant: 'primary' }}>
        <Story />
      </SplitButtonContext.Provider>
    ),
  ],
})

export const Example = meta.story({
  args: {
    'aria-disabled': false,
    'aria-expanded': false,
    'aria-label': 'More actions',
    disabled: false,
    isBusy: false,
  },
})

/**
 * The MenuButton respects the SplitButton's variant: `primary` or `secondary`.
 */
export const Variants = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <SplitButtonContext.Provider value={{ busy: undefined, size: 'medium', variant: 'primary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ busy: undefined, size: 'medium', variant: 'secondary' }}>
          <Story />
        </SplitButtonContext.Provider>
      </div>
    ),
  ],
})

/**
 * The MenuButton also respects the SplitButton's size: `small`, `medium`, and `large`.
 */
export const Sizes = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <SplitButtonContext.Provider value={{ busy: undefined, size: 'small', variant: 'primary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ busy: undefined, size: 'medium', variant: 'primary' }}>
          <Story />
        </SplitButtonContext.Provider>
        <SplitButtonContext.Provider value={{ busy: undefined, size: 'large', variant: 'primary' }}>
          <Story />
        </SplitButtonContext.Provider>
      </div>
    ),
  ],
})

/**
 * The MenuButton can be disabled using either the `disabled` or `aria-disabled` prop. When disabled, the button is
 * not interactive. When `aria-disabled` is set, the button remains focusable but is styled as disabled.
 *
 * Generally, disabling the menu button should be avoided, as it decreases the discoverability of the secondary
 * actions in the menu.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})

/**
 * If any menu items performs an asynchronous action, the menu button should be marked as busy until
 * that action is complete. This can be achieved using `isBusy`. Busy buttons are disabled to prevent
 * the action being triggered again.
 */
export const Busy = Example.extend({
  args: {
    isBusy: true,
  },
})
