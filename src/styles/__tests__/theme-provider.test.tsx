import { render } from '@testing-library/react'
import { DeprecatedElementsThemeProvider as ElementsThemeProvider, toKebabCase } from '../deprecated-theme-provider'

describe('ElementsThemeProvider component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <ElementsThemeProvider
        theme={{
          intentPrimary: '#ffa000',
          intentPrimaryDark: '#ad6c00',
          fontSizeSmall: '0.875rem',
        }}
      >
        <div>Children</div>
      </ElementsThemeProvider>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('toKebabCase', () => {
  it('should convert camelCase to kebab-case', () => {
    const input = 'camelCase'
    const output = toKebabCase(input)
    expect(output).toBe('camel-case')
  })

  it('should convert PascalCase to kebab-case', () => {
    const input = 'PascalCase'
    const output = toKebabCase(input)
    expect(output).toBe('pascal-case')
  })

  it('should insert hyphen before group of numbers', () => {
    const input = 'group123OfNumbers'
    const output = toKebabCase(input)
    expect(output).toBe('group-123-of-numbers')
  })

  it('should handle empty strings', () => {
    const input = ''
    const output = toKebabCase(input)
    expect(output).toBe('')
  })
})
