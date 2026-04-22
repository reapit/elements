import preview from '#.storybook/preview'
import { Button } from '../button'
import { ThemeProvider } from './theme-provider'

const meta = preview.meta({
  title: 'Core/ThemeProvider',
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
})

/** The default theme applied to the document is the Reapit theme. It is applied when either the document's
 * root element has a `data-theme="reapit"` attribute, or no `data-theme` attribute at all. */
export const Reapit = meta.story({
  args: {
    children: <Button variant="primary">I&apos;m themed</Button>,
    theme: 'reapit',
  },
})

/**
 * The only other supported theme is the PayProp theme.
 *
 * **note:** This theme is not fully setup via our CSS variables yet, so this story is will not demonstrate any
 * practical difference in the rendered button at this stage.
 */
export const PayProp = Reapit.extend({
  args: {
    theme: 'payprop',
  },
})
