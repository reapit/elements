import { render, fireEvent } from '@testing-library/react'
import { Snack, SnackHolder } from '..'
import { InfoIcon } from '#src/icons/info'

describe('Snack component', () => {
  test('should match a snapshot', () => {
    const wrapper = render(<Snack />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  test('should match a snapshot if an icon is supplied', () => {
    const wrapper = render(<Snack icon={<InfoIcon />} />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  test('should trigger the onRemove prop if supplied', async () => {
    const onRemove = vi.fn()
    const wrapper = render(<Snack icon={<InfoIcon />} onRemove={onRemove} />)
    fireEvent.click(wrapper.getByTestId('close-icon'))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})

describe('SnackHolder component', () => {
  test('should match a snapshot', () => {
    const wrapper = render(
      <SnackHolder snacks={[{ _id: 'snack-1', text: 'i am a snack', intent: 'primary', icon: <InfoIcon /> }]} />,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
