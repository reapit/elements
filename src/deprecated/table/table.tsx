import React, { Dispatch, FC, HTMLAttributes, ReactNode, SetStateAction, useState } from 'react'
import { ElDeprecatedTable } from './__styles__'
import { DeprecatedIcon, IconNames } from '../icon'
import {
  DeprecatedTableHeadersRow,
  DeprecatedTableHeader,
  DeprecatedTableRow,
  DeprecatedTableCell,
  TableExpandableRow,
  TableExpandableRowTriggerCell,
  DeprecatedTableRowContainer,
  NarrowOrderType,
  TableCtaTriggerCell,
} from './molecules'
import { Intent } from '../../helpers/intent'

export type NarrowOptionsType = {
  showLabel?: boolean
  isFullWidth?: boolean
  order?: NarrowOrderType
}

/** @deprecated */
export interface DeprecatedCellProps {
  label: string
  labelChild?: ReactNode
  onLabelClick?: (event: React.MouseEvent) => void
  value?: ReactNode
  children?: ReactNode
  icon?: IconNames
  className?: string
  statusCircleIntent?: Intent
  cellHasDarkText?: boolean
  narrowTable?: NarrowOptionsType
}

export interface RowActionProps {
  content?: ReactNode
  cellContent?: ReactNode
  headerContent?: ReactNode
  onClick?: () => void
  className?: string
  icon?: IconNames
}

/** @deprecated */
export interface DeprecatedRowProps {
  cells: DeprecatedCellProps[]
  expandableContent?: RowActionProps
  ctaContent?: RowActionProps
}

/** @deprecated */
export interface DeprecatedTableProps extends HTMLAttributes<HTMLDivElement> {
  rows?: DeprecatedRowProps[]
  numberColumns?: number
  indexExpandedRow?: number | null
  setIndexExpandedRow?: Dispatch<SetStateAction<number | null>>
}

export const handleToggleExpandedRow =
  (
    index: number | null,
    expandedRow: number | null,
    setExpandedRow: Dispatch<SetStateAction<number | null>>,
    indexExpandedRow?: number | null,
    setIndexExpandedRow?: Dispatch<SetStateAction<number | null>>,
  ) =>
  () => {
    if (indexExpandedRow !== undefined && setIndexExpandedRow) {
      indexExpandedRow === index ? setIndexExpandedRow(null) : setIndexExpandedRow(index)
    } else {
      expandedRow === index ? setExpandedRow(null) : setExpandedRow(index)
    }
  }

/** @deprecated */
export const DeprecatedTable: FC<DeprecatedTableProps> = ({
  rows,
  children,
  numberColumns,
  indexExpandedRow,
  setIndexExpandedRow,
  ...rest
}) => {
  const firstRow = rows?.[0]
  const [expandedRow, setExpandedRow] = useState<null | number>(null)

  if (!rows || !firstRow) return <ElDeprecatedTable {...rest}>{children}</ElDeprecatedTable>

  const hasExpandableRows = rows.some((row) => Boolean(row.expandableContent))
  const hasCallToAction = rows.some((row) => Boolean(row.ctaContent))

  return (
    <ElDeprecatedTable
      role="table"
      {...rest}
      data-num-columns-excl-action-col={
        (hasExpandableRows || hasCallToAction) && numberColumns
          ? numberColumns - 1
          : numberColumns
            ? numberColumns - 1
            : hasExpandableRows
              ? firstRow.cells.length
              : undefined
      }
      data-has-expandable-action={hasExpandableRows}
      data-has-call-to-action={hasCallToAction}
    >
      <DeprecatedTableHeadersRow role="row">
        {firstRow.cells.map((cell) => (
          <DeprecatedTableHeader
            role="columnheader"
            aria-label={`${cell.labelChild || cell.label}`}
            className={cell.className}
            key={cell.label?.toString()}
            onClick={(event) => {
              if (cell.onLabelClick) {
                cell.onLabelClick(event)
              }
            }}
          >
            {cell.labelChild || cell.label}
          </DeprecatedTableHeader>
        ))}
        {hasExpandableRows && (
          <DeprecatedTableHeader role="columnheader">
            {firstRow.expandableContent?.headerContent ? (
              <>{firstRow.expandableContent?.headerContent}</>
            ) : (
              <DeprecatedIcon icon="settings" intent="default" />
            )}
          </DeprecatedTableHeader>
        )}
        {hasCallToAction && (
          <DeprecatedTableHeader role="columnheader">
            {firstRow.ctaContent?.headerContent ? (
              <>{firstRow.ctaContent?.headerContent}</>
            ) : (
              <DeprecatedIcon icon="settings" intent="default" />
            )}
          </DeprecatedTableHeader>
        )}
      </DeprecatedTableHeadersRow>
      {rows.map((row, index) => {
        const expandableRowIsOpen = indexExpandedRow !== undefined ? indexExpandedRow === index : expandedRow === index
        return (
          <DeprecatedTableRowContainer role="row" key={index} isOpen={expandableRowIsOpen}>
            <DeprecatedTableRow>
              {row.cells.map((cell, cellIndex) => {
                if (!cell) return <DeprecatedTableCell key={`${cellIndex}-${index}`} />

                return (
                  <DeprecatedTableCell
                    role="cell"
                    className={cell.className}
                    key={`${cellIndex}-${index}`}
                    icon={cell.icon}
                    darkText={cell.cellHasDarkText}
                    narrowLabel={cell.narrowTable?.showLabel ? cell.label : undefined}
                    narrowIsFullWidth={cell.narrowTable?.isFullWidth}
                    narrowOrder={cell.narrowTable?.order}
                  >
                    {cell.children || cell.value}
                  </DeprecatedTableCell>
                )
              })}
              {row.expandableContent && (
                <TableExpandableRowTriggerCell
                  role="cell"
                  className={row.expandableContent.className}
                  isOpen={expandableRowIsOpen}
                  onClick={
                    row.expandableContent.onClick
                      ? row.expandableContent.onClick
                      : handleToggleExpandedRow(
                          index,
                          expandedRow,
                          setExpandedRow,
                          indexExpandedRow,
                          setIndexExpandedRow,
                        )
                  }
                >
                  {row.expandableContent.cellContent}
                </TableExpandableRowTriggerCell>
              )}
              {row.ctaContent && (
                <TableCtaTriggerCell
                  role="cell"
                  className={row.ctaContent.className}
                  icon={row.ctaContent.icon}
                  onClick={row.ctaContent.onClick}
                >
                  {row.ctaContent.cellContent}
                </TableCtaTriggerCell>
              )}
            </DeprecatedTableRow>
            {row.expandableContent && row.expandableContent.content && (
              <TableExpandableRow isOpen={expandableRowIsOpen}>{row.expandableContent.content}</TableExpandableRow>
            )}
          </DeprecatedTableRowContainer>
        )
      })}
    </ElDeprecatedTable>
  )
}
