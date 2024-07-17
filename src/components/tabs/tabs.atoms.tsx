import { FC, ForwardedRef, forwardRef, InputHTMLAttributes, LegacyRef } from 'react'
import { cx } from '@linaria/core'
import { ElTab, ElTabsLabel, ElTabsWrap, ElTabsFooter, ElTabsOptionsWrap, ElTabsItem } from './styles'
import { TabsBaseProps, TabsInputProps, TabsLabelProps } from './types'

export const Tab: TabsInputProps = forwardRef(
  ({ children, className, ...rest }, ref: ForwardedRef<InputHTMLAttributes<HTMLInputElement>>) => (
    <ElTab className={cx(className)} {...rest} ref={ref as unknown as LegacyRef<HTMLInputElement>}>
      {children}
    </ElTab>
  ),
)

export const TabsWrap: FC<TabsBaseProps> = ({ children, className, ...rest }) => (
  <ElTabsWrap className={cx(className)} {...rest}>
    {children}
  </ElTabsWrap>
)

export const TabsLabel: FC<TabsLabelProps> = ({ children, className, ...rest }) => (
  <ElTabsLabel className={cx(className)} {...rest}>
    {children}
  </ElTabsLabel>
)

export const TabsFooter: FC<TabsBaseProps> = ({ children, className, ...rest }) => (
  <ElTabsFooter className={cx(className)} {...rest}>
    {children}
  </ElTabsFooter>
)

export const TabsOptionsWrap: FC<TabsBaseProps> = ({ children, className, ...rest }) => (
  <ElTabsOptionsWrap className={cx(className)} {...rest}>
    {children}
  </ElTabsOptionsWrap>
)

export const TabsItem: FC<TabsBaseProps> = ({ children, className, ...rest }) => (
  <ElTabsItem className={cx(className)} {...rest}>
    {children}
  </ElTabsItem>
)
