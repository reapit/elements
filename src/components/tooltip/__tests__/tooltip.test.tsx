import React from 'react'
import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { useTooltip } from '../use-tooltip'
import { DeprecatedButton } from '../../../deprecated/button'
import { Tooltip } from '../tooltip'

// Mock createPortal for rendering Tooltip to the body
vi.mock('react-dom', async () => {
  const actual = await vi.importActual<typeof import('react-dom')>('react-dom')
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node, // Render the node directly
  }
})

describe('Tooltip with createPortal', () => {
  it('should render the tooltip when visible', () => {
    const TestComponent = () => {
      const tooltip = useTooltip()
      return (
        <>
          <DeprecatedButton {...tooltip.getTriggerProps()}>Hover me</DeprecatedButton>
          <Tooltip
            {...tooltip.getTooltipProps()}
            label="Label"
            description="This is a tooltip"
            isVisible={true}
            position="top"
            maxWidth="400px"
          />
        </>
      )
    }

    const { container, getByText } = render(<TestComponent />)
    // Trigger visibility
    const button = getByText('Hover me')
    fireEvent.mouseEnter(button)

    // Snapshot test with the tooltip visible
    expect(container).toMatchSnapshot()
  })

  it('should not render the tooltip when hidden', () => {
    const TestComponent = () => {
      const tooltip = useTooltip()
      return (
        <>
          <DeprecatedButton {...tooltip.getTriggerProps()}>Hover me</DeprecatedButton>
          <Tooltip
            {...tooltip.getTooltipProps()}
            label="Label"
            description="This is a tooltip"
            isVisible={false}
            position="top"
            maxWidth="400px"
          />
        </>
      )
    }

    const { container } = render(<TestComponent />)
    // Snapshot test with the tooltip hidden
    expect(container).toMatchSnapshot()
  })
})
