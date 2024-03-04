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
      <AccordionItem onClick={console.log} id="item-title-1" aria-controls="item-content-1">
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
      <AccordionContent
        id="item-content-1"
        role="region"
        aria-expanded="true"
        aria-labelledby="item-title-1"
        className={elIsActive}
      >
        Accordion Content 1
      </AccordionContent>
      <AccordionItem onClick={console.log} id="item-title-2" aria-controls="item-content-2">
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
      <AccordionContent id="item-content-2" role="region" aria-expanded="false" aria-labelledby="item-title-2">
        Accordion Content 2
      </AccordionContent>
      <AccordionItem onClick={console.log} id="item-title-3" aria-controls="item-content-3">
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
      <AccordionContent id="item-content-3" role="region" aria-expanded="false" aria-labelledby="item-title-3">
        Accordion Content 3
      </AccordionContent>
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
