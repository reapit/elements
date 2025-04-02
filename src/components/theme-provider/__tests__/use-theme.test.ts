import { expect, test } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTheme } from '../use-theme'

import type { Theme } from '#src/tokens/types'

test('can use the Reapit theme', () => {
  renderHook(() => useTheme('reapit'))
  expect(globalThis.document.documentElement).toHaveAttribute('data-theme', 'reapit')
})

test('can use the PayProp theme', () => {
  renderHook(() => useTheme('payprop'))
  expect(globalThis.document.documentElement).toHaveAttribute('data-theme', 'payprop')
})

test('can change themes', () => {
  const { rerender } = renderHook((theme: Theme) => useTheme(theme), { initialProps: 'reapit' })
  rerender('payprop')
  expect(globalThis.document.documentElement).toHaveAttribute('data-theme', 'payprop')
})
