import {
  DeprecatedAccordionContainer,
  DeprecatedAccordionItem,
  DeprecatedAccordionTitle,
  DeprecatedAccordionTitleContentWrapper,
  DeprecatedAccordionTitleContent,
  DeprecatedAccordionContent,
  DeprecatedAccordion,
} from './index'
import { elMr1 } from '../../styles/deprecated-spacing'
import { elIsActive } from '../../styles/deprecated-states'
import { Meta, StoryObj } from '@storybook/react-vite'
import { CarIcon } from '#src/icons/car'
import { BedIcon } from '#src/icons/bed'
import { ChevronUpIcon } from '#src/icons/chevron-up'
import { ChevronDownIcon } from '#src/icons/chevron-down'

const meta: Meta<typeof DeprecatedAccordion> = {
  title: 'Deprecated/DeprecatedAccordion',
  component: DeprecatedAccordion,
}

export default meta

export const StylesOnlyUsage = {
  render: ({}) => (
    <DeprecatedAccordionContainer>
      <DeprecatedAccordionItem onClick={console.log} id="item-title-1" aria-controls="item-content-1">
        <DeprecatedAccordionTitle>Accordion Item 1</DeprecatedAccordionTitle>
        <DeprecatedAccordionTitleContentWrapper>
          <DeprecatedAccordionTitleContent>
            <CarIcon className={elMr1} />2
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <BedIcon className={elMr1} />5
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <ChevronUpIcon />
          </DeprecatedAccordionTitleContent>
        </DeprecatedAccordionTitleContentWrapper>
      </DeprecatedAccordionItem>
      <DeprecatedAccordionContent
        id="item-content-1"
        role="region"
        aria-expanded="true"
        aria-labelledby="item-title-1"
        className={elIsActive}
      >
        Accordion Content 1
      </DeprecatedAccordionContent>
      <DeprecatedAccordionItem onClick={console.log} id="item-title-2" aria-controls="item-content-2">
        <DeprecatedAccordionTitle>Accordion Item 2</DeprecatedAccordionTitle>
        <DeprecatedAccordionTitleContentWrapper>
          <DeprecatedAccordionTitleContent>
            <CarIcon className={elMr1} />2
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <BedIcon className={elMr1} />5
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <ChevronDownIcon />
          </DeprecatedAccordionTitleContent>
        </DeprecatedAccordionTitleContentWrapper>
      </DeprecatedAccordionItem>
      <DeprecatedAccordionContent
        id="item-content-2"
        role="region"
        aria-expanded="false"
        aria-labelledby="item-title-2"
      >
        Accordion Content 2
      </DeprecatedAccordionContent>
      <DeprecatedAccordionItem onClick={console.log} id="item-title-3" aria-controls="item-content-3">
        <DeprecatedAccordionTitle>Accordion Item 3</DeprecatedAccordionTitle>
        <DeprecatedAccordionTitleContentWrapper>
          <DeprecatedAccordionTitleContent>
            <CarIcon className={elMr1} />2
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <BedIcon className={elMr1} />5
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <ChevronDownIcon />
          </DeprecatedAccordionTitleContent>
        </DeprecatedAccordionTitleContentWrapper>
      </DeprecatedAccordionItem>
      <DeprecatedAccordionContent
        id="item-content-3"
        role="region"
        aria-expanded="false"
        aria-labelledby="item-title-3"
      >
        Accordion Content 3
      </DeprecatedAccordionContent>
    </DeprecatedAccordionContainer>
  ),
}

export const ReactUsage: StoryObj<typeof DeprecatedAccordion> = {
  args: {
    items: [
      {
        title: 'Accordion Item 1',
        content: 'Accordion Content 1',

        titleItems: [
          <>
            <CarIcon className={elMr1} />2
          </>,
          <>
            <BedIcon className={elMr1} />5
          </>,
        ],
      },
      {
        title: 'Accordion Item 2',
        content: 'Accordion Content 2',

        titleItems: [
          <>
            <CarIcon className={elMr1} />2
          </>,
          <>
            <BedIcon className={elMr1} />5
          </>,
        ],
      },
      {
        title: 'Accordion Item 3',
        content: 'Accordion Content 3',
        titleItems: [
          <>
            <CarIcon className={elMr1} />2
          </>,
          <>
            <BedIcon className={elMr1} />5
          </>,
        ],
      },
    ],
  },
}
