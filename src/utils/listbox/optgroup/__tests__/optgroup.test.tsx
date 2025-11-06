import { ListboxOptgroup } from '../optgroup'
import { ListboxRenderContext } from '../../render-context'
import { render, screen } from '@testing-library/react'

describe('in a "native" render context', () => {
  test('renders as an optgroup element', () => {
    render(
      <ListboxRenderContext.Provider value="native">
        <ListboxOptgroup as={CustomTestOptgroup} label="My group">
          <option value="test">Test</option>
        </ListboxOptgroup>
      </ListboxRenderContext.Provider>,
    )
    const group = screen.getByRole('group', { name: 'My group' })
    expect(group).toBeVisible()
    expect(group.tagName).toBe('OPTGROUP')
  })

  test('always displays children', () => {
    render(
      <ListboxRenderContext.Provider value="native">
        <ListboxOptgroup as={CustomTestOptgroup} data-testid="test-id" label="My group">
          <option value="test">Test</option>
        </ListboxOptgroup>
      </ListboxRenderContext.Provider>,
    )
    expect(screen.getByRole('option', { name: 'Test' })).toBeVisible()
  })

  test('does NOT forward additional props to the optgroup', () => {
    render(
      <ListboxRenderContext.Provider value="native">
        <ListboxOptgroup as={CustomTestOptgroup} data-testid="test-id" label="My group">
          <option value="test">Test</option>
        </ListboxOptgroup>
      </ListboxRenderContext.Provider>,
    )
    expect(screen.queryByTestId('test-id')).not.toBeInTheDocument()
  })
})

describe('in a "display" render context', () => {
  test('renders as a group element', () => {
    render(
      <ListboxRenderContext.Provider value="display">
        <ListboxOptgroup as={CustomTestOptgroup} label="My group">
          <option value="test">Test</option>
        </ListboxOptgroup>
      </ListboxRenderContext.Provider>,
    )
    expect(screen.getByRole('group')).toBeVisible()
  })

  test('always displays children', () => {
    render(
      <ListboxRenderContext.Provider value="display">
        <ListboxOptgroup as={CustomTestOptgroup} data-testid="test-id" label="My group">
          <option value="test">Test</option>
        </ListboxOptgroup>
      </ListboxRenderContext.Provider>,
    )
    expect(screen.getByRole('option', { name: 'Test' })).toBeVisible()
  })

  test('forwards additional attributes to the group element', () => {
    render(
      <ListboxRenderContext.Provider value="display">
        <ListboxOptgroup as={CustomTestOptgroup} data-testid="test-id" label="My group">
          <option value="test">Test</option>
        </ListboxOptgroup>
      </ListboxRenderContext.Provider>,
    )
    expect(screen.getByTestId('test-id')).toBe(screen.getByRole('group'))
  })
})

function CustomTestOptgroup({ label, ...rest }: ListboxOptgroup.BaseProps) {
  // NOTE: A production-ready custom optgroup component would want to use `label` for
  // the visual label; we're just keeping our test code bare-bones.
  return <div {...rest} aria-label={label} />
}
