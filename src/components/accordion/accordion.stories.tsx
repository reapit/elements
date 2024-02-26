import {
  AccordionContainer,
  AccordionItem,
  AccordionTitle,
  AccordionTitleContentWrapper,
  AccordionTitleContent,
  AccordionContent,
  Accordion,
} from './index'
import { Icon } from '../icon'
import { elMr1 } from '../../styles/spacing'
import { elIsActive } from '../../styles/states'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Accordion> = {
  title: 'Accordion',
  component: Accordion,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
    <AccordionContainer>
      <AccordionItem onClick={console.log}>
        <AccordionTitle>Accordion Item 1</AccordionTitle>
        <AccordionTitleContentWrapper>
          <AccordionTitleContent>
            <Icon className={elMr1} icon="car" />2
          </AccordionTitleContent>
          <AccordionTitleContent>
            <Icon className={elMr1} icon="bed" />5
          </AccordionTitleContent>
          <AccordionTitleContent>
            <Icon icon="chevronUp" />
          </AccordionTitleContent>
        </AccordionTitleContentWrapper>
      </AccordionItem>
      <AccordionContent className={elIsActive}>Accordion Content 1</AccordionContent>
      <AccordionItem onClick={console.log}>
        <AccordionTitle>Accordion Item 2</AccordionTitle>
        <AccordionTitleContentWrapper>
          <AccordionTitleContent>
            <Icon className={elMr1} icon="car" />2
          </AccordionTitleContent>
          <AccordionTitleContent>
            <Icon className={elMr1} icon="bed" />5
          </AccordionTitleContent>
          <AccordionTitleContent>
            <Icon icon="chevronDown" />
          </AccordionTitleContent>
        </AccordionTitleContentWrapper>
      </AccordionItem>
      <AccordionContent>Accordion Content 2</AccordionContent>
      <AccordionItem onClick={console.log}>
        <AccordionTitle>Accordion Item 3</AccordionTitle>
        <AccordionTitleContentWrapper>
          <AccordionTitleContent>
            <Icon className={elMr1} icon="car" />2
          </AccordionTitleContent>
          <AccordionTitleContent>
            <Icon className={elMr1} icon="bed" />5
          </AccordionTitleContent>
          <AccordionTitleContent>
            <Icon icon="chevronDown" />
          </AccordionTitleContent>
        </AccordionTitleContentWrapper>
      </AccordionItem>
      <AccordionContent>Accordion Content 3</AccordionContent>
    </AccordionContainer>
  ),
}

export const ReactUsage: StoryObj<typeof Accordion> = {
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
