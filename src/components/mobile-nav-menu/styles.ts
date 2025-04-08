import { styled } from '@linaria/react'
import { isMobile } from '#src/styles/media'

export const ElMobileNavMenuHeader = styled.div`
  display: flex;
  padding: var(--spacing-2) var(--spacing-4);
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
  border-bottom: var(--border-width-default) solid var(--outline-default);
  background: var(--comp-navigation-colour-fill-top_bar);
`

export const ElMobileNavMenuContent = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  scrollbar-gutter: stable;
  overflow-y: auto;
  padding: var(--spacing-3) var(--spacing-none);
  background: var(--comp-navigation-colour-fill-mobile_nav-default);
`

export const ElMobileNavMenuItemGroup = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: var(--spacing-3);
  gap: var(--spacing-1);
`

export const ElMobileNavMenu = styled.dialog`
  // NOTE: overrides default browser styles for 'dialog'
  max-width: 100%;
  max-height: 100%;
  width: 375px;
  height: 100%;
  z-index: 99;
  display: none;
  border: none;
  padding: var(--spacing-none);
  animation: mobileNavMenuSlideRight 0.2s ease-out;

  ${isMobile} {
    width: 100%;
    margin: var(--spacing-none);
    scrollbar-gutter: unset;
    animation: mobileNavMenuFadeOut 0.2s ease-out;
  }

  &[open] {
    animation: mobileNavMenuSlideLeft 0.2s ease-out forwards;
    display: flex;
    flex-direction: column;

    ${isMobile} {
      animation: mobileNavMenuFadeIn 0.2s ease-out forwards;
    }

    &::backdrop {
      background-color: var(--black);
      opacity: 0.5;
      animation: backdropFadeIn 0.2s ease-out;
    }
  }

  ${ElMobileNavMenuItemGroup}:not(:first-child) {
    border-top: var(--border-width-default) solid var(--outline-default);
  }

  @keyframes mobileNavMenuFadeIn {
    from {
      opacity: 0;
      display: none;
    }
    to {
      opacity: 1;
      display: flex;
    }
  }

  @keyframes mobileNavMenuFadeOut {
    from {
      opacity: 1;
      display: flex;
    }
    to {
      opacity: 0;
      display: none;
    }
  }

  @keyframes mobileNavMenuSlideLeft {
    from {
      margin-right: -375px;
      display: none;
    }
    to {
      margin-right: 0px;
      display: flex;
    }
  }

  @keyframes mobileNavMenuSlideRight {
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
