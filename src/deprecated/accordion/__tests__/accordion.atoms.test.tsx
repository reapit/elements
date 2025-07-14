import { render } from '@testing-library/react'
import {
  DeprecatedAccordionContainer,
  DeprecatedAccordionItem,
  DeprecatedAccordionTitle,
  DeprecatedAccordionTitleContentWrapper,
  DeprecatedAccordionTitleContent,
  DeprecatedAccordionContent,
} from '../accordion.atoms'
import { DeprecatedIcon } from '../../icon'
import { elMr1 } from '../../../styles/spacing'
import { elIsActive } from '../../../styles/states'

describe('Accordion basic usage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <DeprecatedAccordionContainer>
        <DeprecatedAccordionItem onClick={console.log}>
          <DeprecatedAccordionTitle>Accordion Item 1</DeprecatedAccordionTitle>
          <DeprecatedAccordionTitleContentWrapper>
            <DeprecatedAccordionTitleContent>
              <DeprecatedIcon className={elMr1} icon="car" />2
            </DeprecatedAccordionTitleContent>
            <DeprecatedAccordionTitleContent>
              <DeprecatedIcon className={elMr1} icon="user" />5
            </DeprecatedAccordionTitleContent>
            <DeprecatedAccordionTitleContent>
              <DeprecatedIcon icon="chevronUp" />
            </DeprecatedAccordionTitleContent>
          </DeprecatedAccordionTitleContentWrapper>
        </DeprecatedAccordionItem>
        <DeprecatedAccordionContent className={elIsActive}>Accordion Content 1</DeprecatedAccordionContent>
        <DeprecatedAccordionItem onClick={console.log}>
          <DeprecatedAccordionTitle>Accordion Item 2</DeprecatedAccordionTitle>
          <DeprecatedAccordionTitleContentWrapper>
            <DeprecatedAccordionTitleContent>
              <DeprecatedIcon className={elMr1} icon="car" />2
            </DeprecatedAccordionTitleContent>
            <DeprecatedAccordionTitleContent>
              <DeprecatedIcon className={elMr1} icon="user" />5
            </DeprecatedAccordionTitleContent>
            <DeprecatedAccordionTitleContent>
              <DeprecatedIcon icon="chevronDown" />
            </DeprecatedAccordionTitleContent>
          </DeprecatedAccordionTitleContentWrapper>
        </DeprecatedAccordionItem>
        <DeprecatedAccordionContent>Accordion Content 2</DeprecatedAccordionContent>
      </DeprecatedAccordionContainer>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
