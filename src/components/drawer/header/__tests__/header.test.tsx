import { render, screen } from '@testing-library/react'
import { DrawerHeader } from '../header'
import { DrawerContextProvider } from '../../context'

import type { ReactNode } from 'react'

test('renders a header element with the expected content', () => {
  render(<DrawerHeader>Test Title</DrawerHeader>, { wrapper })
  expect(screen.getByText('Test Title')).toBeVisible()
})

test('renders overline when provided', () => {
  render(<DrawerHeader overline="Test Overline">Test Title</DrawerHeader>, { wrapper })
  expect(screen.getByText('Test Overline')).toBeVisible()
})

test('renders supplementary info when provided', () => {
  render(<DrawerHeader supplementaryInfo="Test Info">Test Title</DrawerHeader>, { wrapper })
  expect(screen.getByText('Test Info')).toBeVisible()
})

test('renders tabs when provided', () => {
  render(<DrawerHeader tabs="Test Tabs">Test Title</DrawerHeader>, { wrapper })
  expect(screen.getByText('Test Tabs')).toBeVisible()
})

test('renders action when provided', () => {
  render(<DrawerHeader action="Test Action">Test Title</DrawerHeader>, { wrapper })
  expect(screen.getByText('Test Action')).toBeVisible()
})

test('forwards additional props to the header element', () => {
  render(<DrawerHeader data-testid="test-id">Test Title</DrawerHeader>, { wrapper })
  expect(screen.getByTestId('test-id')).toBeVisible()
})

function wrapper({ children }: { children: ReactNode }) {
  return (
    <DrawerContextProvider dialogRef={{ current: null }} titleId="test-title-id">
      {children}
    </DrawerContextProvider>
  )
}
