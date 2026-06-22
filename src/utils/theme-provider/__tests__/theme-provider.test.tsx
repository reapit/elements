import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../theme-provider'
import { useTheme } from '../use-theme'

vi.mock('../use-theme')

test('calls useTheme with the provided theme', () => {
  render(<ThemeProvider theme="reapit">Fake child</ThemeProvider>)
  expect(useTheme).toHaveBeenCalledWith('reapit')
})

test('renders supplied children', () => {
  render(<ThemeProvider theme="reapit">Fake child</ThemeProvider>)
  expect(screen.getByText('Fake child')).toBeVisible()
})
