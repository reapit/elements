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
export const Invalid: StoryObj<typeof TextArea> = {
  args: {
    placeholder: 'Description',
    required: true,
  },
}

/**
 * A Text area can be disabled in forms to prevent their use. When disabled, the text area cannot be focused and its
 * value will not be submitted with the form.
 */
export const Disabled: StoryObj<typeof TextArea> = {
  args: {
    placeholder: 'Description',
    disabled: true,
  },
}

/**
 * A Text area can also be marked as read-only in forms to prevent their current value being changed. Unlike a disabled
 * text area, a read-only text area can still be focused, and its value will still be submitted with the form.
 */
export const ReadOnly: StoryObj<typeof TextArea> = {
  args: {
    value: "I can't be edited",
    readOnly: true,
  },
}

/**
 * Text area's can automatically grow or shrink between a min and/or max row count. The min and max rows define the
 * number of lines of text that should be visible within the text area. If the number of lines exceeds the specified
 * maximum, the text area's content will overflow with a scrollbar.
 *
 * **Note:** This resizing behaviour is available for CSS-only consumers on Chrome and Edge. For browsers that do not
 * yet support the [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing) property, we fallback
 * to a JS-based resizing solution that is only available to React-based consumers.
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
 * This next example demonstrates auto-sizing behaviour for a *controlled* text area.
 *
 * **Note:** to change the value of the text area, you will need to use the `value` control when viewing the
 * story individually.
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
 * Importantly, when an explicit row count is specified, no resizing will occur, whether the text area's
 * value is controlled or not. This allows text areas to have a fixed size when necessary.
 */
export const FixedSize: StoryObj<typeof TextArea> = {
  args: {
    placeholder: 'Type here...',
    rows: 10,
  },
}
