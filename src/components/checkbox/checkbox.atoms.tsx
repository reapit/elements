import {
  FC,
  ReactNode,
  LabelHTMLAttributes,
  InputHTMLAttributes,
  SVGProps,
  forwardRef,
  Ref,
  HTMLAttributes,
} from 'react'
import { LabelText } from '../label-text'

// Interface for the ElCheckbox component props.
interface ElCheckboxProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Optional className to apply custom styles to the checkbox label.
   * This allows for external styling of the checkbox component.
   */
  className?: string
  /**
   * The content to be displayed within the checkbox label.
   * This is typically the checkbox input, label text, and any supplementary information.
   * ReactNode allows for flexibility in the type of content passed.
   */
  children: ReactNode
}

// Interface for the ElCheckboxInput component props.
interface ElCheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {}

// Interface for the ElCheckboxIcon component props.
interface ElCheckboxIconProps extends SVGProps<SVGSVGElement> {}

// Interface for the ElCheckboxLabelText component props.
interface ElCheckboxLabelTextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'soft' | 'strong'
  size?: 'small' | 'medium'
  required?: boolean
}

// Interface for the ElCheckboxSupplementaryInfo component props.
interface ElCheckboxSupplementaryInfoProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'soft' | 'strong'
  size?: 'small' | 'medium'
}

// ElCheckbox component: A styled label that wraps the checkbox input and label text.
export const ElCheckbox: FC<ElCheckboxProps> = ({ className, children, ...rest }) => {
  return (
    <label className={`el-checkbox-label ${className || ''}`} {...rest}>
      {children}
    </label>
  )
}

/**
 * ElCheckboxInput component: A styled checkbox input.
 * Uses forwardRef to allow access to the underlying input element's ref
 */
export const ElCheckboxInput = forwardRef<HTMLInputElement, ElCheckboxInputProps>(
  (props: ElCheckboxInputProps, ref: Ref<HTMLInputElement>) => {
    return <input className="el-checkbox-input" type="checkbox" ref={ref} {...props} />
  },
)

// ElCheckboxIcon component: A basic checkbox icon (unchecked state).
export const ElCheckboxIcon: FC<ElCheckboxIconProps> = (props) => {
  return (
    <svg className="el-checkbox-icon" {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20,2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2Zm0,18H4V4H20Z"
      />
    </svg>
  )
}

// ElCheckboxSelectedIcon component: A checkbox icon for the checked state.
export const ElCheckboxSelectedIcon: FC<ElCheckboxIconProps> = (props) => {
  return (
    <svg className="el-checkbox-selected-icon" {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20,2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2ZM18,9.17l-7.07,7.07a1,1,0,0,1-.71.3,1,1,0,0,1-.7-.3L6,12.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0l2.83,2.83L16.6,7.76A1,1,0,0,1,18,9.17Z"
      />
    </svg>
  )
}

// ElCheckboxIndeterminateIcon component: A checkbox icon for the indeterminate state.
export const ElCheckboxIndeterminateIcon: FC<ElCheckboxIconProps> = (props) => {
  return (
    <svg className="el-checkbox-indeterminate-icon" {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20,2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2Zm0,18H4V4H20Z"
      />
      <path fill="currentColor" d="M8,13h8a1,1,0,0,0,0-2H8a1,1,0,0,0,0,2Z" />
    </svg>
  )
}

// ElCheckboxLabelText component: A styled span for the checkbox label text.
export const ElCheckboxLabelText: FC<ElCheckboxLabelTextProps> = (props) => {
  return (
    <LabelText className="el-label-text el-checkbox-label-text" isRequired={props.required ? true : false} {...props} />
  )
}

// ElCheckboxSupplementaryInfo component: A styled span for supplementary info related to the checkbox.
export const ElCheckboxSupplementaryInfo: FC<ElCheckboxSupplementaryInfoProps> = (props) => {
  return <LabelText className="el-label-text el-checkbox-supplementary-info" {...props} />
}
