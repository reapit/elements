import { Accordion } from '../index'
import { Icon } from '../../icon'
import { elMr1 } from '../../../styles/spacing'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Accordion> = {
  title: 'Composed Components/Accordion',
  component: Accordion,
}

export default meta

export const BasicUsage: StoryObj<typeof Accordion> = {
  args: {
    items: [
      {
        title: 'Accordion Item 1',
        content: 'Accordion Content 1',

        titleItems: [
          <>
            <Icon className={elMr1} icon="car" />2
          </>,
          <>
            <Icon className={elMr1} icon="bed" />5
          </>,
        ],
      },
      {
        title: 'Accordion Item 2',
        content: 'Accordion Content 2',

        titleItems: [
          <>
            <Icon className={elMr1} icon="car" />2
          </>,
          <>
            <Icon className={elMr1} icon="bed" />5
          </>,
        ],
      },
      {
        title: 'Accordion Item 3',
        content: 'Accordion Content 3',
        titleItems: [
          <>
            <Icon className={elMr1} icon="car" />2
          </>,
          <>
            <Icon className={elMr1} icon="bed" />5
          </>,
        ],
      },
    ],
  },
}
