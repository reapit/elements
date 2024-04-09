import React, { Dispatch, FC, HTMLAttributes, MouseEvent, SetStateAction, useState } from 'react'
import { ElBreadCrumbItem, ElBreadCrumbContainer } from './__styles__'
import { Icon } from '../icon'
import { elMr2 } from '../../styles/spacing'
import { FlexContainer } from '../layout'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'

export interface BreadCrumbItem extends HTMLAttributes<HTMLAnchorElement> {
  text: string
  onClick: () => void
}

export interface BreadCrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadCrumbItem[]
  defaultActiveIndex?: number
}

export const handleNext =
  (setActive: Dispatch<SetStateAction<number>>, onClick: () => void, index: number) =>
  (e?: MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault()
    setActive(index)
    onClick()
  }

export const BreadCrumb: FC<BreadCrumbProps> = ({ items, defaultActiveIndex = 0, ...rest }) => {
  const [active, setActive] = useState<number>(defaultActiveIndex)

  return (
    <ElBreadCrumbContainer {...rest}>
      {items.map(({ onClick, text }, index) => {
        if (index > active) return null

        return (
          <FlexContainer isFlexAlignCenter key={index}>
            {Boolean(index) && <Icon className={elMr2} icon="chevronRight" intent="default" fontSize="12px" />}
            <ElBreadCrumbItem
              aria-current={active === index ? 'page' : 'false'}
              role="button"
              aria-label={`Breadcrumb item hit return to navigate to ${text}`}
              tabIndex={0}
              onClick={handleNext(setActive, onClick, index)}
              onKeyDown={handleKeyboardEvent('Enter', handleNext(setActive, onClick, index))}
            >
              {text}
            </ElBreadCrumbItem>
          </FlexContainer>
        )
      })}
    </ElBreadCrumbContainer>
  )
}
