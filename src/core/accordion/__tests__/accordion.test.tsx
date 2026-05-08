import { Accordion } from '../accordion'
import { fireEvent, render, screen } from '@testing-library/react'

test('renders a <details> element', () => {
  render(<Accordion summary={<Accordion.Summary>Title</Accordion.Summary>}>Content</Accordion>)
  const group = screen.getByRole('group')

  expect(group.tagName).toBe('DETAILS')
  expect(group).toBeInTheDocument()
})

test("the accordion title is the accordion's accessible name", () => {
  render(<Accordion summary={<Accordion.Summary>Title</Accordion.Summary>}>Content</Accordion>)
  const group = screen.getByRole('group', { name: 'Title' })
  expect(group).toBeInTheDocument()
})

test('content is visible when the accordion is open', async () => {
  render(
    <Accordion open summary={<Accordion.Summary>Title</Accordion.Summary>}>
      Content
    </Accordion>,
  )
  expect(screen.getByRole('group', { name: 'Title' })).toBeVisible()
  expect(screen.getByText('Content')).toBeVisible()
})

test('renders children when closed by default (keepMounted defaults to true)', () => {
  render(
    <Accordion summary={<Accordion.Summary>Title</Accordion.Summary>}>
      <p>Accordion content</p>
    </Accordion>,
  )
  expect(screen.getByText('Accordion content')).toBeDefined()
})

test('does not render children when closed with keepMounted={false}', () => {
  render(
    <Accordion keepMounted={false} summary={<Accordion.Summary>Title</Accordion.Summary>}>
      <p>Accordion content</p>
    </Accordion>,
  )
  expect(screen.queryByText('Accordion content')).toBeNull()
})

test('renders children after opening when keepMounted is false', () => {
  render(
    <Accordion keepMounted={false} summary={<Accordion.Summary>Title</Accordion.Summary>}>
      <p>Accordion content</p>
    </Accordion>,
  )

  // Click the summary to open the accordion
  fireEvent.click(screen.getByText('Title'))

  expect(screen.getByText('Accordion content')).toBeDefined()
})
