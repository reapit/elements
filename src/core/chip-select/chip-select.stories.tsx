import { ChipSelect } from './chip-select'
import { StarIcon } from '#src/icons/star'
import { useId } from 'react'

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/ChipSelect',
  component: ChipSelect,
  argTypes: {
    children: {
      control: false,
    },
    overflow: {
      control: 'radio',
    },
  },
  render: (args) => {
    const formId = args.form ? `${args.form}-${useId()}` : useId()
    return (
      <>
        <form id={formId} />
        <ChipSelect {...args} form={formId} />
      </>
    )
  },
} satisfies Meta<typeof ChipSelect>

export default meta
type Story = StoryObj<typeof meta>

const useNarrowParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ border: '1px solid #FA00FF', width: '397px' }}>
      <Story />
    </div>
  )
}

/**
 * By default, a chip select will only permit a single selection to be made. When a chip selects'
 * options are (1) all associated with a form (either because they are a descendant or because they have
 * a valid `form` attribute); (2) all share the same `name` attribute; (3) all have a unique `value`;
 * and, (4) are all uncontrolled, this single-select behaviour will function automatically.
 *
 * In cases where the checked state of the chip select's options must be controlled, such as being used
 * as filters for a list or when integrated with controlled form state management libraries like Formik,
 * this single-select behaviour must be facilitated by the consumer.
 */
export const Example: Story = {
  args: {
    children: [
      <ChipSelect.Option key="1" icon={<StarIcon />} value="1">
        Apples
      </ChipSelect.Option>,
      <ChipSelect.Option key="2" defaultChecked icon={<StarIcon />} value="2">
        Bananas
      </ChipSelect.Option>,
      <ChipSelect.Option key="3" icon={<StarIcon />} value="3">
        Oranges
      </ChipSelect.Option>,
      <ChipSelect.Option key="4" icon={<StarIcon />} value="4">
        Peanuts
      </ChipSelect.Option>,
      <ChipSelect.Option key="5" icon={<StarIcon />} value="5">
        Strawberries
      </ChipSelect.Option>,
      <ChipSelect.Option key="6" icon={<StarIcon />} value="6">
        Watermelons
      </ChipSelect.Option>,
    ],
    flow: 'wrap',
    form: 'my-form',
    multiple: false,
    name: 'foo',
    overflow: 'visible',
    size: 'small',
  },
}

/**
 * Multi-select behaviour (like a standard checkbox group) can be enabled using `multiple`. This
 * behaviour will typically work out-of-the-box with any form state management library, whether it takes
 * a controlled (e.g. Formik) or uncontrolled (e.g. React Hook Form) approach.
 */
export const MultiSelect: Story = {
  name: 'Multi-select',
  args: {
    ...Example.args,
    multiple: true,
  },
}

/**
 * By default, chips will wrap to other lines if there is insufficient space.
 */
export const Wrapping: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useNarrowParentDecorator],
}

/**
 * The default wrapping behaviour can be overridden using `flow="nowrap"`. This can be useful at
 * small breakpoints where the chip group should not occupy too much vertical space.
 */
export const NoWrapping: Story = {
  args: {
    ...Example.args,
    flow: 'nowrap',
  },
  decorators: [useNarrowParentDecorator],
}

/**
 * When wrapping is disabled, it will often be useful to allow the chip group to scroll horizontally.
 */
export const Overflow: Story = {
  args: {
    ...NoWrapping.args,
    overflow: 'auto',
  },
  decorators: [useNarrowParentDecorator],
}

/**
 * Whether wrapping or scrolling is used, chips will size themselves appropriately based on the
 * length of their label.
 */
export const ChipSizing: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    ...Example.args,
    children: [
      <ChipSelect.Option key="1" icon={<StarIcon />} value="1">
        Chip 1
      </ChipSelect.Option>,
      <ChipSelect.Option key="2" icon={<StarIcon />} value="2">
        Chip 2
      </ChipSelect.Option>,
      <ChipSelect.Option key="3" icon={<StarIcon />} value="3">
        Chip 3
      </ChipSelect.Option>,
      <ChipSelect.Option key="4" icon={<StarIcon />} value="4">
        Chip 4
      </ChipSelect.Option>,
      <ChipSelect.Option key="5" icon={<StarIcon />} value="5">
        Truncation can be applied to ensure a long chip label does not wrap to a second line
      </ChipSelect.Option>,
      <ChipSelect.Option key="6" icon={<StarIcon />} value="6">
        Chip 5
      </ChipSelect.Option>,
      <ChipSelect.Option key="7" icon={<StarIcon />} value="7">
        Chip 6
      </ChipSelect.Option>,
      <ChipSelect.Option key="8" icon={<StarIcon />} value="8">
        Or, you can avoid truncation and allow a long chip label to wrap to multiple lines
      </ChipSelect.Option>,
      <ChipSelect.Option key="9" icon={<StarIcon />} value="9">
        Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu, NZ
      </ChipSelect.Option>,
    ],
    flow: 'wrap',
  },
  decorators: [useNarrowParentDecorator],
}
