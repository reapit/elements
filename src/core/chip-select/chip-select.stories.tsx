import { ChipSelect } from './chip-select'
import { StarIcon } from '#src/icons/star'
import { useId, useState } from 'react'

import type { ChangeEventHandler } from 'react'
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
 * Since chips are native checkbox elements (`<input type="checkbox">`), their checked state can be
 * controlled in the same manner as any other checkbox. However, when controlling the checked state of
 * an option, consumers become responsible for managing the single- or multi-select behaviour of the
 * `ChipSelect`.
 *
 * When using controlled form state management libraries like Formik, the multi-select behaviour will
 * often be handled out-of-the-box, as that's the default behaviour of standard checkbox groups. For
 * single-select behaviour, however, manual intervention will be required. To assist with this, the
 * `ChipSelect.determineNextControlledState` helper is provided.
 *
 * Whether single- or multi-select behaviour is desired, the controlled state must be an array of
 * string values. The example here demonstrates a controlled usage of the `ChipSelect` via simple
 * local component state (`useState`) and `ChipSelect.determineNextControlledState`. Examples that
 * demonstrate integration with [Formik](https://codesandbox.io/p/sandbox/eloquent-julien-hkgfgy)
 * and [React Hook Form](https://codesandbox.io/p/sandbox/strange-lederberg-thzzwv)
 * are also available.
 */
export const Controlled: Story = {
  args: {
    ...Example.args,
  },
  argTypes: { children: { control: false } },
  parameters: { docs: { source: { type: 'code' } } },
  render: () => {
    // Our controlled state. We start with the option whose value is "1" checked.
    const [state, setState] = useState(['1'])

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      // NOTE: we get a reference to the current target outside of our state setter function
      // because the state setter may be called after the synthetic event has been cleaned up
      // and it's reference to the current target lost.
      const option = event.currentTarget

      // `determineNextControlledState` does the heavy lifting for us, returning the appropriate
      // next state given the current state and the option whose checked state has changed.
      setState((state) => ChipSelect.determineNextControlledState(state, option))
    }

    // Since we're not using a form, we don't need to specify a name for each chip; rather,
    // we're directly controlling each chip's checked state.
    return (
      <ChipSelect size="small">
        <ChipSelect.Option checked={state.includes('1')} icon={<StarIcon />} onChange={onChange} value="1" />
        <ChipSelect.Option checked={state.includes('2')} icon={<StarIcon />} onChange={onChange} value="2" />
      </ChipSelect>
    )
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
