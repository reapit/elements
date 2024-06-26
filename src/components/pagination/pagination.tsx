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
  ElPaginationButton,
  elPaginationPrimary,
  ElPaginationText,
  ElPaginationWrap,
  ElPaginationInput,
} from './__styles__'

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  callback: (nextPage: number) => void
  currentPage: number
  numberPages: number
  hasStartButton?: boolean
  hasEndButton?: boolean
}

export interface PaginationWrapProps extends HTMLAttributes<HTMLDivElement> {}

export interface PaginationTextProps extends HTMLAttributes<HTMLDivElement> {}

export interface PaginationInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface PaginationButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const handlePageChange =
  (nextPage: number | null, callback: (page: number) => void, setInputValue: Dispatch<SetStateAction<string>>) =>
  () => {
    if (nextPage) {
      setInputValue(String(nextPage))
      callback(nextPage)
    }
  }

export const handlePageInputChange =
  (numberPages: number, currentPage: number, inputValue: string, callback: (page: number) => void) => () => {
    const nextPage = Number(inputValue)
    if (nextPage && nextPage <= numberPages && nextPage !== currentPage) {
      callback(nextPage)
    }
  }

export const handlePageInput =
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

export const PaginationWrap: FC<PaginationWrapProps> = ({ children, ...rest }) => (
  <ElPaginationWrap {...rest}>{children}</ElPaginationWrap>
)

export const PaginationText: FC<PaginationTextProps> = ({ children, ...rest }) => (
  <ElPaginationText {...rest}>{children}</ElPaginationText>
)

export const PaginationInput: FC<PaginationInputProps> = ({ ...rest }) => <ElPaginationInput {...rest} />

export const PaginationButton: FC<PaginationButtonProps> = ({ children, ...rest }) => (
  <ElPaginationButton type="button" {...rest}>
    {children}
  </ElPaginationButton>
)

export const Pagination: FC<PaginationProps> = ({
  callback,
  currentPage,
  numberPages,
  hasStartButton,
  hasEndButton,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>(String(currentPage))

  useEffect(handlePageInputChange(numberPages, currentPage, inputValue, callback), [
    inputValue,
    currentPage,
    numberPages,
  ])

  const nextPage = currentPage < numberPages ? currentPage + 1 : null
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  return (
    <PaginationWrap {...rest}>
      <PaginationButton
        role="button"
        aria-label="Previous"
        data-testid="back-button"
        onClick={handlePageChange(prevPage, callback, setInputValue)}
      >
        <Icon icon="chevronLeft" className={cx(prevPage && elPaginationPrimary)} />
      </PaginationButton>
      {hasStartButton && (
        <PaginationButton
          role="button"
          aria-label="Previous"
          data-testid="back-button"
          onClick={handlePageChange(1, callback, setInputValue)}
        >
          <Icon icon="chevronLeft" className={cx(currentPage !== 1 && elPaginationPrimary)} />
          <Icon icon="chevronLeft" className={cx(currentPage !== 1 && elPaginationPrimary)} />
        </PaginationButton>
      )}
      <PaginationText>
        <PaginationInput
          onChange={handlePageInput(setInputValue, numberPages)}
          aria-label={`Current page number, edit to select page of ${numberPages} available`}
          value={inputValue}
        />{' '}
        of {numberPages}
      </PaginationText>
      {hasEndButton && (
        <PaginationButton
          role="button"
          aria-label="Next"
          data-testid="back-button"
          onClick={handlePageChange(numberPages, callback, setInputValue)}
        >
          <Icon icon="chevronRight" className={cx(currentPage !== numberPages && elPaginationPrimary)} />
          <Icon icon="chevronRight" className={cx(currentPage !== numberPages && elPaginationPrimary)} />
        </PaginationButton>
      )}
      <PaginationButton
        role="button"
        aria-label="Next"
        data-testid="forward-button"
        onClick={handlePageChange(nextPage, callback, setInputValue)}
      >
        <Icon icon="chevronRight" className={cx(nextPage && elPaginationPrimary)} />
      </PaginationButton>
    </PaginationWrap>
  )
}
