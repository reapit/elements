import { cx } from '@linaria/core'
import { Dispatch, FC, Fragment, HTMLAttributes, ReactNode, SetStateAction, useState, MouseEvent } from 'react'
import { useNavState } from '../../hooks/use-nav-state'
import { useMediaQuery } from '../../hooks/use-media-query'
import { Icon } from '../icon'
import { Nav, NavItem, NavSubNav, NavSubNavItem } from './nav'
import {
  ElNavBg,
  ElNavControlsBg,
  ElNavMenu,
  ElNavMenuOption,
  ElNavMenuOptionDivider,
  ElNavResponsiveAppSwitcherIconWrap,
  ElNavResponsiveAppSwitcherWrap,
  ElNavResponsiveAvatarWrap,
  elAppSwitcherOpen,
  elNavIsHidden,
  elNavItemActive,
  elNavItemExpanded,
  elNavItemHideDesktop,
  elNavSubItemActive,
  elNavSubItemExpanded,
} from './__styles__'
import { elMlAuto, elMr2, elMr4 } from '../../styles/spacing'
import { generateRandomId } from '../../storybook/random-id'
import { Avatar } from '../avatar'
import { Text2XS } from '../typography'
import { elIsActive } from '../../styles/states'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'

export type NavResponsiveItemType = 'ICON' | 'ITEM' | 'SECONDARY'

export interface NavResponsiveOption {
  itemIndex: number
  callback?: () => void
  text?: string
  href?: string
  subItems?: NavResponsiveOption[]
}

export interface NavResponsiveAvatarOption {
  text?: string
  callback?: () => void
}

export interface NavResponsiveAppSwitcherOption {
  text?: string
  callback?: () => void
  iconUrl?: ReactNode
}

export interface BrandOptions {
  callback?: () => void
  logoUrl?: string
}

export interface NavResponsiveProps extends HTMLAttributes<HTMLDivElement> {
  options: NavResponsiveOption[]
  appSwitcherOptions?: NavResponsiveAppSwitcherOption[]
  brandOptions?: BrandOptions
  avatarOptions?: NavResponsiveAvatarOption[]
  avatarText?: string
  defaultNavIndex?: number
  defaultNavSubIndex?: number
}

export interface NavResponsiveAvatarProps {
  options: NavResponsiveAvatarOption[]
  text: string
  isHidden: boolean
}

export interface NavResponsiveAppSwitcherProps {
  options: NavResponsiveAppSwitcherOption[]
}

export type LogoIcon = 'reapitLogoSelectedMenu' | 'reapitLogoMenu'

export const handleToggleMenu =
  (setState: Dispatch<SetStateAction<boolean>>, callback?: () => void) => (event?: MouseEvent<HTMLDivElement>) => {
    event?.preventDefault()
    event?.stopPropagation()
    setState((state) => !state)
    if (callback) {
      callback()
    }
  }

export const clickNavEventHandler =
  (setActive: Dispatch<SetStateAction<boolean>>) => (event?: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    event?.preventDefault()
    event?.stopPropagation()

    setActive((active) => !active)
  }

export const NavResponsiveAvatar: FC<NavResponsiveAvatarProps> = ({ options, isHidden, text }) => {
  const [avatarOpen, setAvatarOpen] = useState<boolean>(false)

  return (
    <>
      <ElNavControlsBg
        className={cx(avatarOpen && elIsActive)}
        onClick={clickNavEventHandler(setAvatarOpen)}
        onKeyDown={handleKeyboardEvent('Enter', clickNavEventHandler(setAvatarOpen))}
      />
      <ElNavResponsiveAvatarWrap
        onClick={handleToggleMenu(setAvatarOpen)}
        onKeyDown={handleKeyboardEvent('Enter', handleToggleMenu(setAvatarOpen))}
        className={cx(isHidden && elNavIsHidden)}
        role="button"
        tabIndex={0}
      >
        <Avatar className={cx(elMr2)} type="profile">
          {text}
        </Avatar>
        {Boolean(options.length) && (
          <>
            <Icon intent="default" icon={avatarOpen ? 'chevronUp' : 'chevronDown'} />
            {avatarOpen && (
              <ElNavMenu>
                {options.map(({ callback, text }, index) => (
                  <Fragment key={index}>
                    {Boolean(index) && index === options.length - 1 && <ElNavMenuOptionDivider />}
                    <ElNavMenuOption
                      onClick={handleToggleMenu(setAvatarOpen, callback)}
                      onKeyDown={handleKeyboardEvent('Enter', handleToggleMenu(setAvatarOpen, callback))}
                      role="button"
                      tabIndex={0}
                    >
                      {text}
                    </ElNavMenuOption>
                  </Fragment>
                ))}
              </ElNavMenu>
            )}
          </>
        )}
      </ElNavResponsiveAvatarWrap>
    </>
  )
}

export const NavResponsiveAppSwitcher: FC<NavResponsiveAppSwitcherProps> = ({ options }) => {
  const [appSwitcherOpen, setAppSwitcherOpen] = useState<boolean>(false)

  const marketplaceCallback = () => {
    if (window.location.href.includes('.dev.') || window.location.href.includes('localhost')) {
      window.location.href = 'https://marketplace.dev.paas.reapit.cloud/installed'
    } else {
      window.location.href = 'https://marketplace.reapit.cloud/installed'
    }
  }

  return (
    <>
      <ElNavControlsBg
        className={cx(appSwitcherOpen && elIsActive)}
        onClick={clickNavEventHandler(setAppSwitcherOpen)}
        onKeyDown={handleKeyboardEvent('Enter', clickNavEventHandler(setAppSwitcherOpen))}
      />
      <ElNavResponsiveAppSwitcherWrap
        onClick={handleToggleMenu(setAppSwitcherOpen)}
        onKeyDown={handleKeyboardEvent('Enter', handleToggleMenu(setAppSwitcherOpen))}
        role="button"
        tabIndex={0}
      >
        <ElNavResponsiveAppSwitcherIconWrap className={cx(appSwitcherOpen && elAppSwitcherOpen)}>
          <Icon intent="default" icon="appLauncher" />
        </ElNavResponsiveAppSwitcherIconWrap>
        {appSwitcherOpen && (
          <ElNavMenu>
            <ElNavMenuOption>
              <Text2XS hasUpperCasedText hasDisabledText hasBoldText>
                Your Apps
              </Text2XS>
            </ElNavMenuOption>
            {options.map(({ callback, text, iconUrl }, index) => (
              <ElNavMenuOption
                onClick={handleToggleMenu(setAppSwitcherOpen, callback)}
                onKeyDown={handleKeyboardEvent('Enter', handleToggleMenu(setAppSwitcherOpen, callback))}
                key={index}
                role="button"
                tabIndex={0}
              >
                {iconUrl && typeof iconUrl === 'string' ? (
                  <img src={iconUrl} alt={`Product icon with url ${iconUrl}`} />
                ) : (
                  iconUrl
                )}
                {text}
              </ElNavMenuOption>
            ))}
            <ElNavMenuOptionDivider />
            <ElNavMenuOption
              onClick={handleToggleMenu(setAppSwitcherOpen, marketplaceCallback)}
              onKeyDown={handleKeyboardEvent('Enter', handleToggleMenu(setAppSwitcherOpen, marketplaceCallback))}
              role="button"
              tabIndex={0}
            >
              My Installed Apps
            </ElNavMenuOption>
          </ElNavMenu>
        )}
      </ElNavResponsiveAppSwitcherWrap>
    </>
  )
}

export const NavResponsive: FC<NavResponsiveProps> = ({
  options,
  className,
  defaultNavIndex,
  defaultNavSubIndex,
  appSwitcherOptions,
  avatarOptions,
  brandOptions,
  avatarText = '',
  ...rest
}) => {
  const { navState, setNavState } = useNavState(defaultNavIndex, defaultNavSubIndex)

  const { isMobile } = useMediaQuery()
  const { navItemIndex, navSubItemIndex, navMenuOpen } = navState

  return (
    <>
      <ElNavBg
        className={cx(isMobile && navMenuOpen && elIsActive)}
        onClick={setNavState({
          navMenuOpen: !navMenuOpen,
        })}
        onKeyDown={handleKeyboardEvent(
          'Enter',
          setNavState({
            navMenuOpen: !navMenuOpen,
          }),
        )}
      />
      <Nav className={cx(className)} {...rest}>
        {options.map(({ href, callback, text, subItems, itemIndex }: NavResponsiveOption, index: number) => {
          const hasSubItems = subItems && subItems.length > 0

          if (!index) {
            return (
              <NavItem className={cx(navItemIndex === itemIndex && elNavItemActive)} key={itemIndex} href={href}>
                {appSwitcherOptions && <NavResponsiveAppSwitcher options={appSwitcherOptions} />}
                {brandOptions?.logoUrl ? (
                  <img
                    src={brandOptions.logoUrl}
                    alt={`Brand icon with url ${brandOptions.logoUrl}`}
                    style={{ maxHeight: 'var(--nav-brand-height)' }}
                    onClick={brandOptions?.callback}
                    onKeyDown={handleKeyboardEvent('Enter', brandOptions?.callback as () => void)}
                    role="button"
                    tabIndex={0}
                  />
                ) : (
                  <Icon
                    onClick={brandOptions?.callback}
                    onKeyDown={handleKeyboardEvent('Enter', brandOptions?.callback as () => void)}
                    style={{ maxHeight: 'var(--nav-brand-height)' }}
                    width="100px"
                    icon="reapitLogo"
                    role="button"
                    tabIndex={0}
                  />
                )}
                <Icon
                  className={cx(elMlAuto, elMr4, elNavItemHideDesktop)}
                  icon="more"
                  intent={navMenuOpen ? 'primary' : 'default'}
                  onClick={setNavState({
                    navMenuOpen: !navMenuOpen,
                  })}
                  onKeyDown={handleKeyboardEvent(
                    'Enter',
                    setNavState({
                      navMenuOpen: !navMenuOpen,
                    }),
                  )}
                  role="button"
                  tabIndex={0}
                />
                {(avatarOptions || avatarText) && (
                  <NavResponsiveAvatar isHidden={!isMobile} options={avatarOptions ?? []} text={avatarText} />
                )}
              </NavItem>
            )
          }

          return (
            <Fragment key={itemIndex}>
              <NavItem
                className={cx(navItemIndex === itemIndex && elNavItemActive, navMenuOpen && elNavItemExpanded)}
                href={href}
                role="button"
                tabIndex={0}
                onClick={
                  hasSubItems
                    ? setNavState({
                        navItemIndex: itemIndex,
                        navSubItemIndex: navItemIndex === itemIndex && navSubItemIndex ? navSubItemIndex : 0,
                        callback,
                      })
                    : setNavState({ navItemIndex: itemIndex, callback, navMenuOpen: !navMenuOpen })
                }
                onKeyDown={handleKeyboardEvent(
                  'Enter',
                  hasSubItems
                    ? setNavState({
                        navItemIndex: itemIndex,
                        navSubItemIndex: navItemIndex === itemIndex && navSubItemIndex ? navSubItemIndex : 0,
                        callback,
                      })
                    : setNavState({ navItemIndex: itemIndex, callback, navMenuOpen: !navMenuOpen }),
                )}
              >
                {text}
                {hasSubItems && isMobile && (
                  <Icon
                    className={elMlAuto}
                    intent="default"
                    icon={navMenuOpen && navItemIndex === itemIndex ? 'chevronUp' : 'chevronDown'}
                  />
                )}
              </NavItem>
              {hasSubItems && (
                <NavSubNav key={generateRandomId()}>
                  {subItems.map(
                    ({
                      callback: innerCallback,
                      text: innerText,
                      href: innerHref,
                      itemIndex: innerItemIndex,
                    }: NavResponsiveOption) => {
                      return (
                        <NavSubNavItem
                          className={cx(
                            navSubItemIndex === innerItemIndex && elNavSubItemActive,
                            navMenuOpen && navItemIndex === itemIndex && elNavSubItemExpanded,
                          )}
                          href={innerHref}
                          key={innerItemIndex}
                          onClick={setNavState({
                            navSubItemIndex: innerItemIndex,
                            callback: innerCallback,
                            navMenuOpen: !navMenuOpen,
                          })}
                          onKeyDown={handleKeyboardEvent(
                            'Enter',
                            setNavState({
                              navSubItemIndex: innerItemIndex,
                              callback: innerCallback,
                              navMenuOpen: !navMenuOpen,
                            }),
                          )}
                        >
                          <span>{innerText}</span>
                        </NavSubNavItem>
                      )
                    },
                  )}
                </NavSubNav>
              )}
            </Fragment>
          )
        })}
        {(avatarOptions || avatarText) && (
          <NavResponsiveAvatar isHidden={isMobile} options={avatarOptions ?? []} text={avatarText} />
        )}
      </Nav>
    </>
  )
}
