import { AtAGlanceCardLabel } from '../label'
import { AtAGlanceCardContext } from '../../context'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

test('renders an h1 element when as="article"', () => {
  render(<AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>, {
    wrapper: (props) => <Wrapper {...props} as="article" />,
  })
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Label')
})

test('renders a span element when as="a"', () => {
  render(<AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>, {
    wrapper: (props) => <Wrapper {...props} as="a" />,
  })
  const label = screen.getByText('Test Label')
  expect(label.tagName).toBe('SPAN')
})

test('renders a span element when as="button"', () => {
  render(<AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>, {
    wrapper: (props) => <Wrapper {...props} as="button" />,
  })
  const label = screen.getByText('Test Label')
  expect(label.tagName).toBe('SPAN')
})

test('forwards additional props to the element', () => {
  render(<AtAGlanceCardLabel data-testid="custom-label">Test Label</AtAGlanceCardLabel>, {
    wrapper: (props) => <Wrapper {...props} as="article" />,
  })
  expect(screen.getByTestId('custom-label')).toBeVisible()
})

test('applies custom className', () => {
  render(<AtAGlanceCardLabel className="custom-class">Test Label</AtAGlanceCardLabel>, {
    wrapper: (props) => <Wrapper {...props} as="article" />,
  })
  expect(screen.getByText('Test Label')).toHaveClass('custom-class')
})

test('throws error when rendered outside context', () => {
  expect(() => {
    render(<AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>)
  }).toThrow('useAtAGlanceCardContext requires an AtAGlance.Card ancestor')
})

interface WrapperProps {
  children: ReactNode
  as: AtAGlanceCardContext.Value['as']
}

function Wrapper({ children, as }: WrapperProps) {
  return <AtAGlanceCardContext.Provider value={{ as }}>{children}</AtAGlanceCardContext.Provider>
}
