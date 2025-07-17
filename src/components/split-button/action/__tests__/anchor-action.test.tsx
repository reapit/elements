import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../action.stories'

const AnchorStories = composeStories(stories)

test('renders a link element', () => {
  render(<AnchorStories.Anchors href="https://www.google.com" />)
  expect(screen.getByRole('link')).toBeVisible()
})
