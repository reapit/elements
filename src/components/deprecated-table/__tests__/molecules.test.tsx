import { render } from '@testing-library/react'
import {
  DeprecatedTableHeadersRow,
  DeprecatedTableHeader,
  DeprecatedTableRow,
  DeprecatedTableRowContainer,
  DeprecatedTableCell,
  TableExpandableRowTriggerCell,
  TableExpandableRow,
  TableCtaTriggerCell,
  resolveNarrowOrderClass,
  TableCellSplit,
  handleTableCtaClick,
} from '../molecules'
import * as styles from '../__styles__'

describe('DeprecatedTableHeadersRow Component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedTableHeadersRow />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DeprecatedTableHeader Component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedTableHeader />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DeprecatedTableRow Component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedTableRow />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('TableCellSplit Component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<TableCellSplit data="Some Data" subData="Some Longer Sub Data" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DeprecatedTableCell Component', () => {
  it('should match a snapshot with no props', () => {
    const wrapper = render(<DeprecatedTableCell />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot with full props', () => {
    const wrapper = render(
      <DeprecatedTableCell className="foo-bar" icon="add" darkText narrowLabel="Label" narrowIsFullWidth narrowOrder={1} />,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('TableExpandableRowTriggerCell Component', () => {
  it('should match a snapshot with no children and open', () => {
    const wrapper = render(<TableExpandableRowTriggerCell isOpen narrowIsFullWidth />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot with no children and closed', () => {
    const wrapper = render(<TableExpandableRowTriggerCell />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot with children', () => {
    const wrapper = render(
      <TableExpandableRowTriggerCell>
        <div>I am a child</div>
      </TableExpandableRowTriggerCell>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('TableCtaTriggerCell Component', () => {
  it('should match a snapshot with no children and an icon', () => {
    const wrapper = render(<TableCtaTriggerCell icon="add" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot with children and no icon', () => {
    const wrapper = render(
      <TableCtaTriggerCell>
        <div>I am a child</div>
      </TableCtaTriggerCell>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot with no children and no icon', () => {
    const wrapper = render(<TableCtaTriggerCell />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('TableExpandableRow Component', () => {
  it('should match a snapshot when open', () => {
    const wrapper = render(<TableExpandableRow isOpen />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when not open', () => {
    const wrapper = render(<TableExpandableRow isOpen />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DeprecatedTableRowContainer Component', () => {
  it('should match a snapshot when open', () => {
    const wrapper = render(<DeprecatedTableRowContainer isOpen />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when not open', () => {
    const wrapper = render(<DeprecatedTableRowContainer isOpen />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('resolveNarrowOrderClass', () => {
  const orders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  orders.forEach((order) => {
    it(`should return the correct class for order ${order}`, () => {
      expect(resolveNarrowOrderClass(order)).toEqual(styles[`ElTableCellNarrowOrder${order}`])
    })
  })
})

describe('handleTableCtaClick', () => {
  it('should call onClick with the correct argument', () => {
    const onClick = vi.fn()

    const curried = handleTableCtaClick(onClick)

    curried()

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
