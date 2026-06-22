import preview from '#.storybook/preview'
import { Button } from '#src/core/button'
import { ThemeProvider } from './theme-provider'

const meta = preview.meta({
  title: 'Utils/ThemeProvider',
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
  globals: { theme: 'reapit' },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '80px',
      },
    },
  },
  args: {
    children: <Button variant="primary">I&apos;m themed</Button>,
    theme: 'reapit',
  },
})

/** The only other supported theme is the PayProp theme. */
export const PayProp = Reapit.extend({
  name: 'PayProp',
  globals: { theme: 'payprop' },
  args: {
    theme: 'payprop',
  },
})
