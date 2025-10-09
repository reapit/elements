import { render, screen } from '@testing-library/react'
import { ExperimentalSelectCustomOptionGroup } from '../group'
import { ExperimentalSelectCustomOption } from '../../option'
import type { OptionGroupProps } from '../group'

describe('Group', () => {
  const renderGroup = (props: OptionGroupProps) => {
    return render(<ExperimentalSelectCustomOptionGroup {...props} />)
  }

  test('renders children options', () => {
    renderGroup({
      children: (
        <>
          <ExperimentalSelectCustomOption value="option1" label="Option 1" />
          <ExperimentalSelectCustomOption value="option2" label="Option 2" />
        </>
      ),
    })

    expect(screen.getByText('Option 1')).toBeVisible()
    expect(screen.getByText('Option 2')).toBeVisible()
  })

  test('renders label when provided', () => {
    renderGroup({
      label: 'Group Label',
      children: <ExperimentalSelectCustomOption value="option1" label="Option 1" />,
    })

    expect(screen.getByText('Group Label')).toBeVisible()
    // Ensure it's rendered as a LabelText component
    expect(screen.getByText('Group Label').tagName.toLowerCase()).toBe('span')
  })

  test('does not render label when not provided', () => {
    renderGroup({
      children: <ExperimentalSelectCustomOption value="option1" label="Option 1" />,
    })

    // There should be no LabelText rendered
    expect(screen.queryByText('Group Label')).not.toBeInTheDocument()
  })

  test('has role group', () => {
    renderGroup({
      label: 'Group Label',
      children: <ExperimentalSelectCustomOption value="option1" label="Option 1" />,
    })

    const group = screen.getByRole('group')
    expect(group).toBeVisible()
  })
})
