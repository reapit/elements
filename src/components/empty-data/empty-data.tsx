import type { HTMLAttributes } from 'react'
import { ElEmptyData, ElEmptyDataActionButton, ElEmptyDataDescription, ElEmptyDataSecondaryDescription } from './styles'
import type React from 'react'

type EmptyDataFC = React.FC<HTMLAttributes<HTMLDivElement>> & {
  Description: typeof ElEmptyDataDescription
  SecondaryDescription: typeof ElEmptyDataSecondaryDescription
  ActionButton: typeof ElEmptyDataActionButton
}

const EmptyData: EmptyDataFC = ({ children, ...props }) => <ElEmptyData {...props}>{children}</ElEmptyData>

EmptyData.Description = ElEmptyDataDescription
EmptyData.SecondaryDescription = ElEmptyDataSecondaryDescription
EmptyData.ActionButton = ElEmptyDataActionButton

export { EmptyData }
