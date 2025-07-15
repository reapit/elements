import { styled } from '@linaria/react'
import { elIsActive } from '../../styles/deprecated-states'

/** @deprecated */
export const ElDeprecatedAccordionContainer = styled.div`
  background-color: var(--white);
  height: auto;
  display: flex;
  flex-direction: column;
`

/** @deprecated */
export const ElDeprecatedAccordionItem = styled.a`
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
/** @deprecated */
export const ElDeprecatedAccordionTitle = styled.div`
  color: var(--black);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
`

/** @deprecated */
export const ElDeprecatedAccordionTitleContentWrapper = styled.div`
  display: flex;
`

/** @deprecated */
export const ElDeprecatedAccordionTitleContent = styled.div`
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

/** @deprecated */
export const ElDeprecatedAccordionContent = styled.div`
  height: 0;
  overflow: hidden;
  font-size: var(--font-size-small);

  &.${elIsActive} {
    height: auto;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--neutral-100);
  }
`
