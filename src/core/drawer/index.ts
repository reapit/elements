export * from './body'
export * from './constants'
export * from './context'
export * from './drawer'
export * from './footer'
export * from './header'
export * from './styles'

// Import specific components to access their namespaces for backward compatibility
import { Drawer } from './drawer'
import { DrawerBody } from './body'
import { DrawerHeader } from './header'
import { DrawerFooter } from './footer'

/** @deprecated use Drawer.Props instead */
export type DrawerProps = Drawer.Props
/** @deprecated use DrawerBody.Props instead */
export type DrawerBodyProps = DrawerBody.Props
/** @deprecated use DrawerHeader.Props instead */
export type DrawerHeaderProps = DrawerHeader.Props
/** @deprecated use DrawerFooter.Props instead */
export type DrawerFooterProps = DrawerFooter.Props
