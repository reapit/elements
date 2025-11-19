import { AtAGlance } from './at-a-glance'
import { buildCards } from './__story__/build-cards'
import { SettingsAltIcon } from '#src/icons/settings-alt'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'

const meta = {
  title: 'Core/AtAGlance',
  component: AtAGlance,
  argTypes: {
    children: {
      control: 'select',
      options: ['Carousel', 'Grid', 'Links', 'Listbox with Carousel', 'Listbox with Grid'],
      mapping: {
        Carousel: <AtAGlance.Carousel columns="200px">{buildCards({ variant: 'simple' })}</AtAGlance.Carousel>,
        Header: (
          <>
            <AtAGlance.Header
              accessory={
                <Button
                  aria-label="View settings"
                  hasNoPadding
                  iconLeft={<SettingsAltIcon />}
                  size="large"
                  variant="tertiary"
                />
              }
            >
              Available fruit
            </AtAGlance.Header>
            <AtAGlance.Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))">
              {buildCards({ count: 4, variant: 'simple' })}
            </AtAGlance.Grid>
          </>
        ),
        Grid: (
          <AtAGlance.Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))">
            {buildCards({ variant: 'simple' })}
          </AtAGlance.Grid>
        ),
        Links: <AtAGlance.Carousel columns="200px">{buildCards({ variant: 'with-link' })}</AtAGlance.Carousel>,
        'Listbox with Carousel': (
          <AtAGlance.Listbox as={AtAGlance.Carousel} columns="200px">
            {buildCards({ layout: 'compact', variant: 'selectable' })}
          </AtAGlance.Listbox>
        ),
        'Listbox with Grid': (
          <AtAGlance.Listbox as={AtAGlance.Grid} templateColumns="1fr 1fr 1fr 1fr">
            {buildCards({ layout: 'horizontal', variant: 'selectable' })}
          </AtAGlance.Listbox>
        ),
      },
    },
  },
} satisfies Meta<typeof AtAGlance>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Grid layout displays cards in a responsive grid pattern.
 * Use this when you want cards to wrap and fill available space.
 */
export const Example: Story = {
  args: {
    children: 'Grid',
  },
}

/**
 * A header can be included to title the at-a-glance section and provide an accessory action.
 */
export const Header: Story = {
  args: {
    children: 'Header',
  },
}

/**
 * Carousel layout displays cards in a horizontal scrolling container with navigation buttons.
 * Use this when you have many cards and want to save vertical space.
 */
export const Carousel: Story = {
  args: {
    children: 'Carousel',
  },
}

/**
 * Linked cards allow users to navigate to other pages when clicked. They can also be used to update
 * URL search params. If the card represents the current URL, it can be marked as selected using
 * `aria-current="page"`.
 */
export const Links: Story = {
  args: {
    children: 'Links',
  },
}

/**
 * Selectable cards allow users to select options. Only single-selection is currently supported.
 * Cards can be deselected by clicking on them again. `AtAGlance.Listbox` is polymorphic
 * and can be used with either `AtAGlance.Grid` or `AtAGlance.Carousel` via its `as` prop.
 *
 * ```tsx
 * <AtAGlance.Listbox as={AtAGlance.Carousel} columns="200px">
 *   <AtAGlance.ListboxOption displayValue="32" label="Apple" value="apple" />
 *   <AtAGlance.ListboxOption displayValue="25" label="Banana" value="banana" />
 *   ...
 * </AtAGlance.Listbox>
 * ```
 */
export const Selectable: Story = {
  args: {
    children: 'Listbox with Carousel',
  },
}
