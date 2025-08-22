import { useState, FC, ChangeEvent, InputHTMLAttributes } from 'react'
import { ElSearchInput, ElInput } from './styles'
import { SearchIcon } from '#src/icons/search'
import { CloseIcon } from '#src/icons/close'
import { Button } from '#src/core/button'

/**
 * Props for the SearchInput component.
 */
export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Controls the size of the search input.
   * @default "medium"
   */
  inputSize?: 'small' | 'medium' | 'large'
  /**
   * Callback fired whenever the input value changes
   * or when the clear button is pressed.
   */
  onSearch?: (value: string) => void
  /**
   * If `true`, the input will be disabled and changes will be ignored.
   * @default false
   */
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
    setValue(event.target.value)
    if (onSearch) onSearch(event.target.value)
    if (rest.onChange) rest.onChange(event)
  }

  const handleClear = () => {
    setValue('')
    if (onSearch) onSearch('')
  }

  return (
    <ElSearchInput data-size={inputSize} aria-disabled={isDisabled}>
      {!value && <SearchIcon size="sm" color="primary" />}
      <ElInput
        value={value}
        onChange={handleChange}
        placeholder={rest.placeholder || 'Search'}
        name="search-input"
        disabled={isDisabled}
        type="search"
        {...rest}
      />
      {value && (
        <Button iconLeft={<CloseIcon color="primary" />} size="small" variant="tertiary" onClick={handleClear} />
      )}
    </ElSearchInput>
  )
}
