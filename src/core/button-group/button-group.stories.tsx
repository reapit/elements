import preview from '#.storybook/preview'
import { ButtonGroup } from './button-group'

const meta = preview.meta({
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    align: {
      control: 'radio',
      options: ['start', 'end', 'center', 'stretch'],
    },
    // NOTE: `autoFlow` is deprecated and will be removed in a future release, but we still want to include
    // it in the Storybook controls for now so that users are aware of its existence and deprecation status.
    autoFlow: {
      control: false,
      description: '**Deprecated**. Use `orientation` instead',
    },
    children: {
      control: 'radio',
      options: ['Secondary', 'Primary action', 'Mixed buttons'],
      mapping: {
        Secondary: (
          <>
            <ButtonGroup.Item variant="secondary">Button 1</ButtonGroup.Item>
            <ButtonGroup.Item variant="secondary">Button 2</ButtonGroup.Item>
            <ButtonGroup.Item variant="secondary">Button 3</ButtonGroup.Item>
          </>
        ),
        'Primary action': (
          <>
            <ButtonGroup.Item variant="secondary">Button 1</ButtonGroup.Item>
            <ButtonGroup.Item variant="secondary">Button 2</ButtonGroup.Item>
            <ButtonGroup.Item variant="primary">Button 3</ButtonGroup.Item>
          </>
        ),
        'Mixed buttons': (
          <>
            <ButtonGroup.Item variant="tertiary">Button 1</ButtonGroup.Item>
            <ButtonGroup.Item variant="secondary">Button 2</ButtonGroup.Item>
            <ButtonGroup.Item variant="primary">Button 3</ButtonGroup.Item>
          </>
        ),
      },
    },
    // NOTE: `justifyContent` is deprecated and will be removed in a future release, but we still want to include
    // it in the Storybook controls for now so that users are aware of its existence and deprecation status.
    justifyContent: {
      control: false,
      description: '**Deprecated**. Use `align` instead',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'radio',
    },
  },
})

/**
 * Quite often, all buttons within the button group will be the same variant, but this is not strictly
 * required. What is strictly required is that button groups have at least one button, and all buttons
 * within the group share the same size.
 */
export const Example = meta.story({
  args: {
    align: 'start',
    children: 'Secondary',
    orientation: 'horizontal',
    size: 'medium',
  },
})

/**
 * It is common for one button to be a primary action. This is often the case with button groups used in
 * forms and dialogs.
 */
export const Primary = Example.extend({
  args: {
    children: 'Primary action',
    size: 'medium',
  },
})

/**
 * Of course, where appropriate, any valid button variant can be used within a button group.
 */
export const Mixed = Example.extend({
  args: {
    children: 'Mixed buttons',
    size: 'medium',
  },
})

/**
 * The size of all buttons in the group can be controlled using the `size` prop.
 */
export const Size = Example.extend({
  args: {
    children: 'Secondary',
    size: 'small',
  },
})

/**
 * Use `orientation` to control the direction buttons are laid out, and `align` to control
 * their alignment along the inline axis.
 */
export const Layout = Example.extend({
  args: {
    align: 'start',
    children: 'Primary action',
    orientation: 'vertical',
    size: 'medium',
  },
})
