import { Menu } from '#src/core/menu'
import { SplitButton } from './split-button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/SplitButton',
  component: SplitButton,
  argTypes: {
    action: {
      control: 'radio',
      options: ['Default', 'Disabled', 'Disabled (aria-disabled)'],
      mapping: {
        Default: <SplitButton.Action>Button</SplitButton.Action>,
        Disabled: <SplitButton.Action disabled>Button</SplitButton.Action>,
        'Disabled (aria-disabled)': <SplitButton.Action aria-disabled="true">Button</SplitButton.Action>,
      },
    },
    menu: {
      control: 'radio',
      options: ['Default', 'Disabled', 'Disabled (aria-disabled)'],
      mapping: {
        Default: (
          <SplitButton.Menu aria-label="More actions">
            <Menu.Item>Action 1</Menu.Item>
            <Menu.Item>Action 2</Menu.Item>
          </SplitButton.Menu>
        ),
        Disabled: (
          <SplitButton.Menu aria-label="More actions" disabled>
            {/* NOTE: We don't bother defining any items because the menu is disabled. */}
            {null}
          </SplitButton.Menu>
        ),
        'Disabled (aria-disabled)': (
          <SplitButton.Menu aria-label="More actions" aria-disabled="true">
            {/* NOTE: We don't bother defining any items because the menu is disabled. */}
            {null}
          </SplitButton.Menu>
        ),
      },
    },
  },
} satisfies Meta<typeof SplitButton>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    action: 'Default',
    menu: 'Default',
    size: 'medium',
    variant: 'primary',
  },
}

/**
 * The `SplitButton` component supports the following button variants: `primary` and `secondary`.
 */
export const Variants: Story = {
  args: {
    ...Example.args,
    size: 'medium',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <SplitButton {...args} />
      <SplitButton {...args} variant="secondary" />
    </>
  ),
}

/**
 * The `SplitButton` component supports the following button sizes: `small`, `medium`, and `large`.
 */
export const Sizes: Story = {
  args: {
    ...Example.args,
    size: 'medium',
    variant: 'primary',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <SplitButton {...args} size="small" />
      <SplitButton {...args} size="medium" />
      <SplitButton {...args} size="large" />
    </>
  ),
}

/**
 * While the individual buttons that comprise the `SplitButton` can be disabled, try to avoid disabling the menu
 * button, as doing so will decrease the discoverability of the secondary actions in the menu.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    action: 'Disabled',
    menu: 'Disabled',
    variant: 'secondary',
  },
  argTypes: {
    action: {
      control: false,
    },
    menu: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(3, min-content)',
          gap: 'var(--spacing-6)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <SplitButton {...args} />
      <SplitButton {...args} action={meta.argTypes.action.mapping.Default} />
      <SplitButton {...args} menu={meta.argTypes.menu.mapping.Default} />
    </>
  ),
}

/**
 * When used within a form, a split button's primary action and menu items will, by default, submit
 * the form. This is how buttons associated with forms work (see MDN's documentation on the button
 * element's [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type)
 * attribute). If this is not desired, the `type` attribute can be set to `"button"`.
 *
 * For those that do participate in form submission, the `name` and `value` attributes can be used to
 * identify the button within the submitted form data. In this example, form submission will display
 * an alert dialog that shows which submit button was used.
 */
export const Forms: Story = {
  args: {
    action: (
      <SplitButton.Action name="action" value="send" type="submit">
        Send
      </SplitButton.Action>
    ),
    menu: (
      <SplitButton.Menu aria-label="More actions">
        <Menu.Item name="action" value="schedule">
          Schedule for later
        </Menu.Item>
      </SplitButton.Menu>
    ),
    size: 'medium',
    variant: 'primary',
  },
  decorators: [
    (Story) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (e.nativeEvent instanceof SubmitEvent) {
            // NOTE: form data won't include the submitter's name and value without the submitter
            // being passed to the FormData constructor.
            const formData = new FormData(e.currentTarget, e.nativeEvent.submitter)
            alert(`Action = ${formData.get('action')}`)
          }
        }}
      >
        <Story />
      </form>
    ),
  ],
}
