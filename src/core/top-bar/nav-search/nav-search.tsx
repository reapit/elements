import { ElTopBarNavSearch, ElTopBarNavSearchButtonContainer, ElTopBarNavSearchIconItemContainer } from './styles'
import { TopBarNavSearchButton } from '../nav-search-button'
import { TopBarNavSearchIconItem } from '../nav-search-icon-item'

import type { ComponentProps, ReactNode } from 'react'

export namespace TopBarNavSearch {
  export interface Props extends ComponentProps<typeof ElTopBarNavSearch> {
    /**
     * The button to display on tablet devices and wider. Will typically be a `TopBar.NavSearchButton`.
     */
    button?: ReactNode
    /**
     * The icon item to display on mobile devices. Will typically be a `TopBar.NavSearchIconItem`.
     */
    iconItem?: ReactNode
  }
}

/**
 * A responsive component that displays the provided button when there is enough space to display it
 * (minimum of 150px), and the provided icon item when there isn't. Typically used with `TopBar.NavSearchButton`
 * and `TopBar.NavSearchIconItem`.
 */
export function TopBarNavSearch({ button, iconItem, ...rest }: TopBarNavSearch.Props) {
  return (
    <ElTopBarNavSearch {...rest}>
      <ElTopBarNavSearchButtonContainer>{button}</ElTopBarNavSearchButtonContainer>
      <ElTopBarNavSearchIconItemContainer>{iconItem}</ElTopBarNavSearchIconItemContainer>
    </ElTopBarNavSearch>
  )
}

TopBarNavSearch.Button = TopBarNavSearchButton
TopBarNavSearch.IconItem = TopBarNavSearchIconItem
