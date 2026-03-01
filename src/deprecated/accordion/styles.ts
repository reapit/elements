import { styled } from '@linaria/react'
import { elIsActive } from '../../styles/deprecated-states'

/** @deprecated */
export const ElDeprecatedAccordionContainer = styled.div`
  background-color: var(--colour-fill-white);
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
  border-bottom: 1px solid var(--colour-border-neutral-light_default);

  &:has(+ .${elIsActive}) {
    border-bottom: none;
  }
`
/** @deprecated */
export const ElDeprecatedAccordionTitle = styled.div`
  color: var(--colour-text-primary);
  font-size: 0.875rem /* was --font-size-small */;
  font-weight: 500 /* was --font-weight-medium */;
`

/** @deprecated */
export const ElDeprecatedAccordionTitleContentWrapper = styled.div`
  display: flex;
`

/** @deprecated */
export const ElDeprecatedAccordionTitleContent = styled.div`
  font-size: 0.8125rem /* was --font-size-smallest */;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;

  svg {
    font-size: 1rem;
    color: var(--colour-icon-primary);
  }

  &:last-child {
    margin: 0 0.75rem;
  }
`

/** @deprecated */
export const ElDeprecatedAccordionContent = styled.div`
  height: 0;
  overflow: hidden;
  font-size: 0.875rem /* was --font-size-small */;

  &.${elIsActive} {
    height: auto;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--colour-border-neutral-light_default);
  }
`
