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

export interface ToggleProps extends HTMLAttributes<HTMLInputElement> {
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
  hasGreyBg?: boolean
}

export type ToggleWrapped = React.ForwardRefExoticComponent<
  ToggleProps & RefAttributes<InputHTMLAttributes<HTMLInputElement>>
>

export type ToggleRadioWrapped = React.ForwardRefExoticComponent<
  ToggleRadioProps & RefAttributes<InputHTMLAttributes<HTMLInputElement>>
>

export const Toggle: ToggleWrapped = forwardRef(
  ({ className, children, hasGreyBg, id, ...rest }, ref: ForwardedRef<InputHTMLAttributes<HTMLInputElement>>) => {
    return (
      <>
        <ElToggleCheckbox id={id} type="checkbox" {...rest} ref={ref as unknown as LegacyRef<HTMLInputElement>} />
        <ElToggleLabel htmlFor={id} className={cx(className && elToggleFullWidth, hasGreyBg && elHasGreyBg)}>
          {children}
        </ElToggleLabel>
      </>
    )
  },
)

export const ToggleRadio: ToggleRadioWrapped = forwardRef(
  (
    { className, hasGreyBg, name, options, disabled, ...rest },
    ref: ForwardedRef<InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    return (
      <ElToggleRadioWrap className={cx(className, hasGreyBg && elHasGreyBg)}>
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
            <ElToggleRadioLabel htmlFor={!disabled ? id : undefined} className={cx(hasGreyBg && elHasGreyBg)}>
              <ElToggleRadioItem>{text}</ElToggleRadioItem>
            </ElToggleRadioLabel>
          </Fragment>
        ))}
      </ElToggleRadioWrap>
    )
  },
)
