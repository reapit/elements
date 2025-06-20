import React, { Dispatch, FC, HTMLAttributes, MouseEvent, SetStateAction, useState } from 'react'
import { ElDeprecatedBreadCrumbItem, ElDeprecatedBreadCrumbContainer } from './__styles__'
import { DeprecatedIcon } from '../deprecated-icon'
import { elMr2 } from '../../styles/spacing'
import { FlexContainer } from '../layout'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'

export interface DeprecatedBreadCrumbItem extends HTMLAttributes<HTMLAnchorElement> {
  text: string
  onClick: () => void
}

/** @deprecated will be replaced by new v5 BreadcrumbProps */
export interface DeprecatedBreadCrumbProps extends HTMLAttributes<HTMLElement> {
  items: DeprecatedBreadCrumbItem[]
  defaultActiveIndex?: number
}

export const handleNext =
  (setActive: Dispatch<SetStateAction<number>>, onClick: () => void, index: number) =>
  (e?: MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault()
    setActive(index)
    onClick()
  }

/** @deprecated will be replaced by new v5 Breadcrumb */
export const DeprecatedBreadCrumb: FC<DeprecatedBreadCrumbProps> = ({ items, defaultActiveIndex = 0, ...rest }) => {
  const [active, setActive] = useState<number>(defaultActiveIndex)

  return (
    <ElDeprecatedBreadCrumbContainer {...rest}>
      {items.map(({ onClick, text }, index) => {
        if (index > active) return null

        return (
          <FlexContainer isFlexAlignCenter key={index}>
            {Boolean(index) && (
              <DeprecatedIcon className={elMr2} icon="chevronRight" intent="default" fontSize="12px" />
            )}
            <ElDeprecatedBreadCrumbItem
              aria-current={active === index ? 'page' : 'false'}
              role="button"
              aria-label={`Breadcrumb item hit return to navigate to ${text}`}
              tabIndex={0}
              onClick={handleNext(setActive, onClick, index)}
              onKeyDown={handleKeyboardEvent('Enter', handleNext(setActive, onClick, index))}
            >
              {text}
            </ElDeprecatedBreadCrumbItem>
          </FlexContainer>
        )
      })}
    </ElDeprecatedBreadCrumbContainer>
  )
}
