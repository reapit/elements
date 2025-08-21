import { useState, FC, ChangeEvent, InputHTMLAttributes } from 'react'
import { ELSearchInput, ELInput } from './styles'
import { SearchIcon } from '#src/icons/search'
import { CloseIcon } from '#src/icons/close'
import { Button } from '#src/core/button'

/**
 * Props for the SearchInput component.
 *
 * @prop {'small' | 'medium' | 'large'} [inputSize="medium"]
 *   Controls the size of the search input.
 *
 * @prop {(value: string) => void} [onSearch]
 *   Callback fired whenever the input value changes
 *   or when the clear button is pressed.
 *
 * @prop {boolean} [isDisabled=false]
 *   If true, the input will be disabled and changes will be ignored.
 */
export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'small' | 'medium' | 'large'
  onSearch?: (value: string) => void
  isDisabled?: boolean
}

/**
 * A controlled search input component with:
 * - A leading search icon (visible when the field is empty).
 * - A clear button (visible when the field has a value).
 * - Support for custom sizes and disabled state.
 */
export const SearchInput: FC<SearchInputProps> = ({ inputSize = 'medium', onSearch, isDisabled = false, ...rest }) => {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    setValue(event.target.value)
    if (onSearch) onSearch(event.target.value)
    if (rest.onChange) rest.onChange(event)
  }

  const handleClear = () => {
    setValue('')
    if (onSearch) onSearch('')
  }

  return (
    <ELSearchInput data-size={inputSize} aria-disabled={isDisabled}>
      {!value && <SearchIcon size="sm" color="primary" />}
      <ELInput
        value={value}
        onChange={handleChange}
        placeholder={rest.placeholder || 'Search'}
        name="search-input"
        disabled={isDisabled}
        {...rest}
      />
      {value && (
        <Button iconLeft={<CloseIcon color="primary" />} size="small" variant="tertiary" onClick={handleClear} />
      )}
    </ELSearchInput>
  )
}
