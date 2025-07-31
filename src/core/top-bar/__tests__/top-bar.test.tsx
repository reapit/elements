import { render, screen } from '@testing-library/react'
import { TopBar } from '..'

test('renders as a banner element', () => {
  render(<TopBar logo="Logo" />)
  expect(screen.getByRole('banner')).toBeVisible()
})

test('displays logo', () => {
  render(<TopBar logo="Logo" />)
  expect(screen.getByText('Logo')).toBeVisible()
})

test('displays app switcher when provided', () => {
  render(<TopBar appSwitcher="App switcher" logo="Logo" />)
  expect(screen.getByText('App switcher')).toBeVisible()
})

test('displays avatar when provided', () => {
  render(<TopBar avatar="Profile" logo="Logo" />)
  expect(screen.getByText('Profile')).toBeVisible()
})

test('displays main nav when provided', () => {
  render(<TopBar logo="Logo" mainNav="Main nav" />)
  expect(screen.getByText('Main nav')).toBeVisible()
})

test('displays mobile nav when provided', () => {
  render(<TopBar logo="Logo" menu="Mobile nav" />)
  expect(screen.getByText('Mobile nav')).toBeVisible()
})

test('displays search when provided', () => {
  render(<TopBar logo="Logo" search="Search" />)
  expect(screen.getByText('Search')).toBeVisible()
})

test('displays secondary nav when provided', () => {
  render(<TopBar logo="Logo" secondaryNav="Secondary nav" />)
  expect(screen.getByText('Secondary nav')).toBeVisible()
})
