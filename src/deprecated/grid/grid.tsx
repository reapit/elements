import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import {
  ElGrid,
  ElCol,
  ElColSplit,
  ElColHalf,
  ElColSplitThird,
  ElColSplitTwoThirds,
  ElGridThirds,
  ElColQuarter,
} from './__styles__'

/** @deprecated */
export interface GridProps extends HTMLAttributes<HTMLElement> {}

/** @deprecated */
export interface ColProps extends HTMLAttributes<HTMLElement> {}

/** @deprecated */
export const Grid: FC<GridProps> = ({ className, children, ...rest }: GridProps) => (
  <ElGrid className={cx(className)} {...rest}>
    {children}
  </ElGrid>
)

/** @deprecated */
export const Col: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElCol className={cx(className)} {...rest}>
    {children}
  </ElCol>
)

/** @deprecated */
export const ColHalf: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColHalf className={cx(className)} {...rest}>
    {children}
  </ElColHalf>
)

/** @deprecated */
export const ColQuarter: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColQuarter className={cx(className)} {...rest}>
    {children}
  </ElColQuarter>
)

/** @deprecated */
export const ColSplit: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColSplit className={cx(className)} {...rest}>
    {children}
  </ElColSplit>
)

/** @deprecated */
export const GridThirds: FC<GridProps> = ({ className, children, ...rest }: GridProps) => (
  <ElGridThirds className={cx(className)} {...rest}>
    {children}
  </ElGridThirds>
)

/** @deprecated */
export const ColSplitThird: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColSplitThird className={cx(className)} {...rest}>
    {children}
  </ElColSplitThird>
)

/** @deprecated */
export const ColSplitTwoThirds: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColSplitTwoThirds className={cx(className)} {...rest}>
    {children}
  </ElColSplitTwoThirds>
)
