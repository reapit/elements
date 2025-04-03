import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { Checkbox } from '..'

describe('CheckboxGroup', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<Checkbox />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with Checkbox with Label', () => {
    const { asFragment } = render(<Checkbox label="Label" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with Checkbox with Label and Suppliemntary text', () => {
    const { asFragment } = render(<Checkbox label="Label" supplementaryInfo="Supplementary Info" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with required Checkbox', () => {
    const { asFragment } = render(<Checkbox label="Label" required supplementaryInfo="Supplementary Info" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with indeterminate Checkbox', () => {
    const { asFragment } = render(<Checkbox isIndeterminate label="Label" supplementaryInfo="Supplementary Info" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with disabled Checkbox', () => {
    const { asFragment } = render(<Checkbox disabled label="Label" supplementaryInfo="Supplementary Info" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
