import {
  DeprecatedAccordionContainer,
  DeprecatedAccordionItem,
  DeprecatedAccordionTitle,
  DeprecatedAccordionTitleContentWrapper,
  DeprecatedAccordionTitleContent,
  DeprecatedAccordionContent,
  DeprecatedAccordion,
} from './index'
import { DeprecatedIcon } from '../deprecated-icon'
import { elMr1 } from '../../styles/spacing'
import { elIsActive } from '../../styles/states'
import { Meta, StoryObj } from '@storybook/react-vite'
import { figmaDesignUrls } from '../../storybook/figma'

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
            <DeprecatedIcon className={elMr1} icon="car" />2
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <DeprecatedIcon className={elMr1} icon="bed" />5
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <DeprecatedIcon icon="chevronUp" />
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
            <DeprecatedIcon className={elMr1} icon="car" />2
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <DeprecatedIcon className={elMr1} icon="bed" />5
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <DeprecatedIcon icon="chevronDown" />
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
            <DeprecatedIcon className={elMr1} icon="car" />2
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <DeprecatedIcon className={elMr1} icon="bed" />5
          </DeprecatedAccordionTitleContent>
          <DeprecatedAccordionTitleContent>
            <DeprecatedIcon icon="chevronDown" />
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
  parameters: {
    design: {
      type: 'figma',
      url: figmaDesignUrls.accordion,
    },
  },
}

export const ReactUsage: StoryObj<typeof DeprecatedAccordion> = {
  args: {
    items: [
      {
        title: 'Accordion Item 1',
        content: 'Accordion Content 1',

        titleItems: [
          <>
            <DeprecatedIcon className={elMr1} icon="car" />2
          </>,
          <>
            <DeprecatedIcon className={elMr1} icon="bed" />5
          </>,
        ],
      },
      {
        title: 'Accordion Item 2',
        content: 'Accordion Content 2',

        titleItems: [
          <>
            <DeprecatedIcon className={elMr1} icon="car" />2
          </>,
          <>
            <DeprecatedIcon className={elMr1} icon="bed" />5
          </>,
        ],
      },
      {
        title: 'Accordion Item 3',
        content: 'Accordion Content 3',
        titleItems: [
          <>
            <DeprecatedIcon className={elMr1} icon="car" />2
          </>,
          <>
            <DeprecatedIcon className={elMr1} icon="bed" />5
          </>,
        ],
      },
    ],
  },
  parameters: {
    design: {
      type: 'figma',
      url: figmaDesignUrls.accordion,
      allowFullscreen: true,
    },
  },
}
