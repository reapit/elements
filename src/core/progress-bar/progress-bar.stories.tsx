import preview from '#.storybook/preview'
import { DeterminateProgressBar } from './determinate-progress-bar'
import { IndeterminateProgressBar } from './indeterminate-progress-bar'

const meta = preview.meta({
  title: 'Indicators and status/ProgressBar',
  component: DeterminateProgressBar,
  subcomponents: { IndeterminateProgressBar },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
})

export const Example = meta.story({
  args: {
    'aria-label': 'Upload progress',
    value: 50,
  },
})

/**
 * The value is clamped between `0` and `100`, so out-of-range values are handled safely.
 */
export const Complete = Example.extend({
  args: {
    value: 100,
  },
})

/**
 * `IndeterminateProgressBar` is used to communicate a task is in progress when its completion progress or
 * duration cannot be determined, such as while waiting for a server response.
 */
export const Indeterminate = meta.story({
  args: {
    'aria-label': 'Loading',
    // `value` isn't a prop of `IndeterminateProgressBar` and `render` below never passes it on. It's only
    // here to satisfy `meta`'s args type, which is inferred from `DeterminateProgressBar`. The `argTypes`
    // override hides it from the controls table so it doesn't appear as a usable control.
    value: 0,
  },
  argTypes: {
    value: {
      table: { disable: true },
    },
  },
  render: (args) => <IndeterminateProgressBar aria-label={args['aria-label']} />,
})
