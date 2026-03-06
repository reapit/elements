import { AtAGlanceCardValue } from '../value'
import { AtAGlanceCardContext } from '../../context'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

test('renders a p element when as="article"', () => {
  render(<AtAGlanceCardValue>$12,345</AtAGlanceCardValue>, {
    wrapper: (props) => <Wrapper {...props} as="article" />,
  })
  const value = screen.getByText('$12,345')
  expect(value.tagName).toBe('P')
})

test('renders a span element when as="a"', () => {
  render(<AtAGlanceCardValue>$12,345</AtAGlanceCardValue>, {
    wrapper: (props) => <Wrapper {...props} as="a" />,
  })
  const value = screen.getByText('$12,345')
  expect(value.tagName).toBe('SPAN')
})

test('renders a span element when as="button"', () => {
  render(<AtAGlanceCardValue>$12,345</AtAGlanceCardValue>, {
    wrapper: (props) => <Wrapper {...props} as="button" />,
  })
  const value = screen.getByText('$12,345')
  expect(value.tagName).toBe('SPAN')
})

test('forwards additional props to the element', () => {
  render(<AtAGlanceCardValue data-testid="custom-value">$12,345</AtAGlanceCardValue>, {
    wrapper: (props) => <Wrapper {...props} as="article" />,
  })
  expect(screen.getByTestId('custom-value')).toBeVisible()
})

test('applies custom className', () => {
  render(<AtAGlanceCardValue className="custom-class">$12,345</AtAGlanceCardValue>, {
    wrapper: (props) => <Wrapper {...props} as="article" />,
  })
  expect(screen.getByText('$12,345')).toHaveClass('custom-class')
})

test('throws error when rendered outside context', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => {
    render(<AtAGlanceCardValue>$12,345</AtAGlanceCardValue>)
  }).toThrow('useAtAGlanceCardContext requires an AtAGlance.Card ancestor')

  consoleError.mockRestore()
})

interface WrapperProps {
  children: ReactNode
  as: AtAGlanceCardContext.Value['as']
}

function Wrapper({ children, as }: WrapperProps) {
  return <AtAGlanceCardContext.Provider value={{ as }}>{children}</AtAGlanceCardContext.Provider>
}
