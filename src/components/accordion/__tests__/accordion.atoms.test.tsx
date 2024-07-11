import { render } from '@testing-library/react'
import {
  AccordionContainer,
  AccordionItem,
  AccordionTitle,
  AccordionTitleContentWrapper,
  AccordionTitleContent,
  AccordionContent,
} from '../accordion.atoms'
import { Icon } from '../../icon'
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
              <Icon className={elMr1} icon="car" />2
            </AccordionTitleContent>
            <AccordionTitleContent>
              <Icon className={elMr1} icon="user" />5
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
              <Icon className={elMr1} icon="user" />5
            </AccordionTitleContent>
            <AccordionTitleContent>
              <Icon icon="chevronDown" />
            </AccordionTitleContent>
          </AccordionTitleContentWrapper>
        </AccordionItem>
        <AccordionContent>Accordion Content 2</AccordionContent>
      </AccordionContainer>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
