import { cx } from '@linaria/core'
import { Dispatch, FC, Fragment, HTMLAttributes, ReactNode, SetStateAction, useState, MouseEvent } from 'react'
import { useNavState } from '../use-nav-state'
import { useMediaQuery } from '../use-media-query'
import { DeprecatedIcon } from '../icon'
import { DeprecatedNav, DeprecatedNavItem, DeprecatedNavSubNav, DeprecatedNavSubNavItem } from './nav'
import {
  ElDeprecatedNavBg,
  ElDeprecatedNavControlsBg,
  ElDeprecatedNavMenu,
  ElDeprecatedNavMenuOption,
  ElDeprecatedNavMenuOptionDivider,
  ElNavResponsiveAppSwitcherIconWrap,
  ElNavResponsiveAppSwitcherWrap,
  ElDeprecatedNavResponsiveAvatarWrap,
  elAppSwitcherOpen,
  elDeprecatedNavIsHidden,
  elDeprecatedNavItemActive,
  elDeprecatedNavItemExpanded,
  elDeprecatedNavItemHideDesktop,
  elDeprecatedNavSubItemActive,
  elDeprecatedNavSubItemExpanded,
} from './__styles__'
import { elMlAuto, elMr2, elMr4 } from '../../styles/deprecated-spacing'
import { generateRandomId } from '../../storybook/random-id'
import { DeprecatedAvatar } from '../avatar'
import { Text2XS } from '../typography'
import { elIsActive } from '../../styles/deprecated-states'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'

export type DeprecatedNavResponsiveItemType = 'ICON' | 'ITEM' | 'SECONDARY'

export interface DeprecatedNavResponsiveOption {
  itemIndex: number
  callback?: () => void
  text?: string
  href?: string
  subItems?: DeprecatedNavResponsiveOption[]
}

export interface DeprecatedNavResponsiveAvatarOption {
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

/** @deprecated will be replaced by new v5 Navigation components props */
export interface DeprecatedNavResponsiveProps extends HTMLAttributes<HTMLDivElement> {
  options: DeprecatedNavResponsiveOption[]
  appSwitcherOptions?: NavResponsiveAppSwitcherOption[]
  brandOptions?: BrandOptions
  avatarOptions?: DeprecatedNavResponsiveAvatarOption[]
  avatarText?: string
  defaultNavIndex?: number
  defaultNavSubIndex?: number
}

/** @deprecated will be replaced by new v5 Navigation components props */
export interface DeprecatedNavResponsiveAvatarProps {
  options: DeprecatedNavResponsiveAvatarOption[]
  text: string
  isHidden: boolean
}

export interface NavResponsiveAppSwitcherProps {
  options: NavResponsiveAppSwitcherOption[]
  className?: string // Note: probably only required for new AppBar
}

export type DeprecatedLogoIcon = 'reapitLogoSelectedMenu' | 'reapitLogoMenu'

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

/** @deprecated will be replaced by new v5 Navigation components */
export const DeprecatedNavResponsiveAvatar: FC<DeprecatedNavResponsiveAvatarProps> = ({ options, isHidden, text }) => {
  const [avatarOpen, setAvatarOpen] = useState<boolean>(false)

  return (
    <>
      <ElDeprecatedNavControlsBg
        className={cx(avatarOpen && elIsActive)}
        onClick={clickNavEventHandler(setAvatarOpen)}
        onKeyDown={handleKeyboardEvent('Enter', clickNavEventHandler(setAvatarOpen))}
      />
      <ElDeprecatedNavResponsiveAvatarWrap
        onClick={handleToggleMenu(setAvatarOpen)}
        onKeyDown={handleKeyboardEvent('Enter', handleToggleMenu(setAvatarOpen))}
        className={cx(isHidden && elDeprecatedNavIsHidden)}
        role="button"
        tabIndex={0}
      >
        <DeprecatedAvatar className={cx(elMr2)} type="profile">
          {text}
        </DeprecatedAvatar>
        {Boolean(options.length) && (
          <>
            <DeprecatedIcon intent="default" icon={avatarOpen ? 'chevronUp' : 'chevronDown'} />
            {avatarOpen && (
              <ElDeprecatedNavMenu>
                {options.map(({ callback, text }, index) => (
                  <Fragment key={index}>
                    {Boolean(index) && index === options.length - 1 && <ElDeprecatedNavMenuOptionDivider />}
                    <ElDeprecatedNavMenuOption
                      onClick={handleToggleMenu(setAvatarOpen, callback)}
                      onKeyDown={handleKeyboardEvent('Enter', handleToggleMenu(setAvatarOpen, callback))}
                      role="button"
                      tabIndex={0}
                    >
                      {text}
                    </ElDeprecatedNavMenuOption>
                  </Fragment>
                ))}
              </ElDeprecatedNavMenu>
            )}
          </>
        )}
      </ElDeprecatedNavResponsiveAvatarWrap>
    </>
  )
}

export const NavResponsiveAppSwitcher: FC<NavResponsiveAppSwitcherProps> = ({ options, className }) => {
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
      <ElDeprecatedNavControlsBg
        className={cx(appSwitcherOpen && elIsActive)}
        onClick={clickNavEventHandler(setAppSwitcherOpen)}
        onKeyDown={handleKeyboardEvent('Enter', clickNavEventHandler(setAppSwitcherOpen))}
      />
      <ElNavResponsiveAppSwitcherWrap
        onClick={handleToggleMenu(setAppSwitcherOpen)}
        onKeyDown={handleKeyboardEvent('Enter', handleToggleMenu(setAppSwitcherOpen))}
        role="button"
        tabIndex={0}
        className={className}
      >
        <ElNavResponsiveAppSwitcherIconWrap className={cx(appSwitcherOpen && elAppSwitcherOpen)}>
          <DeprecatedIcon intent="default" icon="appSwitcher" />
        </ElNavResponsiveAppSwitcherIconWrap>
        {appSwitcherOpen && (
          <ElDeprecatedNavMenu>
            <ElDeprecatedNavMenuOption>
              <Text2XS hasUpperCasedText hasDisabledText hasBoldText>
                Your Apps
              </Text2XS>
            </ElDeprecatedNavMenuOption>
            {options.map(({ callback, text, iconUrl }, index) => (
              <ElDeprecatedNavMenuOption
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
              </ElDeprecatedNavMenuOption>
            ))}
            <ElDeprecatedNavMenuOptionDivider />
            <ElDeprecatedNavMenuOption
              onClick={handleToggleMenu(setAppSwitcherOpen, marketplaceCallback)}
              onKeyDown={handleKeyboardEvent('Enter', handleToggleMenu(setAppSwitcherOpen, marketplaceCallback))}
              role="button"
              tabIndex={0}
            >
              My Installed Apps
            </ElDeprecatedNavMenuOption>
          </ElDeprecatedNavMenu>
        )}
      </ElNavResponsiveAppSwitcherWrap>
    </>
  )
}

/** @deprecated will be replaced by new v5 Navigation components */
export const DeprecatedNavResponsive: FC<DeprecatedNavResponsiveProps> = ({
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
      <ElDeprecatedNavBg
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
      <DeprecatedNav className={cx(className)} {...rest}>
        {options.map(({ href, callback, text, subItems, itemIndex }: DeprecatedNavResponsiveOption, index: number) => {
          const hasSubItems = subItems && subItems.length > 0

          if (!index) {
            return (
              <DeprecatedNavItem
                className={cx(navItemIndex === itemIndex && elDeprecatedNavItemActive)}
                key={itemIndex}
                href={href}
              >
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
                  <DeprecatedIcon
                    onClick={brandOptions?.callback}
                    onKeyDown={handleKeyboardEvent('Enter', brandOptions?.callback as () => void)}
                    style={{ maxHeight: 'var(--nav-brand-height)' }}
                    width="100px"
                    icon="reapitLogo"
                    role="button"
                    tabIndex={0}
                  />
                )}
                <DeprecatedIcon
                  className={cx(elMlAuto, elMr4, elDeprecatedNavItemHideDesktop)}
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
                  <DeprecatedNavResponsiveAvatar isHidden={!isMobile} options={avatarOptions ?? []} text={avatarText} />
                )}
              </DeprecatedNavItem>
            )
          }

          return (
            <Fragment key={itemIndex}>
              <DeprecatedNavItem
                className={cx(
                  navItemIndex === itemIndex && elDeprecatedNavItemActive,
                  navMenuOpen && elDeprecatedNavItemExpanded,
                )}
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
                  <DeprecatedIcon
                    className={elMlAuto}
                    intent="default"
                    icon={navMenuOpen && navItemIndex === itemIndex ? 'chevronUp' : 'chevronDown'}
                  />
                )}
              </DeprecatedNavItem>
              {hasSubItems && (
                <DeprecatedNavSubNav key={generateRandomId()}>
                  {subItems.map(
                    ({
                      callback: innerCallback,
                      text: innerText,
                      href: innerHref,
                      itemIndex: innerItemIndex,
                    }: DeprecatedNavResponsiveOption) => {
                      return (
                        <DeprecatedNavSubNavItem
                          className={cx(
                            navSubItemIndex === innerItemIndex && elDeprecatedNavSubItemActive,
                            navMenuOpen && navItemIndex === itemIndex && elDeprecatedNavSubItemExpanded,
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
                        </DeprecatedNavSubNavItem>
                      )
                    },
                  )}
                </DeprecatedNavSubNav>
              )}
            </Fragment>
          )
        })}
        {(avatarOptions || avatarText) && (
          <DeprecatedNavResponsiveAvatar isHidden={isMobile} options={avatarOptions ?? []} text={avatarText} />
        )}
      </DeprecatedNav>
    </>
  )
}
