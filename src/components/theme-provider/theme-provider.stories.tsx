import { Button } from '../button'
import { ThemeProvider } from './theme-provider'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  argTypes: {
    children: {
      control: false,
    },
    theme: {
      control: 'radio',
      options: ['reapit', 'payprop'],
    },
  },
} satisfies Meta<typeof ThemeProvider>

type Story = StoryObj<typeof meta>

export default meta

/** The default theme applied to the document is the Reapit theme. It is applied when either the document's
 * root element has a `data-theme="reapit"` attribute, or no `data-theme` attribute at all. */
export const Reapit: Story = {
  args: {
    children: <Button variant="primary">I&apos;m themed</Button>,
    theme: 'reapit',
  },
}

/**
 * The only other supported theme is the PayProp theme.
 *
 * **note:** This theme is not fully setup via our CSS variables yet, so this story is will not demonstrate any
 * practical difference in the rendered button at this stage.
 */
export const PayProp: Story = {
  args: {
    ...Reapit.args,
    theme: 'payprop',
  },
}
