import { styled } from '@linaria/react'
import { isMobile } from '#src/styles/media'

export const ElTopBarMenuHeader = styled.div`
  display: flex;
  padding: var(--spacing-2) var(--spacing-4);
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
  border-bottom: var(--border-width-default) solid var(--outline-default);
  background: var(--comp-navigation-colour-fill-top_bar);
`

export const ElTopBarMenuBody = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  scrollbar-gutter: stable;
  overflow-y: auto;
  padding: var(--spacing-3) var(--spacing-none);
  background: var(--comp-navigation-colour-fill-mobile_nav-default);
`

export const ElTopBarMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: var(--spacing-3);
  gap: var(--spacing-1);
`

export const ElTopBarMenu = styled.dialog`
  // NOTE: overrides default browser styles for 'dialog'
  max-width: 100%;
  max-height: 100%;
  width: 375px;
  height: 100%;
  z-index: 99;
  display: none;
  border: none;
  padding: var(--spacing-none);
  animation: topBarMenuSlideRight 0.2s ease-out;
  ${isMobile} {
    width: 100%;
    margin: var(--spacing-none);
    scrollbar-gutter: unset;
    animation: topBarMenuFadeOut 0.2s ease-out;
  }
  &[open] {
    animation: topBarMenuSlideLeft 0.2s ease-out forwards;
    display: flex;
    flex-direction: column;
    ${isMobile} {
      animation: topBarMenuFadeIn 0.2s ease-out forwards;
    }
    &::backdrop {
      background-color: var(--black);
      opacity: 0.5;
      animation: backdropFadeIn 0.2s ease-out;
    }
  }
  ${ElTopBarMenuList}:not(:first-child) {
    border-top: var(--border-width-default) solid var(--outline-default);
  }
  @keyframes topBarMenuFadeIn {
    from {
      opacity: 0;
      display: none;
    }
    to {
      opacity: 1;
      display: flex;
    }
  }
  @keyframes topBarMenuFadeOut {
    from {
      opacity: 1;
      display: flex;
    }
    to {
      opacity: 0;
      display: none;
    }
  }
  @keyframes topBarMenuSlideLeft {
    from {
      margin-right: -375px;
      display: none;
    }
    to {
      margin-right: 0px;
      display: flex;
    }
  }
  @keyframes topBarMenuSlideRight {
    from {
      margin-right: 0px;
      display: flex;
    }
    to {
      margin-right: -375px;
      display: none;
    }
  }
  @keyframes backdropFadeIn {
    from {
      background-color: var(--black);
      opacity: 0;
    }
    to {
      background-color: var(--black);
      opacity: 0.5;
    }
  }
`
