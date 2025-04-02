import { TableText } from './table-text'
import { Icon, IconNames } from '../../icon'

import type { Meta, StoryObj } from '@storybook/react'

const ICON_OPTIONS: IconNames[] = ['star', 'add', 'chevronDown', 'chevronLeft', 'chevronRight']

const meta = {
  title: 'Components/TableText',
  component: TableText,
  argTypes: {
    children: {
      control: 'text',
      description: 'Defines the text for the Table Text component.',
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'info',
        'success',
        'pending',
        'warning',
        'error',
        'accent_1',
        'accent_2',
        'action',
      ],
      description: 'Defines the Table Text style variant.',
    },
    size: {
      control: 'select',
      options: ['small', 'extra-small'],
      description: 'Defines the Table Text size.',
    },
    iconLeft: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'The icon displayed on the left side of the badge.',
      mapping: ICON_OPTIONS.reduce((acc, iconName) => {
        acc[iconName] = <Icon icon={iconName} fontSize="1rem" />
        return acc
      }, {}),
    },
    iconRight: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'The icon displayed on the right side of the badge.',
      mapping: ICON_OPTIONS.reduce((acc, iconName) => {
        acc[iconName] = <Icon icon={iconName} fontSize="1rem" />
        return acc
      }, {}),
    },
  },
} satisfies Meta<typeof TableText>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The table text component is designed to be used with in the table component.
 * It can have different color varients and can be of only two sizes 'small' or 'extra-small'
 */
export const BasicUsage: Story = {
  args: {
    children: 'Value',
  },
}

/**
 * The table text component can be of only two sizes 'small' or 'extra-small'. Default varient will be 'secondary'
 */
export const TableTextSize: Story = {
  args: {
    ...BasicUsage.args,
    size: 'extra-small',
  },
}

/**
 * The table text component can have different color varients 'primary', 'secondary',
 * 'info', 'success', 'pending', 'warning', 'error', 'accent_1', 'accent_2', 'action',
 */
export const TableTextVarients: Story = {
  args: {
    ...BasicUsage.args,
  },
  // Adding decorator into the story to display multiple stories.
  decorators: [
    (Story: any) => (
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (props: any) => (
    <>
      <TableText {...props}>{props.children}</TableText>
      <TableText {...props} variant={props.variant ? props.variant : 'secondary'}>
        {props.children}
      </TableText>
      <TableText {...props} variant={props.variant ? props.variant : 'info'}>
        {props.children}
      </TableText>
      <TableText {...props} variant={props.variant ? props.variant : 'success'}>
        {props.children}
      </TableText>
      <TableText {...props} variant={props.variant ? props.variant : 'pending'}>
        {props.children}
      </TableText>
      <TableText {...props} variant={props.variant ? props.variant : 'error'}>
        {props.children}
      </TableText>
      <TableText {...props} variant={props.variant ? props.variant : 'accent_1'}>
        {props.children}
      </TableText>
      <TableText {...props} variant={props.variant ? props.variant : 'accent_2'}>
        {props.children}
      </TableText>
      <TableText {...props} variant={props.variant ? props.variant : 'action'}>
        {props.children}
      </TableText>
      <TableText {...props} variant={props.variant ? props.variant : 'primary'}>
        {props.children}
      </TableText>
    </>
  ),
  // Adding the parameters to display only one varient code in the source
  parameters: {
    docs: {
      source: {
        code: `
  <TableText variant='success'>
  Value
</TableText>
          `,
      },
    },
  },
}

/**
 * The table text component can icon on the left or right or just icon only.
 */
export const TableTextWithIcon: Story = {
  args: {
    ...BasicUsage.args,
    iconLeft: 'star',
    iconRight: 'star',
  },
}
