import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElDeprecatedAvatar } from '../../avatar'
import { elIsActive } from '../../../styles/deprecated-states'

/** @deprecated */
export const ElDeprecatedNavBg = styled.div`
  display: none;
  z-index: 2;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--neutral-500);
  opacity: 0.2;

  &.${elIsActive} {
    display: block;
    position: fixed;
  }
`

/** @deprecated */
export const ElDeprecatedNavControlsBg = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &.${elIsActive} {
    display: block;
    position: fixed;
  }
`

/** @deprecated */
export const ElDeprecatedNavContainer = styled.nav`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--colour-fill-white);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 3;
  height: auto;
  flex: 0 0 auto;
  overflow: visible;

  @media screen and (min-width: 768px) {
    height: 3.5rem;
    flex: 0 0 3.5rem;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-bottom: 1px solid var(--neutral-100);
  }
`

/** @deprecated */
export const ElDeprecatedNavSubContainer = styled.div`
  background-color: #ffffff /* was --nav-menu-background-accent */;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`

/** @deprecated */
export const elDeprecatedNavItemSecondary = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`

/** @deprecated */
export const ElDeprecatedNavItem = styled.a`
  font-family:
    'Inter',
    Helvetica,
    Arial,
    sans-serif /* was --font-sans-serif */;
  font-size: 0.875rem /* was --font-size-small */;
  font-weight: 500 /* was --font-weight-medium */;
  color: var(--neutral-400);
  display: flex;
  text-align: center;
  justify-content: flex-start;
  cursor: pointer;
  height: 3.5rem;
  align-items: center;
  opacity: 1;
  flex: 1 0 100%;
  width: 100%;
  border-left: 3px solid var(--colour-fill-white);
  text-decoration: none;

  &:hover {
    color: var(--neutral-500);
    background-color: var(--neutral-050);
  }

  &:first-child {
    opacity: 1;
    background-color: var(--colour-fill-white);
    margin-right: auto;
    width: 100%;
    padding: 0 1.25rem;
    border-bottom: 1px solid var(--neutral-100);
  }

  &:not(:first-child) {
    height: 0;
    overflow: hidden;
  }

  &:hover:not(:first-child) {
    border-left: 3px solid var(--colour-fill-action-light);
  }

  @media screen and (min-width: 768px) {
    height: 3.5rem;
    flex: 0 0 auto;
    justify-content: center;
    font-size: 0.9375rem /* was --font-size-default */;
    padding: 0 0.75rem;
    width: auto;
    border-left: none;

    &:first-child {
      width: auto;
      border-bottom: none;
      height: auto;
    }

    &:not(:first-child) {
      overflow: visible;
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      height: 2rem;
      border-top: none;
      margin-right: 1rem;
    }

    &:last-of-type {
      margin-right: auto;
    }

    &:hover:not(:first-child) {
      background-color: var(--neutral-050);
      border-left: none;
    }
  }
`

/** @deprecated */
export const elDeprecatedNavItemActive = css`
  &:not(:first-child) {
    background-color: var(--colour-fill-action-lightest);
    border-left: 3px solid var(--colour-fill-action-dark);
    color: var(--colour-text-action);
  }

  @media screen and (min-width: 768px) {
    &:not(:first-child) {
      --nav-menu-icon-primary-accent: var(--colour-fill-action-dark);
      --nav-menu-icon-secondary-accent: var(--colour-fill-action-light);
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      background-color: var(--neutral-050);
      border-left: none;
      height: 2rem;
    }
  }
`

/** @deprecated */
export const elDeprecatedNavItemExpanded = css`
  &:not(:first-child) {
    height: 2rem;
  }

  @media screen and (max-width: 767px) {
    opacity: 1;
    padding: 0.625rem 1.5rem;
    overflow: visible;
    height: auto;

    &:last-child {
      border-bottom: 1px solid var(--neutral-100);
    }
  }
`

/** @deprecated */
export const elDeprecatedNavItemIcon = css`
  @media screen and (max-width: 767px) {
    margin-left: 0.75rem;
  }
`

/** @deprecated */
export const ElDeprecatedNavSubItem = styled.a`
  height: 0;
  font-family:
    'Inter',
    Helvetica,
    Arial,
    sans-serif /* was --font-sans-serif */;
  font-size: 0.875rem /* was --font-size-small */;
  color: var(--neutral-400);
  opacity: 0;
  display: flex;
  text-align: flex-start;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s linear;
  border-left: 3px solid var(--colour-fill-white);

  @media screen and (min-width: 768px) {
    display: none;
  }
`

/** @deprecated */
export const elDeprecatedNavSubItemExpanded = css`
  @media screen and (max-width: 767px) {
    height: auto;
    width: 100%;
    display: block;
    opacity: 1;
    padding: 0.625rem 1.5rem;
    margin-left: 1rem;

    &:hover {
      color: var(--colour-text-action);
    }
  }
`

/** @deprecated */
export const elDeprecatedNavSubItemActive = css`
  color: var(--colour-text-action);
  margin-left: 1rem;
`

/** @deprecated */
export const elDeprecatedNavItemHideDesktop = css`
  @media screen and (min-width: 768px) {
    height: 0;
    width: 0;
    visibility: hidden;
    padding: 0 !important;
    margin: 0 !important;
  }
`

/** @deprecated */
export const elDeprecatedNavIsHidden = css`
  display: none;
`

/** @deprecated */
export const ElDeprecatedNavMenu = styled.div`
  position: absolute;
  top: 44px;
  right: 0;
  background-color: var(--colour-fill-white);
  color: var(--colour-text-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  box-shadow: 0 4px 16px 0 rgb(34 43 51 / 0.16);
  border-radius: 4px;
  padding: 0.5rem 0;
`

/** @deprecated */
export const ElDeprecatedNavMenuOption = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 0.875rem 1rem;
  font-weight: 400 /* was --font-weight-default */;
  width: 100%;
  height: 36px;

  &:hover {
    color: var(--colour-text-action);
  }

  svg,
  img {
    height: 1.5rem !important;
    width: 1.5rem !important;
    margin-right: 0.5rem;
  }
`

/** @deprecated */
export const ElDeprecatedNavMenuOptionDivider = styled.div`
  height: 0;
  width: 100%;
  border-bottom: 1px solid var(--neutral-100);
  margin: 0.5rem 0;
`

/** @deprecated */
export const ElDeprecatedNavResponsiveAvatarWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 0.8125rem /* was --font-size-smallest */;
  font-weight: 600 /* was --font-weight-bold */;
  color: var(--colour-text-action);
  margin-right: 0.25rem;
  cursor: pointer;

  ${ElDeprecatedAvatar} {
    height: 2rem;
    width: 2rem;
    background-color: var(--colour-fill-action-lightest);
  }

  &:hover {
    ${ElDeprecatedAvatar} {
      background-color: var(--colour-fill-action-lightest);
    }
  }

  @media screen and (min-width: 768px) {
    margin-right: 1.25rem;
  }

  &.${elDeprecatedNavIsHidden} {
    display: none;
  }
`

export const elAppSwitcherOpen = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`

export const ElNavResponsiveAppSwitcherWrap = styled.div`
  position: relative;
  display: flex;
  font-size: 0.8125rem /* was --font-size-smallest */;
  cursor: pointer;

  ${ElDeprecatedNavMenu} {
    left: 0;
    top: 46px;
  }
`

export const ElNavResponsiveAppSwitcherIconWrap = styled.div`
  height: 2.25rem;
  width: 2.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  margin-right: 0.5rem;

  &.${elAppSwitcherOpen} {
    background-color: var(--colour-fill-action-lightest);
    rect {
      fill: var(--colour-fill-action-lightest);
    }
  }
`

export const elNewTopBarAppSwitcher = css`
  ${ElNavResponsiveAppSwitcherIconWrap} {
    margin-right: 0;
    padding: var(--spacing-half);
    box-sizing: content-box;
  }
`
