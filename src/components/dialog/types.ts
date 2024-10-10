import { FC, HTMLAttributes } from 'react'

import { ElDialogContainerProps } from './style'

export interface DialogContainerProps extends ElDialogContainerProps {}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

export type DialogFooterItems = FC<{ closeDialog: VoidFunction }>
