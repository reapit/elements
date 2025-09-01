import { isTerminalPage } from '../is-terminal-page'
import { getARIALabel } from '../get-aria-label'
import { getLinkProps } from '../get-link-props'

vi.mock('../is-terminal-page')
vi.mock('../get-aria-label')

vi.mocked(isTerminalPage).mockReturnValue(false)
vi.mocked(getARIALabel).mockReturnValue('foo')

test('returns aria-disabled and aria-label props', () => {
  expect(getLinkProps('next-page', 5, 10)).toEqual(
    expect.objectContaining({
      'aria-disabled': expect.any(Boolean),
      'aria-label': expect.any(String),
    }),
  )
})

test('calls `getARIALabel`', () => {
  getLinkProps('next-page', 5, 10)
  expect(getARIALabel).toHaveBeenCalledWith('next-page', 5, 10)
})

test('calls `isTerminalPage`', () => {
  getLinkProps('next-page', 5, 10)
  expect(isTerminalPage).toHaveBeenCalledWith('next-page', 5, 10)
})

test('passes through the variant', () => {
  expect(getLinkProps('next-page', 5, 10)).toEqual(expect.objectContaining({ variant: 'next-page' }))
  expect(getLinkProps('previous-page', 5, 10)).toEqual(expect.objectContaining({ variant: 'previous-page' }))
})
