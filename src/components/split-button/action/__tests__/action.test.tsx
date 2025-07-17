import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../action.stories'

const AnchorActionStories = composeStories(stories)

test('renders a button element', () => {
  render(<AnchorActionStories.Example />)
  expect(screen.getByRole('button')).toBeVisible()
})
