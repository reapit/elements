import { render } from '@testing-library/react'
import {
  DeprecatedAccordionContainer,
  DeprecatedAccordionItem,
  DeprecatedAccordionTitle,
  DeprecatedAccordionTitleContentWrapper,
  DeprecatedAccordionTitleContent,
  DeprecatedAccordionContent,
} from '../accordion.atoms'
import { CarIcon } from '#src/icons/car'
import { UserIcon } from '#src/icons/user'
import { ChevronUpIcon } from '#src/icons/chevron-up'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { elMr1 } from '../../../styles/deprecated-spacing'
import { elIsActive } from '../../../styles/deprecated-states'

describe('Accordion basic usage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <DeprecatedAccordionContainer>
        <DeprecatedAccordionItem onClick={console.log}>
          <DeprecatedAccordionTitle>Accordion Item 1</DeprecatedAccordionTitle>
          <DeprecatedAccordionTitleContentWrapper>
            <DeprecatedAccordionTitleContent>
              <CarIcon className={elMr1} />2
            </DeprecatedAccordionTitleContent>
            <DeprecatedAccordionTitleContent>
              <UserIcon className={elMr1} />5
            </DeprecatedAccordionTitleContent>
            <DeprecatedAccordionTitleContent>
              <ChevronUpIcon />
            </DeprecatedAccordionTitleContent>
          </DeprecatedAccordionTitleContentWrapper>
        </DeprecatedAccordionItem>
        <DeprecatedAccordionContent className={elIsActive}>Accordion Content 1</DeprecatedAccordionContent>
        <DeprecatedAccordionItem onClick={console.log}>
          <DeprecatedAccordionTitle>Accordion Item 2</DeprecatedAccordionTitle>
          <DeprecatedAccordionTitleContentWrapper>
            <DeprecatedAccordionTitleContent>
              <CarIcon className={elMr1} />2
            </DeprecatedAccordionTitleContent>
            <DeprecatedAccordionTitleContent>
              <UserIcon className={elMr1} />5
            </DeprecatedAccordionTitleContent>
            <DeprecatedAccordionTitleContent>
              <ChevronDownIcon />
            </DeprecatedAccordionTitleContent>
          </DeprecatedAccordionTitleContentWrapper>
        </DeprecatedAccordionItem>
        <DeprecatedAccordionContent>Accordion Content 2</DeprecatedAccordionContent>
      </DeprecatedAccordionContainer>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
