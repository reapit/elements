import { FC, Fragment, HTMLAttributes, MutableRefObject, useRef } from 'react'
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
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'

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

export const handleKeyboardTabChange =
  (tabsRefs: MutableRefObject<(HTMLInputElement | null)[]>, index: number) => () => {
    tabsRefs.current[index]?.click()
  }

export const Tabs: FC<TabsProps> = ({ className, isFullWidth, hasNoBorder, isControlled, name, options, ...rest }) => {
  const tabsRefs = useRef<(HTMLInputElement | null)[]>([])

  return (
    <ElTabsWrap className={cx(className, isFullWidth && elTabsFullWidth)}>
      <ElTabsOptionsWrap role="tablist">
        {options.map(({ id, value, text, isChecked }, index) => (
          <Fragment key={id}>
            <ElTabs
              id={id}
              ref={(el) => (tabsRefs.current[index] = el)}
              name={name}
              value={value}
              type="radio"
              aria-selected={isChecked}
              {...rest}
              checked={isControlled ? isChecked : undefined}
              defaultChecked={isControlled ? undefined : isChecked}
            />
            <ElTabsLabel
              htmlFor={id}
              role="tab"
              tabIndex={0}
              onKeyDown={handleKeyboardEvent('Enter', handleKeyboardTabChange(tabsRefs, index))}
            >
              <span className={elTabsItem}>{text}</span>
            </ElTabsLabel>
          </Fragment>
        ))}
      </ElTabsOptionsWrap>
      <ElTabsFooter className={cx(isFullWidth && elTabsFullWidth, hasNoBorder && elTabsHasNoBorder)} />
    </ElTabsWrap>
  )
}
