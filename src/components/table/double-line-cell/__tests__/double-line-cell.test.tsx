import { render } from '@testing-library/react'
import { DoubleLineCell } from '..'
import { TableText } from '../../table-text'
import { DeprecatedIcon } from '#src/components/deprecated-icon/icon-component'
import { Avatar } from '#src/components/avatar/avatar'

describe('DoubleLineCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<DoubleLineCell />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with first and second line', () => {
    const { asFragment } = render(
      <DoubleLineCell
        firstLine={<TableText>Alphanumeric value</TableText>}
        secondLine={<TableText size="extra-small">Value 23 Jan 2025 4:30 pm Value</TableText>}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with first and second line with icons', () => {
    const { asFragment } = render(
      <DoubleLineCell
        firstLine={
          <>
            <DeprecatedIcon icon="star" fontSize="1rem" />
            <TableText>Alphanumeric value</TableText>
            <DeprecatedIcon icon="star" fontSize="1rem" />
          </>
        }
        secondLine={<TableText size="extra-small">Value 23 Jan 2025 4:30 pm Value</TableText>}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with first and second line with media item', () => {
    const { asFragment } = render(
      <DoubleLineCell
        mediaItem={<Avatar>JS</Avatar>}
        firstLine={<TableText>John Smith</TableText>}
        secondLine={<TableText size="extra-small">Plumber</TableText>}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
