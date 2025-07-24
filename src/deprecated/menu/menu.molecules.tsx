import type { FC, ReactNode } from 'react'
import { DeprecatedMenuItemContainer, type DeprecatedMenuItemContainerProps } from './menu.atoms'
import {
  ElDeprecatedMenuItemContent,
  ElDeprecatedMenuItemIcon,
  ElDeprecatedMenuItemLabel,
  ElDeprecatedMenuItemLabelContainer,
  elDeprecatedMenuItemLeftIcon,
  ElDeprecatedMenuItemSupplementaryInfo,
} from './styles'

/** @deprecated */
export interface DeprecatedMenuItemProps extends Omit<DeprecatedMenuItemContainerProps, 'children'> {
  label: string
  supplementaryInfo?: string
  badge?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

/** @deprecated */
export const DeprecatedMenuItem: FC<DeprecatedMenuItemProps> = ({
  label,
  supplementaryInfo,
  badge,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <DeprecatedMenuItemContainer {...(props as DeprecatedMenuItemContainerProps)}>
      {leftIcon && (
        <ElDeprecatedMenuItemIcon className={elDeprecatedMenuItemLeftIcon}>{leftIcon}</ElDeprecatedMenuItemIcon>
      )}
      <ElDeprecatedMenuItemContent>
        <ElDeprecatedMenuItemLabelContainer>
          <ElDeprecatedMenuItemLabel>{label}</ElDeprecatedMenuItemLabel>
          {badge}
        </ElDeprecatedMenuItemLabelContainer>
        {supplementaryInfo && (
          <ElDeprecatedMenuItemSupplementaryInfo>{supplementaryInfo}</ElDeprecatedMenuItemSupplementaryInfo>
        )}
      </ElDeprecatedMenuItemContent>
      {rightIcon && <ElDeprecatedMenuItemIcon>{rightIcon}</ElDeprecatedMenuItemIcon>}
    </DeprecatedMenuItemContainer>
  )
}
