import { render } from '@testing-library/react'
import {
  AccordionContainer,
  AccordionItem,
  AccordionTitle,
  AccordionTitleContentWrapper,
  AccordionTitleContent,
  AccordionContent,
} from '../accordion.atoms'
import { DeprecatedIcon } from '../../deprecated-icon'
import { elMr1 } from '../../../styles/spacing'
import { elIsActive } from '../../../styles/states'

describe('Accordion basic usage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <AccordionContainer>
        <AccordionItem onClick={console.log}>
          <AccordionTitle>Accordion Item 1</AccordionTitle>
          <AccordionTitleContentWrapper>
            <AccordionTitleContent>
              <DeprecatedIcon className={elMr1} icon="car" />2
            </AccordionTitleContent>
            <AccordionTitleContent>
              <DeprecatedIcon className={elMr1} icon="user" />5
            </AccordionTitleContent>
            <AccordionTitleContent>
              <DeprecatedIcon icon="chevronUp" />
            </AccordionTitleContent>
          </AccordionTitleContentWrapper>
        </AccordionItem>
        <AccordionContent className={elIsActive}>Accordion Content 1</AccordionContent>
        <AccordionItem onClick={console.log}>
          <AccordionTitle>Accordion Item 2</AccordionTitle>
          <AccordionTitleContentWrapper>
            <AccordionTitleContent>
              <DeprecatedIcon className={elMr1} icon="car" />2
            </AccordionTitleContent>
            <AccordionTitleContent>
              <DeprecatedIcon className={elMr1} icon="user" />5
            </AccordionTitleContent>
            <AccordionTitleContent>
              <DeprecatedIcon icon="chevronDown" />
            </AccordionTitleContent>
          </AccordionTitleContentWrapper>
        </AccordionItem>
        <AccordionContent>Accordion Content 2</AccordionContent>
      </AccordionContainer>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
