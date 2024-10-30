import React, { Dispatch, FC, HTMLAttributes, MouseEvent, SetStateAction, useState } from 'react'
import { ElMobileControlItem, ElMobileControls, ElMobileControlsBg, elMobileControlsVisible } from './__styles__'
import { IconNames } from '../icon'
import { FloatingButton } from '../button'
import { cx } from '@linaria/core'
import { elIsActive } from '../../styles/states'
import { useId } from '../../storybook/random-id'

export interface MobileControlItem extends HTMLAttributes<HTMLAnchorElement> {
  onClick?: () => void
  label?: string
}

export interface MobileControlsProps extends HTMLAttributes<HTMLDivElement> {
  buttonIcon?: IconNames
  buttonOnClick?: () => void
  mobileControlItems?: MobileControlItem[]
  isVisible?: boolean
}

export const clickEventHandler =
  (setActive: Dispatch<SetStateAction<boolean>>, onClick?: () => void) =>
  (event: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    event?.preventDefault()
    event?.stopPropagation()

    setActive((active) => !active)

    if (onClick) {
      onClick()
    }
  }

export const MobileControls: FC<MobileControlsProps> = ({
  mobileControlItems,
  buttonOnClick,
  buttonIcon,
  isVisible,
  ...rest
}) => {
  const [active, setActive] = useState<boolean>(false)
  const id = useId(rest.id)

  return (
    <>
      <ElMobileControlsBg
        className={cx(active && elIsActive)}
        aria-hidden={!active}
        onClick={clickEventHandler(setActive, buttonOnClick)}
      />
      <ElMobileControls
        id={id}
        className={cx(isVisible && elMobileControlsVisible)}
        onClick={clickEventHandler(setActive, buttonOnClick)}
        {...rest}
      >
        {mobileControlItems?.map(({ onClick, label, ...item }, index) => (
          <ElMobileControlItem
            role="button"
            aria-hidden={!active}
            className={cx(active && elIsActive)}
            onClick={clickEventHandler(setActive, onClick)}
            {...item}
            key={index}
          >
            {label}
          </ElMobileControlItem>
        ))}
        <FloatingButton aria-controls={id} variant="primary" icon={buttonIcon ? buttonIcon : 'menu'} />
      </ElMobileControls>
    </>
  )
}
