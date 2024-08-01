import { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './index'

export default {
  title: 'TextArea',
  component: TextArea,
} as Meta<typeof TextArea>

export const BasicUsage: StoryObj<typeof TextArea> = {
  args: {
    name: 'description',
    placeholder: 'Description',
  },
}

/**
 * A TextArea can be invalid in three ways:
 *
 *  - Applying any of the standard [HTML form validation attributes](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation) and providing a value that does not meet these constraints;
 *  - Using custom [constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation); or,
 *  - By explicitly setting `hasError` component prop to true (or the `el-text-area-has-error` class if using CSS only).
 *
 * The following example demonstrates a required text area that has no value, which is excersing option (1) above.
 */
export const InvalidValue: StoryObj<typeof TextArea> = {
  args: {
    placeholder: 'Type here...',
    required: true,
  },
}

/**
 * Text area's can automatically grow or shrink between a min and/or max row count. The min and max rows define the
 * number of lines of text that should be visible within the text area. If the number of lines exceeds the specified
 * maximum, the text area's content will overflow with a scrollbar.
 *
 * Note that the resizing behaviour is *not yet* available with CSS-only usage.
 *
 * This example demonstrates resizing behaviour for an *uncontrolled* text area.
 */
export const UncontrolledResizing: StoryObj<typeof TextArea> = {
  args: {
    defaultValue: '1\n2',
    placeholder: 'Type here...',
    maxRows: 5,
    minRows: 1,
  },
}

/**
 * This next example demonstrates auto-sizing behaviour for a *controlled* text area. To change the value of the text
 * area, you will need to use the `value` control.
 */
export const ControlledResizing: StoryObj<typeof TextArea> = {
  args: {
    placeholder: 'Type here...',
    maxRows: 5,
    minRows: 1,
    value: '1\n2\n3',
  },
}

/**
 * Importantly, when an explicit row count is specified, no autosizing will occur, whether the text area's
 * value is controlled or not.
 */
export const ExplicitRows: StoryObj<typeof TextArea> = {
  args: {
    placeholder: 'Type here...',
    rows: 10,
  },
}
