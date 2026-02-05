export * from './event-handlers'
export * from './context'
export * from './popup-dialog'
export * from './styles'
export * from './use-popup-observer'
export * from './use-popup-state'

/**
 * @deprecated Import `openDialog` from `@reapit/elements/utils/dialog` instead, or use `ComboboxPopupDialog.open`.
 * This re-export will be removed in a future major version.
 */
export { openDialog as openComboboxPopup } from '#src/utils/dialog'

/**
 * @deprecated Import `closeDialog` from `@reapit/elements/utils/dialog` instead, or use `ComboboxPopupDialog.close`.
 * This re-export will be removed in a future major version.
 */
export { closeDialog as closeComboboxPopup } from '#src/utils/dialog'
