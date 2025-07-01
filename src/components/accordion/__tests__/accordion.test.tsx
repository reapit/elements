import { Accordion } from '../accordion'
import { render, screen } from '@testing-library/react'

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
