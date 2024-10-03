import React, { Children, FC, isValidElement, ReactElement } from 'react'
import { ButtonVariant, ButtonGroupProps } from './types'
import { ElButtonGroup } from './styles'
import { Button } from '../button/button'

// Max number of button a user can have under Button Group
const maxNumberOfButtons: number = 5

export const ButtonGroup: FC<ButtonGroupProps> = ({ children, ...rest }) => {
  // Get first 5 buttons to display
  const childrenArray = Children.toArray(children).slice(0, maxNumberOfButtons)

  // Check all children are Button components
  const isValidButtonChild = (child: ReactElement) => {
    return child.type === Button
  }

  const hasInvalidChild = childrenArray.some((child) => !isValidButtonChild(child as ReactElement))

  // If there's any invalid child, display an error and return null
  if (hasInvalidChild) {
    console.error('ButtonGroup should only contain Button components as children')
    return null // Prevent rendering invalid state
  }

  // Warn user when they are trying to display more than 5 buttons.
  if (Children.toArray(children).length > maxNumberOfButtons) {
    console.warn('Button Group can contain up to 5 Buttons only.')
  }

  // Initialize counters for primary and icon-only buttons
  let primaryButtonCount = 0
  let iconOnlyButtonCount = 0
  let iconOnlyButton: ReactElement | null = null
  let primaryButton: ReactElement | null = null
  // For tracking button size for comparision
  let firstButtonSize: string | null = null

  // Iterate through the buttons and check for icon-only, primary buttons, button size and valid variant
  const hasInconsistentSizeOrVariant = childrenArray.some((child, index: number) => {
    if (isValidElement(child)) {
      // --Dev--
      // To replace the props name from intent to new a prop name variant while updating Button component
      const { children, buttonIcon, intent, buttonSize } = child.props

      // --Dev--
      // To remove below line once destructure prop variant is available
      const variant = intent

      // Identify if it's an icon-only button (has icon but no children)
      if (buttonIcon && !children) {
        iconOnlyButton = child
        iconOnlyButtonCount++
      }

      // Identify if it's a primary button
      if (variant === 'primary') {
        primaryButton = child
        primaryButtonCount++
      }

      // Identify and store the buttonSize of the first button
      if (index === 0) {
        firstButtonSize = buttonSize
      } else if (buttonSize !== firstButtonSize) {
        return true
      }

      const validVariant: ButtonVariant['type'][] = ['primary', 'secondary', 'tertiary']

      // Validate that the variant is a valid ButtonVariant type
      if (variant && !validVariant.includes(variant)) {
        console.error(`Invalid variant "${variant}" provided. Expected one of: ${validVariant.join(', ')}.`)
        return true
      }
    }
    return false
  })

  // Log an error and return null if the button sizes are inconsistent or have an invalid variant
  if (hasInconsistentSizeOrVariant) {
    console.error('All buttons in a ButtonGroup must have the same buttonSize and a valid variant.')
    return null // Prevent rendering to avoid invalid state
  }

  // Check if there's more than one primary button or icon-only button
  if (primaryButtonCount > 1) {
    console.error('Only one primary button is allowed in a ButtonGroup.')
    return null // Prevent rendering invalid state
  }

  if (iconOnlyButtonCount > 1) {
    console.error('Only one icon-only button is allowed in a ButtonGroup.')
    return null // Prevent rendering invalid state
  }

  // Warn and prevent rendering ButtonGroup if both primary and icon-only buttons are present
  if (iconOnlyButton && primaryButton) {
    console.error('A Primary Button cannot be presnet if an icon-only button is used.')
    return null // Prevent rendering to avoid invalid state
  }

  const lastButton = childrenArray[childrenArray.length - 1] as ReactElement

  if (iconOnlyButton && lastButton !== iconOnlyButton) {
    console.error('Icon-only button must be the rightmost buttons.')
    return null
  }

  if (primaryButton && lastButton !== primaryButton) {
    console.error('Primary button must be the rightmost buttons.')
    return null
  }

  const processedChildren = childrenArray.map((child, index) => {
    if (isValidElement(child)) {
      return <child.type {...(child.props || {})} className={`${child.props.className || ''}`} key={index} />
    }
    return child
  })

  return <ElButtonGroup {...rest}>{processedChildren}</ElButtonGroup>
}
