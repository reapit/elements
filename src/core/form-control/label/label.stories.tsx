import preview from '#.storybook/preview'
import { FormControl } from '../form-control'

const meta = preview.meta({
  title: 'Input and selection/FormControl/Label',
  component: FormControl.Label,
  argTypes: {
    as: {
      control: false,
    },
    children: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: "'medium'" },
      },
    },
  },
})

export const Example = meta.story({
  args: {
    as: 'label',
    children: 'Label',
    htmlFor: 'my-form-control',
    size: 'medium',
  },
})

/** The label text will naturally wrap to additional lines when it does not have sufficient space. */
export const Wrapping = Example.extend({
  args: {
    children: 'This is a long label that won’t fit in a single row',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', border: '1px solid #FA00FF' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * The label can render as a `<legend>` element. This is useful when the parent `FormControl` is rendering
 * as a `<fieldset>`.
 */
export const Legend = meta.story({
  args: {
    as: 'legend',
    children: 'Label',
    size: 'medium',
  },
})
