import type { HTMLAttributes } from 'react'
import { ElEmptyData, ElEmptyDataActionButton, ElEmptyDataHeading, ElEmptyDataContent } from './styles'
import type React from 'react'

type EmptyDataFC = React.FC<HTMLAttributes<HTMLDivElement>> & {
  Description: typeof ElEmptyDataHeading
  SecondaryDescription: typeof ElEmptyDataContent
  ActionButton: typeof ElEmptyDataActionButton
}

const EmptyData: EmptyDataFC = ({ children, ...props }) => <ElEmptyData {...props}>{children}</ElEmptyData>

EmptyData.Description = ElEmptyDataHeading
EmptyData.SecondaryDescription = ElEmptyDataContent
EmptyData.ActionButton = ElEmptyDataActionButton

export { EmptyData }
