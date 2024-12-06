import { isMobile } from '#src/styles/media'
import { styled } from '@linaria/react'

export const ElMobileNavMenuHeader = styled.div`
  display: flex;
  padding: var(--spacing-spacing-2, 8px) var(--spacing-spacing-4, 16px);
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;

  border-bottom: var(--border-width-border-default, 1px) solid var(--outline-colour-outline-default, #e5e9ed);
  background: var(--fill-colour-fill-white, #fff);
`

export const ElMobileNavMenuItemGroup = styled.ul`
  padding: var(--spacing-spacing-3, 12px);
`

export const ElMobileNavMenu = styled.dialog`
  // NOTE: overrides default browser styles for 'dialog'
  max-width: 100%;
  max-height: 100%;

  width: 375px;
  height: 100%;
  scrollbar-gutter: stable;
  margin-right: 0px;
  padding: 0;
  z-index: 99;
  overflow: auto;
  border: none;
  animation: slideRight 0.2s ease-out;

  ${isMobile} {
    width: 100%;
    margin: 0;
    scrollbar-gutter: unset;
    animation: fadeOut 0.2s ease-out;
  }

  &[open] {
    animation: slideLeft 0.2s ease-out forwards;

    ${isMobile} {
      animation: fadeIn 0.2s ease-out forwards;
    }

    &::backdrop {
      background-color: var(--black);
      opacity: 0.5;
      animation: backdropFadeIn 0.2s ease-out;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      display: none;
    }
    to {
      opacity: 1;
      display: block;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      display: block;
    }
    to {
      opacity: 0;
      display: none;
    }
  }
  @keyframes slideLeft {
    from {
      margin-right: -375px;
      display: none;
    }

    to {
      margin-right: 0px;
      display: block;
    }
  }

  @keyframes slideRight {
    from {
      margin-right: 0px;
      display: block;
    }

    to {
      margin-right: -375px;
      display: none;
    }
  }

  @keyframes backdropFadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 0.5;
    }
  }

  ${ElMobileNavMenuItemGroup}:not(:first-child) {
    border-top: var(--border-width-border-default, 1px) solid var(--outline-colour-outline-default, #e5e9ed);
  }
`
