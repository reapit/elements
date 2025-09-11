export * from './body'
export * from './constants'
export * from './context'
export * from './drawer'
export * from './footer'
export * from './header'
export * from './styles'
export * from './use-cancel-close-requests'
export * from './use-dialog-controller'
export * from './use-dialog-observer'
export * from './use-with-stop-propagation'

// Import specific components to access their namespaces for backward compatibility
import { Drawer } from './drawer'
import { DrawerBody } from './body'
import { DrawerHeader } from './header'
import { DrawerFooter } from './footer'

// Backward compatibility exports
export type DrawerProps = Drawer.Props
export type DrawerBodyProps = DrawerBody.Props
export type DrawerHeaderProps = DrawerHeader.Props
export type DrawerFooterProps = DrawerFooter.Props
