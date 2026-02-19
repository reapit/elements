import { DescriptionList } from '../../description-list'
import { render, screen } from '@testing-library/react'

test('renders a div element', () => {
  render(
    <DescriptionList.Item data-testid="item" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: Wrapper },
  )
  expect(screen.getByTestId('item')).toBeVisible()
  const item = screen.getByTestId('item')
  expect(item.tagName).toBe('DIV')
})

test('renders label and description', () => {
  render(<DescriptionList.Item label="Label">Description</DescriptionList.Item>, { wrapper: Wrapper })

  const term = screen.getByRole('term')
  const definition = screen.getByRole('definition')

  expect(term).toBeVisible()
  expect(term).toHaveTextContent('Label')
  expect(definition).toBeVisible()
  expect(definition).toHaveTextContent('Description')
})

test('renders <dt> before <dd> in DOM order', () => {
  const { container } = render(<DescriptionList.Item label="Label">Description</DescriptionList.Item>, {
    wrapper: Wrapper,
  })
  const dl = container.querySelector('dl')
  const item = dl?.querySelector('div')
  const children = Array.from(item?.children || [])
  expect(children[0]?.tagName).toBe('DT')
  expect(children[1]?.tagName).toBe('DD')
})

test('applies layout="stacked" by default when context layout is not provided', () => {
  render(
    <DescriptionList.Item data-testid="item" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: Wrapper },
  )
  expect(screen.getByTestId('item')).toHaveAttribute('data-layout', 'stacked')
})

test('inherits layout="tabular" from context', () => {
  render(
    <DescriptionList.Item data-testid="item" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: (props) => <Wrapper {...props} layout="tabular" /> },
  )
  expect(screen.getByTestId('item')).toHaveAttribute('data-layout', 'tabular')
})

test('inherits layout="inline" from context', () => {
  render(
    <DescriptionList.Item data-testid="item" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: (props) => <Wrapper {...props} layout="inline" /> },
  )
  expect(screen.getByTestId('item')).toHaveAttribute('data-layout', 'inline')
})

test('overrides context layout with local layout prop', () => {
  render(
    <DescriptionList.Item data-testid="item" layout="inline" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: (props) => <Wrapper {...props} layout="tabular" /> },
  )
  expect(screen.getByTestId('item')).toHaveAttribute('data-layout', 'inline')
})

test('applies size="base" by default when context size is not provided', () => {
  render(
    <DescriptionList.Item data-testid="item" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: Wrapper },
  )
  expect(screen.getByTestId('item')).toHaveAttribute('data-size', 'base')
})

test('applies size="sm" when specified directly', () => {
  render(
    <DescriptionList.Item data-testid="item" size="sm" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: Wrapper },
  )
  expect(screen.getByTestId('item')).toHaveAttribute('data-size', 'sm')
})

test('inherits size="sm" from context', () => {
  render(
    <DescriptionList.Item data-testid="item" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: (props) => <Wrapper {...props} size="sm" /> },
  )
  expect(screen.getByTestId('item')).toHaveAttribute('data-size', 'sm')
})

test('overrides context size with local size prop', () => {
  render(
    <DescriptionList.Item data-testid="item" size="sm" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: (props) => <Wrapper {...props} size="base" /> },
  )
  expect(screen.getByTestId('item')).toHaveAttribute('data-size', 'sm')
})

test('applies area prop as gridArea style', () => {
  render(
    <DescriptionList.Item data-testid="item" area="auto / span 2" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: Wrapper },
  )
  const item = screen.getByTestId('item')
  expect(item.style.gridArea).toBe('auto / span 2')
})

test('forwards additional props to the underlying element', () => {
  render(
    <DescriptionList.Item data-testid="my-item" className="custom-class" label="Label">
      Description
    </DescriptionList.Item>,
    { wrapper: Wrapper },
  )
  expect(screen.getByTestId('my-item')).toHaveClass('custom-class')
})

test('throws error when rendered outside DescriptionList context', () => {
  expect(() => {
    render(<DescriptionList.Item label="Test">Content</DescriptionList.Item>)
  }).toThrow('useDescriptionListContext requires a DescriptionList ancestor')
})

interface WrapperProps {
  children: React.ReactNode
  layout?: 'stacked' | 'tabular' | 'inline'
  size?: 'base' | 'sm'
}

function Wrapper({ children, layout, size }: WrapperProps) {
  return (
    <DescriptionList layout={layout} size={size}>
      {children}
    </DescriptionList>
  )
}
