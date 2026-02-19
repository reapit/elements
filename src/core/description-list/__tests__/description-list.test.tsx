import { render, screen } from '@testing-library/react'
import { DescriptionList } from '../description-list'

test('renders a description list with accessible role', () => {
  const { container } = render(
    <DescriptionList>
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
    </DescriptionList>,
  )

  const element = container.firstElementChild
  expect(element?.tagName).toBe('DL')
  expect(element).toBeVisible()
})

test('renders child items with their labels and descriptions', () => {
  render(
    <DescriptionList>
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
      <DescriptionList.Item label="Email">john@example.com</DescriptionList.Item>
    </DescriptionList>,
  )

  expect(screen.getByText('Name')).toBeVisible()
  expect(screen.getByText('John Smith')).toBeVisible()
  expect(screen.getByText('Email')).toBeVisible()
  expect(screen.getByText('john@example.com')).toBeVisible()
})

test('does not set grid by default', () => {
  const { container } = render(
    <DescriptionList>
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
    </DescriptionList>,
  )

  const element = container.firstElementChild as HTMLElement
  expect(element.style.grid).toBe('')
})

test('applies grid when grid prop is provided', () => {
  const { container } = render(
    <DescriptionList grid="auto 1fr">
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
    </DescriptionList>,
  )

  const element = container.firstElementChild as HTMLElement
  expect(element.style.grid).toBe('auto 1fr')
})

test('applies custom className', () => {
  const { container } = render(
    <DescriptionList className="custom-class">
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
    </DescriptionList>,
  )

  const element = container.firstElementChild
  expect(element).toHaveClass('custom-class')
})

test('merges custom styles with grid styles', () => {
  const { container } = render(
    <DescriptionList grid="auto 1fr" style={{ padding: '10px' }}>
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
    </DescriptionList>,
  )

  const element = container.firstElementChild as HTMLElement
  expect(element.style.grid).toBe('auto 1fr')
  expect(element.style.padding).toBe('10px')
})

test('does not set gap by default', () => {
  const { container } = render(
    <DescriptionList>
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
    </DescriptionList>,
  )

  const element = container.firstElementChild as HTMLElement
  expect(element.style.gap).toBe('')
})

test('applies gap when gap prop is provided via style', () => {
  const { container } = render(
    <DescriptionList style={{ gap: 'var(--spacing-2)' }}>
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
    </DescriptionList>,
  )

  const element = container.firstElementChild as HTMLElement
  expect(element.style.gap).toBe('var(--spacing-2)')
})

test('applies gap when gap prop is provided', () => {
  const { container } = render(
    <DescriptionList gap="var(--spacing-4)">
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
    </DescriptionList>,
  )

  const element = container.firstElementChild as HTMLElement
  expect(element.style.gap).toBe('var(--spacing-4)')
})

test('provides layout and size to child items via context', () => {
  const { container } = render(
    <DescriptionList layout="tabular" size="sm">
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
    </DescriptionList>,
  )

  const item = container.querySelector('[data-layout]')
  expect(item).toHaveAttribute('data-layout', 'tabular')
  expect(item).toHaveAttribute('data-size', 'sm')
})

test('forwards additional HTML attributes', () => {
  const { container } = render(
    <DescriptionList id="custom-id" aria-label="Contact details">
      <DescriptionList.Item label="Name">John Smith</DescriptionList.Item>
    </DescriptionList>,
  )

  const element = container.firstElementChild
  expect(element).toHaveAttribute('id', 'custom-id')
  expect(element).toHaveAttribute('aria-label', 'Contact details')
})

test('exposes DescriptionList.Item', () => {
  expect(DescriptionList.Item).toBeDefined()
})

test('exposes DescriptionList.Context', () => {
  expect(DescriptionList.Context).toBeDefined()
})

test('exposes DescriptionList.useContext', () => {
  expect(DescriptionList.useContext).toBeDefined()
})
