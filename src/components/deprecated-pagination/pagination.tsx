import { cx } from '@linaria/core'
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  SetStateAction,
  useState,
  useEffect,
} from 'react'
import { Icon } from '../icon'
import {
  DeprecatedElPaginationButton,
  deprecatedElPaginationPrimary,
  DeprecatedElPaginationText,
  DeprecatedElPaginationWrap,
  DeprecatedElPaginationInput,
} from './__styles__'

/** @deprecated */
export interface DeprecatedPaginationProps extends HTMLAttributes<HTMLDivElement> {
  callback: (nextPage: number) => void
  currentPage: number
  numberPages: number
  hasStartButton?: boolean
  hasEndButton?: boolean
}

/** @deprecated */
export interface DeprecatedPaginationWrapProps extends HTMLAttributes<HTMLDivElement> {}

/** @deprecated */
export interface DeprecatedPaginationTextProps extends HTMLAttributes<HTMLDivElement> {}

/** @deprecated */
export interface DeprecatedPaginationInputProps extends InputHTMLAttributes<HTMLInputElement> {}

/** @deprecated */
export interface DeprecatedPaginationButtonProps extends HTMLAttributes<HTMLButtonElement> {}

/** @deprecated */
export const deprecatedHandlePageChange =
  (nextPage: number | null, callback: (page: number) => void, setInputValue: Dispatch<SetStateAction<string>>) =>
  () => {
    if (nextPage) {
      setInputValue(String(nextPage))
      callback(nextPage)
    }
  }

/** @deprecated */
export const deprecatedHandlePageInputChange =
  (numberPages: number, currentPage: number, inputValue: string, callback: (page: number) => void) => () => {
    const nextPage = Number(inputValue)
    if (nextPage && nextPage <= numberPages && nextPage !== currentPage) {
      callback(nextPage)
    }
  }

/** @deprecated */
export const deprecatedHandlePageInput =
  (setInputValue: Dispatch<SetStateAction<string>>, numberPages: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const nextPage = Number(event.target.value)

    if (nextPage > numberPages) {
      setInputValue(String(numberPages))
    } else if (nextPage < 1) {
      setInputValue('')
    } else {
      setInputValue(event.target.value)
    }
  }

/** @deprecated */
export const DeprecatedPaginationWrap: FC<DeprecatedPaginationWrapProps> = ({ children, ...rest }) => (
  <DeprecatedElPaginationWrap {...rest}>{children}</DeprecatedElPaginationWrap>
)

/** @deprecated */
export const DeprecatedPaginationText: FC<DeprecatedPaginationTextProps> = ({ children, ...rest }) => (
  <DeprecatedElPaginationText {...rest}>{children}</DeprecatedElPaginationText>
)

/** @deprecated */
export const DeprecatedPaginationInput: FC<DeprecatedPaginationInputProps> = ({ ...rest }) => (
  <DeprecatedElPaginationInput {...rest} />
)

/** @deprecated */
export const DeprecatedPaginationButton: FC<DeprecatedPaginationButtonProps> = ({ children, ...rest }) => (
  <DeprecatedElPaginationButton type="button" {...rest}>
    {children}
  </DeprecatedElPaginationButton>
)

/** @deprecated */
export const DeprecatedPagination: FC<DeprecatedPaginationProps> = ({
  callback,
  currentPage,
  numberPages,
  hasStartButton,
  hasEndButton,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>(String(currentPage))

  useEffect(deprecatedHandlePageInputChange(numberPages, currentPage, inputValue, callback), [
    inputValue,
    currentPage,
    numberPages,
  ])

  const nextPage = currentPage < numberPages ? currentPage + 1 : null
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  return (
    <DeprecatedPaginationWrap {...rest}>
      <DeprecatedPaginationButton
        role="button"
        aria-label="Previous"
        data-testid="back-button"
        onClick={deprecatedHandlePageChange(prevPage, callback, setInputValue)}
      >
        <Icon icon="chevronLeft" className={cx(prevPage && deprecatedElPaginationPrimary)} />
      </DeprecatedPaginationButton>
      {hasStartButton && (
        <DeprecatedPaginationButton
          role="button"
          aria-label="Previous"
          data-testid="back-button"
          onClick={deprecatedHandlePageChange(1, callback, setInputValue)}
        >
          <Icon icon="chevronLeft" className={cx(currentPage !== 1 && deprecatedElPaginationPrimary)} />
          <Icon icon="chevronLeft" className={cx(currentPage !== 1 && deprecatedElPaginationPrimary)} />
        </DeprecatedPaginationButton>
      )}
      <DeprecatedPaginationText>
        <DeprecatedPaginationInput
          onChange={deprecatedHandlePageInput(setInputValue, numberPages)}
          aria-label={`Current page number, edit to select page of ${numberPages} available`}
          value={inputValue}
        />{' '}
        of {numberPages}
      </DeprecatedPaginationText>
      {hasEndButton && (
        <DeprecatedPaginationButton
          role="button"
          aria-label="Next"
          data-testid="back-button"
          onClick={deprecatedHandlePageChange(numberPages, callback, setInputValue)}
        >
          <Icon icon="chevronRight" className={cx(currentPage !== numberPages && deprecatedElPaginationPrimary)} />
          <Icon icon="chevronRight" className={cx(currentPage !== numberPages && deprecatedElPaginationPrimary)} />
        </DeprecatedPaginationButton>
      )}
      <DeprecatedPaginationButton
        role="button"
        aria-label="Next"
        data-testid="forward-button"
        onClick={deprecatedHandlePageChange(nextPage, callback, setInputValue)}
      >
        <Icon icon="chevronRight" className={cx(nextPage && deprecatedElPaginationPrimary)} />
      </DeprecatedPaginationButton>
    </DeprecatedPaginationWrap>
  )
}
