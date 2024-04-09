import React, {
  ForwardedRef,
  forwardRef,
  Fragment,
  HTMLAttributes,
  InputHTMLAttributes,
  LegacyRef,
  RefAttributes,
} from 'react'
import { cx } from '@linaria/core'
import { elHasGreyBg } from './__styles__/index'
import {
  ElToggleCheckbox,
  elToggleFullWidth,
  ElToggleLabel,
  ElToggleRadio,
  ElToggleRadioItem,
  ElToggleRadioLabel,
  ElToggleRadioWrap,
} from './__styles__/index'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'
import { useId } from '../../storybook/random-id'

export interface ToggleProps extends HTMLAttributes<HTMLInputElement> {
  isFullWidth?: boolean
  hasGreyBg?: boolean
}

export interface ToggleRadioOption {
  id: string
  value: string
  text: string
  isChecked: boolean
}

export interface ToggleRadioProps extends HTMLAttributes<HTMLInputElement> {
  options: ToggleRadioOption[]
  name: string
  disabled?: boolean
  isFullWidth?: boolean
  hasGreyBg?: boolean
}

export type ToggleWrapped = React.ForwardRefExoticComponent<
  ToggleProps & RefAttributes<InputHTMLAttributes<HTMLInputElement>>
>

export type ToggleRadioWrapped = React.ForwardRefExoticComponent<
  ToggleRadioProps & RefAttributes<InputHTMLAttributes<HTMLInputElement>>
>

export const handleKeyboardToggleChange = (id: string) => () => {
  const radio = document.getElementById(id)
  if (radio) {
    radio.click()
  }
}

export const Toggle: ToggleWrapped = forwardRef(
  (
    { className, children, isFullWidth, hasGreyBg, id, ...rest },
    ref: ForwardedRef<InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    if (isFullWidth) {
      console.warn(`The "${isFullWidth}" prop is deprecated and will be removed in the next major release.`)
    }

    const toggleId = useId(id)

    return (
      <>
        <ElToggleCheckbox id={toggleId} type="checkbox" {...rest} ref={ref as unknown as LegacyRef<HTMLInputElement>} />
        <ElToggleLabel
          htmlFor={toggleId}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyboardEvent('Enter', handleKeyboardToggleChange(toggleId))}
          className={cx(className, isFullWidth && elToggleFullWidth, hasGreyBg && elHasGreyBg)}
        >
          {children}
        </ElToggleLabel>
      </>
    )
  },
)

export const ToggleRadio: ToggleRadioWrapped = forwardRef(
  (
    { className, isFullWidth, hasGreyBg, name, options, disabled, ...rest },
    ref: ForwardedRef<InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    if (isFullWidth) {
      console.warn(`The "${isFullWidth}" prop is deprecated and will be removed in the next major release.`)
    }
    return (
      <ElToggleRadioWrap className={cx(className, isFullWidth && elToggleFullWidth, hasGreyBg && elHasGreyBg)}>
        {options.map(({ id, value, text, isChecked }) => (
          <Fragment key={id}>
            <ElToggleRadio
              id={id}
              name={name}
              value={value}
              type="radio"
              disabled={disabled}
              {...rest}
              defaultChecked={isChecked}
              ref={ref as unknown as LegacyRef<HTMLInputElement>}
            />
            <ElToggleRadioLabel
              htmlFor={!disabled ? id : undefined}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyboardEvent('Enter', handleKeyboardToggleChange(id))}
              className={cx(hasGreyBg && elHasGreyBg, isFullWidth && elToggleFullWidth)}
            >
              <ElToggleRadioItem>{text}</ElToggleRadioItem>
            </ElToggleRadioLabel>
          </Fragment>
        ))}
      </ElToggleRadioWrap>
    )
  },
)
