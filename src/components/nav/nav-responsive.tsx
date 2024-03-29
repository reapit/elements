import { cx } from '@linaria/core'
import { Dispatch, FC, Fragment, HTMLAttributes, ReactNode, SetStateAction, useState, MouseEvent } from 'react'
import { useNavState } from '../../hooks/use-nav-state'
import { useMediaQuery } from '../../hooks/use-media-query'
import { Icon, IconNames } from '../icon'
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
import { deprecateFunction, deprecateVar } from '../../storybook/deprecate-var'
import { Avatar } from '../avatar'
import { Text2XS } from '../typography'
import { elIsActive } from '../../styles/states'

export type NavResponsiveItemType = 'ICON' | 'ITEM' | 'SECONDARY'

export interface NavResponsiveOption {
  itemIndex: number
  callback?: () => void
  text?: string
  href?: string
  subItems?: NavResponsiveOption[]
  /** @deprecated - to be removed in v5 */
  isSecondary?: boolean
  /** @deprecated - to be removed in v5 */
  icon?: ReactNode
  /** @deprecated to be removed in v5 */
  iconId?: IconNames
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
  /** @deprecated */
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

export const handleToggleLogo = (logoState: LogoIcon, setLogoState: Dispatch<SetStateAction<LogoIcon>>) => () => {
  /** @deprecated - to be removed in v5 */
  deprecateFunction('handleToggleLogo')
  const newState = logoState === 'reapitLogoSelectedMenu' ? 'reapitLogoMenu' : 'reapitLogoSelectedMenu'
  setLogoState(newState)
}

export const handleToggleMenu =
  (setState: Dispatch<SetStateAction<boolean>>, callback?: () => void) => (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setState((state) => !state)
    if (callback) {
      callback()
    }
  }

export const clickNavEventHandler =
  (setActive: Dispatch<SetStateAction<boolean>>) => (event: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    event?.preventDefault()
    event?.stopPropagation()

    setActive((active) => !active)
  }

export const NavResponsiveAvatar: FC<NavResponsiveAvatarProps> = ({ options, isHidden, text }) => {
  const [avatarOpen, setAvatarOpen] = useState<boolean>(false)

  return (
    <>
      <ElNavControlsBg className={cx(avatarOpen && elIsActive)} onClick={clickNavEventHandler(setAvatarOpen)} />
      <ElNavResponsiveAvatarWrap onClick={handleToggleMenu(setAvatarOpen)} className={cx(isHidden && elNavIsHidden)}>
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
                    <ElNavMenuOption onClick={handleToggleMenu(setAvatarOpen, callback)}>{text}</ElNavMenuOption>
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
      />
      <ElNavResponsiveAppSwitcherWrap onClick={handleToggleMenu(setAppSwitcherOpen)}>
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
              <ElNavMenuOption onClick={handleToggleMenu(setAppSwitcherOpen, callback)} key={index}>
                {iconUrl && typeof iconUrl === 'string' ? <img src={iconUrl} /> : iconUrl}
                {text}
              </ElNavMenuOption>
            ))}
            <ElNavMenuOptionDivider />
            <ElNavMenuOption onClick={handleToggleMenu(setAppSwitcherOpen, marketplaceCallback)}>
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
      />
      <Nav className={cx(className)} {...rest}>
        {options.map(
          (
            { href, callback, text, subItems, itemIndex, isSecondary, icon, iconId }: NavResponsiveOption,
            index: number,
          ) => {
            const hasSubItems = subItems && subItems.length > 0

            deprecateVar({ isSecondary, icon, iconId }, 'NavResponsive')

            if (!index) {
              return (
                <NavItem className={cx(navItemIndex === itemIndex && elNavItemActive)} key={itemIndex} href={href}>
                  {appSwitcherOptions && <NavResponsiveAppSwitcher options={appSwitcherOptions} />}
                  {brandOptions?.logoUrl ? (
                    <img src={brandOptions.logoUrl} height="24px" onClick={brandOptions?.callback} />
                  ) : (
                    <Icon onClick={brandOptions?.callback} height="24px" width="100px" icon="reapitLogo" />
                  )}
                  <Icon
                    className={cx(elMlAuto, elMr4, elNavItemHideDesktop)}
                    icon="more"
                    intent={navMenuOpen ? 'primary' : 'default'}
                    onClick={setNavState({
                      navMenuOpen: !navMenuOpen,
                    })}
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
                  onClick={
                    hasSubItems
                      ? setNavState({
                          navItemIndex: itemIndex,
                          navSubItemIndex: navItemIndex === itemIndex && navSubItemIndex ? navSubItemIndex : 0,
                          callback,
                        })
                      : setNavState({ navItemIndex: itemIndex, callback, navMenuOpen: !navMenuOpen })
                  }
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
          },
        )}
        {(avatarOptions || avatarText) && (
          <NavResponsiveAvatar isHidden={isMobile} options={avatarOptions ?? []} text={avatarText} />
        )}
      </Nav>
    </>
  )
}
