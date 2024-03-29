import React, { FC, Fragment, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import {
  elTabsFullWidth,
  elTabsHasNoBorder,
  ElTabs,
  elTabsItem,
  ElTabsLabel,
  ElTabsWrap,
  ElTabsFooter,
  ElTabsOptionsWrap,
} from './__styles__/index'

export interface TabsOption {
  id: string
  value: string
  text: string
  isChecked: boolean
}

export interface TabsProps extends HTMLAttributes<HTMLInputElement> {
  options: TabsOption[]
  name: string
  isControlled?: boolean
  isFullWidth?: boolean
  hasNoBorder?: boolean
}

export const Tabs: FC<TabsProps> = ({ className, isFullWidth, hasNoBorder, isControlled, name, options, ...rest }) => {
  return (
    <ElTabsWrap role="tablist" className={cx(className, isFullWidth && elTabsFullWidth)}>
      <ElTabsOptionsWrap>
        {options.map(({ id, value, text, isChecked }) => (
          <Fragment key={id}>
            <ElTabs
              id={id}
              name={name}
              value={value}
              type="radio"
              role="tab"
              aria-selected={isChecked}
              {...rest}
              checked={isControlled ? isChecked : undefined}
              defaultChecked={isControlled ? undefined : isChecked}
            />
            <ElTabsLabel htmlFor={id}>
              <span className={elTabsItem}>{text}</span>
            </ElTabsLabel>
          </Fragment>
        ))}
      </ElTabsOptionsWrap>
      <ElTabsFooter className={cx(isFullWidth && elTabsFullWidth, hasNoBorder && elTabsHasNoBorder)} />
    </ElTabsWrap>
  )
}
