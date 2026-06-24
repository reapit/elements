import { FC, HTMLAttributes, ReactNode } from 'react'
import { cx } from '@linaria/core'
import {
  ElDeprecatedTableHeadersRow,
  ElDeprecatedTableHeader,
  ElDeprecatedTableRow,
  ElDeprecatedTableCell,
  ElDeprecatedTableCellContent,
  ElTableExpandableRowTriggerCell,
  ElTableExpandableRow,
  elTableCellHasDarkText,
  elTableNarrowCellIsFullWidth,
  ElDeprecatedTableRowContainer,
  ElTableExpandableContainer,
  ElTableCellNarrowOrder1,
  ElTableCellNarrowOrder2,
  ElTableCellNarrowOrder3,
  ElTableCellNarrowOrder4,
  ElTableCellNarrowOrder5,
  ElTableCellNarrowOrder6,
  ElTableCellNarrowOrder7,
  ElTableCellNarrowOrder8,
  ElTableCellNarrowOrder9,
  ElTableCellNarrowOrder10,
  ElTableCellNarrowOrder11,
  ElTableCellNarrowOrder12,
  ElTableCtaIconContainer,
  ElTableCtaCell,
  ElDeprecatedTableSortHeader,
  ElTableCellSplitWrap,
  ElTableCellSplitData,
  ElTableCellSplitSubData,
} from './__styles__'
import { elIsActive } from '../../styles/deprecated-states'
import { FlexContainer } from '../layout'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'
import { MoreIcon } from '#src/icons/more'
import { SortAscendIcon } from '#src/icons/sort-ascend'
import { SortDescendIcon } from '#src/icons/sort-descend'
// imports all icons to support v4 string icon names (e.g. icon="contact")
import * as allIcons from '#src/icons/docs/all-icons'
import type { IconProps } from '#src/icons/make-icon/make-icon'

const resolveDeprecatedIcon = (icon: ReactNode): ReactNode => {
  if (typeof icon !== 'string') return icon
  const componentName = icon.charAt(0).toUpperCase() + icon.slice(1) + 'Icon'
  const IconComponent = (allIcons as unknown as Record<string, FC<IconProps>>)[componentName]
  return IconComponent ? <IconComponent size="sm" color="primary" /> : null
}

/** @deprecated */
export type NarrowOrderType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @deprecated */
export interface DeprecatedTableCellProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  darkText?: boolean
  narrowLabel?: string
  narrowIsFullWidth?: boolean
  className?: string
  narrowOrder?: NarrowOrderType
}

/** @deprecated */
export interface TableCellSplitProps extends HTMLAttributes<HTMLDivElement> {
  data?: ReactNode
  subData?: ReactNode
}

/** @deprecated */
export interface TableExpandableRowTriggerCellProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  narrowIsFullWidth?: boolean
}

/** @deprecated */
export interface TableExpandableRowProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  className?: string
}

/** @deprecated */
export interface DeprecatedTableRowContainerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
}

/** @deprecated */
export interface TableCtaTriggerCellProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
}

/** @deprecated */
export interface DeprecatedTableSortHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const resolveNarrowOrderClass = (order: number): string | undefined => {
  switch (order) {
    case 1:
      return ElTableCellNarrowOrder1
    case 2:
      return ElTableCellNarrowOrder2
    case 3:
      return ElTableCellNarrowOrder3
    case 4:
      return ElTableCellNarrowOrder4
    case 5:
      return ElTableCellNarrowOrder5
    case 6:
      return ElTableCellNarrowOrder6
    case 7:
      return ElTableCellNarrowOrder7
    case 8:
      return ElTableCellNarrowOrder8
    case 9:
      return ElTableCellNarrowOrder9
    case 10:
      return ElTableCellNarrowOrder10
    case 11:
      return ElTableCellNarrowOrder11
    case 12:
      return ElTableCellNarrowOrder12
  }
}

/** @deprecated */
export const DeprecatedTableHeadersRow: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return <ElDeprecatedTableHeadersRow {...rest}>{children}</ElDeprecatedTableHeadersRow>
}

/** @deprecated */
export const DeprecatedTableHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return <ElDeprecatedTableHeader {...rest}>{children}</ElDeprecatedTableHeader>
}

/** @deprecated */
export const DeprecatedTableRow: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return <ElDeprecatedTableRow {...rest}>{children}</ElDeprecatedTableRow>
}

/** @deprecated */
export const TableCellSplit: FC<TableCellSplitProps> = ({ data, subData, ...rest }) => {
  return (
    <ElTableCellSplitWrap {...rest}>
      <ElTableCellSplitData>{data}</ElTableCellSplitData>
      <ElTableCellSplitSubData>{subData}</ElTableCellSplitSubData>
    </ElTableCellSplitWrap>
  )
}

/** @deprecated */
export const DeprecatedTableCell: FC<DeprecatedTableCellProps> = ({
  icon,
  darkText,
  narrowLabel,
  narrowIsFullWidth,
  className,
  children,
  narrowOrder,
  ...rest
}) => {
  const combinedClassname = cx(
    className,
    darkText !== false && elTableCellHasDarkText,
    narrowIsFullWidth && elTableNarrowCellIsFullWidth,
    narrowOrder && resolveNarrowOrderClass(narrowOrder),
  )
  return (
    <ElDeprecatedTableCell className={combinedClassname} {...rest}>
      {icon && resolveDeprecatedIcon(icon)}
      <ElDeprecatedTableCellContent data-narrow-label={narrowLabel}>{children}</ElDeprecatedTableCellContent>
    </ElDeprecatedTableCell>
  )
}

/** @deprecated */
export const handleTableCtaClick = (onClick?: (event?: any) => void) => () => {
  if (onClick) onClick()
}

/** @deprecated */
export const TableExpandableRowTriggerCell: FC<TableExpandableRowTriggerCellProps> = ({
  isOpen,
  narrowIsFullWidth,
  className,
  children,
  onClick,
  ...rest
}) => {
  return (
    <ElTableExpandableRowTriggerCell
      role="button"
      tabIndex={0}
      onClick={handleTableCtaClick(onClick)}
      onKeyDown={handleKeyboardEvent('Enter', handleTableCtaClick(onClick))}
      className={cx(className, narrowIsFullWidth && elTableNarrowCellIsFullWidth)}
      {...rest}
    >
      {children ? (
        children // TODO: Migrate dynamic props manually
      ) : (
        <MoreIcon />
      )}
    </ElTableExpandableRowTriggerCell>
  )
}

/** @deprecated */
export const TableCtaTriggerCell: FC<TableCtaTriggerCellProps> = ({ icon, children, onClick, ...rest }) => {
  return (
    <ElTableCtaCell
      role="button"
      tabIndex={0}
      onClick={handleTableCtaClick(onClick)}
      onKeyDown={handleKeyboardEvent('Enter', handleTableCtaClick(onClick))}
      {...rest}
    >
      {children ? (
        children
      ) : icon ? (
        <ElTableCtaIconContainer>{resolveDeprecatedIcon(icon)}</ElTableCtaIconContainer>
      ) : (
        ''
      )}
    </ElTableCtaCell>
  )
}

/** @deprecated */
export const TableExpandableRow: FC<TableExpandableRowProps> = ({ isOpen, className, children, ...rest }) => {
  const combinedClassname = cx(className, isOpen && elIsActive)
  return (
    <ElTableExpandableRow className={combinedClassname} {...rest}>
      <ElTableExpandableContainer>{children}</ElTableExpandableContainer>
    </ElTableExpandableRow>
  )
}

/** @deprecated */
export const DeprecatedTableRowContainer: FC<DeprecatedTableRowContainerProps> = ({
  isOpen,
  className,
  children,
  ...rest
}) => {
  return (
    <ElDeprecatedTableRowContainer className={cx(className, isOpen && elIsActive)} {...rest}>
      {children}
    </ElDeprecatedTableRowContainer>
  )
}

/** @deprecated */
export const DeprecatedTableSortHeader: FC<DeprecatedTableSortHeaderProps> = ({ children, ...rest }) => {
  return (
    <ElDeprecatedTableSortHeader {...rest}>
      <FlexContainer isFlexAlignCenter isFlexJustifyBetween>
        {children}
        <FlexContainer>
          <SortAscendIcon color="secondary" />
          <SortDescendIcon color="secondary" />
        </FlexContainer>
      </FlexContainer>
    </ElDeprecatedTableSortHeader>
  )
}
