import { ElNavSearch, ElNavSearchButtonContainer, ElNavSearchIconItemContainer } from './styles'
import { NavSearchButton } from '../nav-search-button'
import { NavSearchIconItem } from '../nav-search-icon-item'

import type { ComponentProps, ReactNode } from 'react'

interface NavSearchProps extends ComponentProps<typeof ElNavSearch> {
  /**
   * The button to display on tablet devices and wider. Will typically be a `TopBar.NavSearchButton`.
   */
  button?: ReactNode
  /**
   * The icon item to display on mobile devices. Will typically be a `TopBar.NavSearchIconItem`.
   */
  iconItem?: ReactNode
}

/**
 * A responsive component that displays the provided button when there is enough space to display it
 * (minimum of 150px), and the provided icon item when there isn't. Typically used with `TopBar.NavSearchButton`
 * and `TopBar.NavSearchIconItem`.
 */
export function NavSearch({ button, iconItem, ...rest }: NavSearchProps) {
  return (
    <ElNavSearch {...rest}>
      <ElNavSearchButtonContainer>{button}</ElNavSearchButtonContainer>
      <ElNavSearchIconItemContainer>{iconItem}</ElNavSearchIconItemContainer>
    </ElNavSearch>
  )
}

NavSearch.Button = NavSearchButton
NavSearch.IconItem = NavSearchIconItem
