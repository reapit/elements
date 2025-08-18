import { FolderTabs } from '../folder-tabs'
import { render, screen } from '@testing-library/react'
import { FolderTab } from '../tab'
import { FolderTabCountLabel } from '../count-label'

test('renders a navigation element with a child group', () => {
  render(<FolderTabs>Tabs</FolderTabs>)
  expect(screen.getByRole('navigation')).toBeVisible()
  expect(screen.getByRole('group')).toBeVisible()
  expect(screen.getByRole('navigation').firstElementChild).toBe(screen.getByRole('group'))
})

test('displays provided content', () => {
  render(<FolderTabs>Tabs</FolderTabs>)
  expect(screen.getByText('Tabs')).toBeVisible()
})

test('forwards additional props to the navigation element', () => {
  render(<FolderTabs data-testid="test-id">Tabs</FolderTabs>)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('navigation'))
})

test('provides `FolderTabs.Item` subcomponent', () => {
  expect(FolderTabs.Item).toBe(FolderTab)
})

test('provides `FolderTabs.CountLabel` subcomponent', () => {
  expect(FolderTabs.CountLabel).toBe(FolderTabCountLabel)
})
