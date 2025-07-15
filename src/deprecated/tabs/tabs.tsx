import { FC, Fragment, MutableRefObject, useRef } from 'react'
import { cx } from '@linaria/core'
import { elTabsFullWidth, elTabsHasNoBorder } from './styles'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'
import { TabsProps } from './types'
import { TabsWrap, TabsOptionsWrap, Tab, TabsLabel, TabsItem, TabsFooter } from './tabs.atoms'

/** @deprecated */
export const handleKeyboardTabChange =
  (tabsRefs: MutableRefObject<(HTMLInputElement | null)[]>, index: number) => () => {
    tabsRefs.current[index]?.click()
  }

/** @deprecated */
export const Tabs: FC<TabsProps> = ({ className, isFullWidth, hasNoBorder, isControlled, name, options, ...rest }) => {
  const tabsRefs = useRef<(HTMLInputElement | null)[]>([])

  return (
    <TabsWrap className={cx(className, isFullWidth && elTabsFullWidth)}>
      <TabsOptionsWrap role="tablist">
        {options.map(({ id, value, text, isChecked }, index) => (
          <Fragment key={id}>
            <Tab
              id={id}
              ref={(el) => ((tabsRefs as any).current[index] = el)}
              name={name}
              value={value}
              type="radio"
              aria-selected={isChecked}
              {...rest}
              checked={isControlled ? isChecked : undefined}
              defaultChecked={isControlled ? undefined : isChecked}
            />
            <TabsLabel
              htmlFor={id}
              role="tab"
              tabIndex={0}
              onKeyDown={handleKeyboardEvent('Enter', handleKeyboardTabChange(tabsRefs, index))}
            >
              <TabsItem>{text}</TabsItem>
            </TabsLabel>
          </Fragment>
        ))}
      </TabsOptionsWrap>
      <TabsFooter className={cx(isFullWidth && elTabsFullWidth, hasNoBorder && elTabsHasNoBorder)} />
    </TabsWrap>
  )
}
