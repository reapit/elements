import { useState, type FC, type HTMLAttributes, type KeyboardEventHandler } from 'react'
import { SideBarCollapseButton } from '../side-bar-collapse-button'
import { IsSideBarExpandedContext, useIsSideBarExpandedContext } from './is-side-bar-expanded-context'
import { ElSideBar, ELSideBarMenuList } from './styles'
import { useMediaQuery } from '#src/hooks/use-media-query'

type SideBarFC = FC<HTMLAttributes<HTMLElement>> & {
  CollapseButon: typeof SideBarCollapseButton
  MenuList: FC<HTMLAttributes<HTMLUListElement>>
}

const SideBar: SideBarFC = ({ children, ...props }) => {
  const { isWideScreen, isSuperWideScreen, is4KScreen } = useMediaQuery()
  const [isExpanded, setIsExpanded] = useState(!!(isWideScreen || isSuperWideScreen || is4KScreen))

  const handleOnKeyDown: KeyboardEventHandler<HTMLUListElement> = (e) => {
    const container = e.currentTarget
    const clickableItems = container?.querySelectorAll('a,button') as NodeListOf<HTMLElement>

    let currentIndex = -1
    clickableItems.forEach((item, index) => {
      if (item === document.activeElement) {
        currentIndex = index
      }
    })

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        const nextItem = clickableItems[(currentIndex + 1) % clickableItems.length]
        nextItem.focus()
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        const prevItem = clickableItems[(currentIndex - 1 + clickableItems.length) % clickableItems.length]
        prevItem.focus()
        break
      }
      case 'Enter':
      case ' ': {
        e.preventDefault()
        const currentItem = clickableItems[currentIndex] as HTMLAnchorElement | HTMLButtonElement
        currentItem.click()
        break
      }
    }

    props.onKeyDown?.(e)
  }
  return (
    <IsSideBarExpandedContext.Provider value={{ isExpanded, setIsExpanded }}>
      <ElSideBar aria-label="Sidebar Navigation" {...props} onKeyDown={handleOnKeyDown}>
        {children}
      </ElSideBar>
    </IsSideBarExpandedContext.Provider>
  )
}

SideBar.MenuList = ({ children }) => {
  const { isExpanded } = useIsSideBarExpandedContext()

  return <ELSideBarMenuList data-is-expanded={isExpanded}>{children}</ELSideBarMenuList>
}

SideBar.CollapseButon = SideBarCollapseButton

export { SideBar }
