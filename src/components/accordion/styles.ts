import { styled } from '@linaria/react'
import { elIsActive } from '../../styles/states'

export const ElAccordionContainer = styled.div`
  background-color: var(--white);
  height: auto;
  display: flex;
  flex-direction: column;
`

export const ElAccordionItem = styled.a`
  color: inherit;
  font-size: inherit;
  font-weight: inherit;

  &:hover,
  &:link,
  &:active,
  &:focus {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--neutral-100);

  &:has(+ .${elIsActive}) {
    border-bottom: none;
  }
`
export const ElAccordionTitle = styled.div`
  color: var(--black);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
`

export const ElAccordionTitleContentWrapper = styled.div`
  display: flex;
`

export const ElAccordionTitleContent = styled.div`
  font-size: var(--font-size-smallest);
  display: flex;
  align-items: center;
  margin-right: 0.5rem;

  svg {
    font-size: 1rem;
    color: var(--neutral-300);
  }

  &:last-child {
    margin: 0 0.75rem;
  }
`

export const ElAccordionContent = styled.div`
  height: 0;
  overflow: hidden;
  font-size: var(--font-size-small);

  &.${elIsActive} {
    height: auto;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--neutral-100);
  }
`
