import React, {
  ChangeEvent,
  Dispatch,
  FC,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LegacyRef,
  RefAttributes,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { cx } from '@linaria/core'
import {
  ElMultiSelectCheckbox,
  ElMultiSelect,
  ElMultiSelectLabel,
  ElMultiSelectInput,
  elHasGreyChips,
  ElMultiSelectSelected,
  ElMultiSelectUnSelected,
  ElMultiSelectInputWrapper,
} from './__styles__/index'
import { useId } from '../../storybook/random-id'
import { DeprecatedIcon } from '../icon'
import { elMl2 } from '../../styles/deprecated-spacing'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'

/** @deprecated */
export interface MultiSelectProps extends HTMLAttributes<HTMLDivElement> {}

/** @deprecated */
export interface MultiSelectOption {
  value: string
  name: string
}

/** @deprecated */
export interface MultiSelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  options: MultiSelectOption[]
  defaultValues?: string[]
  noneSelectedLabel?: string
}

/** @deprecated */
export type MultiSelectInputWrapped = React.ForwardRefExoticComponent<
  MultiSelectInputProps & RefAttributes<InputHTMLAttributes<HTMLInputElement>>
>

/** @deprecated */
export interface MultiSelectChipProps extends InputHTMLAttributes<HTMLInputElement> {}

const setNativeInputValue = (element: HTMLElement, value: string[], testFunc?: (value: string[]) => void) => {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set
  const prototype = Object.getPrototypeOf(element)
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter?.call(element, value)
  } else {
    valueSetter?.call(element, value)
    if (testFunc) testFunc(value)
  }
}

/** @deprecated */
export const handleSetNativeInput =
  (id: string, selectedOptionValues: string[], testFunc?: (value: string[]) => void) => () => {
    const input = document.getElementById(id)

    if (input) {
      setNativeInputValue(input, selectedOptionValues, testFunc)
      const changeEvent = new Event('change', { bubbles: true })
      input.dispatchEvent(changeEvent)
    }
  }

/** @deprecated */
export const handleResetDefaultValues =
  (
    setSelectedOptionValues: Dispatch<SetStateAction<string[]>>,
    setSelectedDefaultValues: Dispatch<SetStateAction<string[]>>,
    defaultValues?: string[],
    selectedDefaultValues?: string[],
  ) =>
  () => {
    if (defaultValues && JSON.stringify(defaultValues) !== JSON.stringify(selectedDefaultValues)) {
      setSelectedOptionValues(defaultValues)
      setSelectedDefaultValues(defaultValues)
    }
  }

/** @deprecated */
export const handleSelectedOptions =
  (value: string, selectedOptionValues: string[], setSelectedOptionValues: Dispatch<SetStateAction<string[]>>) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    const newSelected = isChecked
      ? [...selectedOptionValues, value]
      : selectedOptionValues.filter((option) => option !== value)

    setSelectedOptionValues(newSelected)
  }

/** @deprecated */
export const handleSelectedKeyboardOptions =
  (
    value: string,
    selectedOptionValues: string[],
    setSelectedOptionValues: Dispatch<SetStateAction<string[]>>,
    isChecked: boolean,
  ) =>
  () => {
    const newSelected = !isChecked
      ? [...selectedOptionValues, value]
      : selectedOptionValues.filter((option) => option !== value)

    setSelectedOptionValues(newSelected)
  }

/** @deprecated */
export const MultiSelectChip: FC<MultiSelectChipProps> = ({
  className,
  children,
  onKeyDown,
  tabIndex,
  id,
  ...rest
}) => {
  const chipId = useId(id)
  return (
    <>
      <ElMultiSelectCheckbox id={id ?? chipId} type="checkbox" aria-hidden={true} {...rest} />
      <ElMultiSelectLabel
        htmlFor={id ?? chipId}
        role="option"
        tabIndex={tabIndex}
        className={cx(className)}
        onKeyDown={onKeyDown as () => void}
      >
        {children}
      </ElMultiSelectLabel>
    </>
  )
}

/** @deprecated */
export const MultiSelect: FC<MultiSelectProps> = ({ className, children, ...rest }) => (
  <ElMultiSelect className={cx(className)} {...rest}>
    {children}
  </ElMultiSelect>
)

/** @deprecated */
export const MultiSelectSelected: FC<MultiSelectProps> = ({ className, children, ...rest }) => (
  <ElMultiSelectSelected className={cx(className)} {...rest}>
    {children}
  </ElMultiSelectSelected>
)

/** @deprecated */
export const MultiSelectUnSelected: FC<MultiSelectProps> = ({ className, children, ...rest }) => (
  <ElMultiSelectUnSelected className={cx(className)} {...rest}>
    {children}
  </ElMultiSelectUnSelected>
)

/** This looks like I have had a bit of a meltdown but promise it makes sense!
 * I want the component to behave like an input ie accept refs and onChange handlers and respond as a standard
 * input would. To do this, I have a hidden input apply all the input props to (onChange included) and I forward
 * any refs to this input. Intutitively I should be able to update the value of the input from the component state
 * however, this does not trigger on change. As such, I have to treat the input as a native element, get the
 * global setter and call it on the input with the value. I then dispatch a real DOM change event and that triggers
 * the React handler, which hands back to my form lib or similar. It's adapted from this suggested workaround below:
 *  https://github.com/facebook/react/issues/11095#issuecomment-334305739  */
/** @deprecated */
export const MultiSelectInput: MultiSelectInputWrapped = forwardRef(
  (
    { className, options, defaultValues, noneSelectedLabel, id, ...rest },
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const [selectedOptionValues, setSelectedOptionValues] = useState<string[]>(defaultValues ?? [])
    const [selectedDefaultValues, setSelectedDefaultValues] = useState<string[]>(defaultValues ?? [])

    useEffect(handleSetNativeInput(id, selectedOptionValues), [selectedOptionValues])

    useEffect(
      handleResetDefaultValues(setSelectedOptionValues, setSelectedDefaultValues, defaultValues, selectedDefaultValues),
      [defaultValues],
    )

    return (
      <ElMultiSelectInputWrapper>
        <ElMultiSelectInput id={id} {...rest} ref={ref as unknown as LegacyRef<HTMLInputElement>} />
        <MultiSelectSelected className={className} role="listbox" aria-label="Multi selected options">
          {selectedOptionValues.length ? (
            options.map((option) => {
              return selectedOptionValues.includes(option.value) ? (
                <MultiSelectChip
                  id={`multi-select-chip-${option.value}`}
                  role="option"
                  tabIndex={0}
                  aria-checked={true}
                  onChange={handleSelectedOptions(option.value, selectedOptionValues, setSelectedOptionValues)}
                  onKeyDown={handleKeyboardEvent(
                    'Enter',
                    handleSelectedKeyboardOptions(option.value, selectedOptionValues, setSelectedOptionValues, true),
                  )}
                  key={option.value}
                  defaultChecked
                >
                  {option.name}
                </MultiSelectChip>
              ) : null
            })
          ) : (
            <>
              <DeprecatedIcon className={elMl2} icon="task" intent="default" />
              <p>{noneSelectedLabel ? noneSelectedLabel : 'Please select from the options below'}</p>
            </>
          )}
        </MultiSelectSelected>
        {selectedOptionValues.length < options.length && (
          <MultiSelectUnSelected className={className} role="listbox" aria-label="Multi unselected options">
            {options.map((option) => {
              return !selectedOptionValues.includes(option.value) ? (
                <MultiSelectChip
                  role="option"
                  tabIndex={0}
                  aria-checked={false}
                  className={elHasGreyChips}
                  onChange={handleSelectedOptions(option.value, selectedOptionValues, setSelectedOptionValues)}
                  onKeyDown={handleKeyboardEvent(
                    'Enter',
                    handleSelectedKeyboardOptions(option.value, selectedOptionValues, setSelectedOptionValues, false),
                  )}
                  key={option.value}
                  defaultChecked={false}
                >
                  {option.name}
                </MultiSelectChip>
              ) : null
            })}
          </MultiSelectUnSelected>
        )}
      </ElMultiSelectInputWrapper>
    )
  },
)
