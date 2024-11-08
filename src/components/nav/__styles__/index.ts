import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElAvatar } from '../../avatar'
import { elIsActive } from '../../../styles/states'

export const ElNavBg = styled.div`
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

export const ElNavControlsBg = styled.div`
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

export const ElNavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  height: auto;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 3;
  height: auto;
  flex: 0 0 auto;
  overflow: visible;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    height: 3.5rem;
    flex: 0 0 3.5rem;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-bottom: 1px solid var(--neutral-100);
  }
`

export const ElNavSubContainer = styled.div`
  background-color: var(--nav-menu-background-accent);
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const elNavItemSecondary = css``

export const ElNavItem = styled.a`
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
  color: var(--neutral-400);
  display: flex;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  opacity: 0;
  cursor: pointer;
  height: 3.5rem;
  align-items: center;
  opacity: 1;
  flex: 1 0 100%;
  width: 100%;
  border-left: 3px solid var(--white);

  &:hover {
    color: var(--neutral-500);
    background-color: var(--neutral-050);
  }

  &:hover:not(:first-child) {
    border-left: 3px solid var(--purple-300);
  }

  &:first-child {
    opacity: 1;
    padding: 0;
    background-color: var(--white);
    margin-right: auto;
    width: 100%;
    padding: 0rem 1.25rem;
    /* border-bottom: 1px solid var(--neutral-100); */
    border-bottom: 1px solid red;
  }

  &:not(:first-child) {
    height: 0;
    overflow: hidden;
  }

  @media screen and (min-width: 768px) {
    height: 3.5rem;
    flex: 0 0 auto;
    justify-content: center;
    font-size: var(--font-size-default);
    padding: 0 0.75rem;
    width: auto;
    border-left: none;

    &:not(:first-child) {
      overflow: visible;
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      height: 2rem;
      border-top: none;
      margin-right: 1rem;
    }

    &:hover:not(:first-child) {
      background-color: var(--neutral-050);
      border-left: none;
    }

    &:first-child {
      width: auto;
      border-bottom: none;
      height: auto;
    }

    &:last-of-type {
      margin-right: auto;
    }
  }
`

export const elNavItemActive = css`
  &:not(:first-child) {
    background-color: var(--purple-050);
    border-left: 3px solid var(--purple-500);
    color: var(--purple-500);
  }

  @media screen and (min-width: 768px) {
    &:not(:first-child) {
      --nav-menu-icon-primary-accent: var(--purple-500);
      --nav-menu-icon-secondary-accent: var(--purple-300);
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      background-color: var(--neutral-050);
      border-left: none;
      height: 2rem;
    }
  }
`

export const elNavItemExpanded = css`
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

export const elNavItemIcon = css`
  @media screen and (max-width: 767px) {
    margin-left: 0.75rem;
  }
`

export const ElNavSubItem = styled.a`
  height: 0;
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-small);
  color: var(--neutral-400);
  opacity: 0;
  display: flex;
  text-align: flex-start;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s linear;
  border-left: 3px solid var(--white);

  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const elNavSubItemExpanded = css`
  @media screen and (max-width: 767px) {
    height: auto;
    width: 100%;
    display: block;
    opacity: 1;
    padding: 0.625rem 1.5rem;
    margin-left: 1rem;

    &:hover {
      color: var(--purple-300);
    }
  }
`

export const elNavSubItemActive = css`
  color: var(--purple-500);
  margin-left: 1rem;
`

export const elNavItemHideDesktop = css`
  @media screen and (min-width: 768px) {
    height: 0;
    width: 0;
    visibility: hidden;
    padding: 0 !important;
    margin: 0 !important;
  }
`

export const elNavIsHidden = css`
  display: none;
`

export const ElNavMenu = styled.div`
  position: absolute;
  top: 44px;
  right: 0;
  background-color: var(--white);
  color: var(--black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  box-shadow: 0px 4px 16px 0px rgba(34, 43, 51, 0.16);
  border-radius: 4px;
  padding: 0.5rem 0;
`

export const ElNavMenuOption = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 0.875rem 1rem;
  font-weight: var(--font-weight-default);
  width: 100%;
  height: 36px;

  &:hover {
    color: var(--intent-primary);
  }

  svg,
  img {
    height: 1.5rem !important;
    width: 1.5rem !important;
    margin-right: 0.5rem;
  }
`

export const ElNavMenuOptionDivider = styled.div`
  height: 0;
  width: 100%;
  border-bottom: 1px solid var(--neutral-100);
  margin: 0.5rem 0;
`

export const ElNavResponsiveAvatarWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: var(--font-size-smallest);
  font-weight: var(--font-weight-bold);
  color: var(--intent-primary);
  margin-right: 0.25rem;
  cursor: pointer;

  ${ElAvatar} {
    height: 2rem;
    width: 2rem;
    background-color: var(--intent-primary-lightest);
  }

  &:hover {
    ${ElAvatar} {
      background-color: var(--purple-100);
    }
  }

  @media screen and (min-width: 768px) {
    margin-right: 1.25rem;
  }

  &.${elNavIsHidden} {
    display: none;
  }
`

export const elAppSwitcherOpen = css``

export const ElNavResponsiveAppSwitcherWrap = styled.div`
  position: relative;
  display: flex;
  font-size: var(--font-size-smallest);
  cursor: pointer;

  svg {
    height: 2rem;
    width: 2rem;
  }

  ${ElNavMenu} {
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
    background-color: var(--intent-primary-lightest);
    rect {
      fill: var(--intent-primary-lightest);
    }
  }
`
