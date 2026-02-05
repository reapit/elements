export * from './body'
export * from './constants'
export * from './context'
export * from './drawer'
export * from './footer'
export * from './header'
export * from './styles'

/**
 * @deprecated Import `getClosestDialogElement` from `@reapit/elements/utils/dialog` instead.
 * This re-export will be removed in a future major version.
 */
export { getClosestDialogElement } from '#src/utils/dialog'

/**
 * @deprecated Import `useCancelCloseRequests` from `@reapit/elements/utils/dialog` instead.
 * This re-export will be removed in a future major version.
 */
export { useCancelCloseRequests } from '#src/utils/dialog'

/**
 * @deprecated Import `useDialogOpenController` from `@reapit/elements/utils/dialog` instead.
 * This re-export will be removed in a future major version.
 */
export { useDialogOpenController as useDialogController } from '#src/utils/dialog'

/**
 * @deprecated Import `useDialogOpenState` from `@reapit/elements/utils/dialog` instead.
 * This re-export will be removed in a future major version.
 */
export { useDialogOpenState as useDialogObserver } from '#src/utils/dialog'

/**
 * @deprecated Import `useWithStopPropagation` from `@reapit/elements/utils/events` instead.
 * This re-export will be removed in a future major version.
 */
export { useWithStopPropagation } from '#src/utils/events'

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
