import { render, screen } from '@testing-library/react'
import { TableCellCheckbox } from '../checkbox'

test('renders as a checkbox element', () => {
  render(<TableCellCheckbox />)
  expect(screen.getByRole('checkbox')).toBeVisible()
})

test('has .el-table-cell-checkbox class', () => {
  const { container } = render(<TableCellCheckbox />)
  // NOTE: We don't use getByRole here because it's not the checkbox element that receives
  // the class, rather it's the checkbox's parent. To rely on this knowledge here would be to couple
  // this test to an implementation concern. For the purpose of testing this subject, we just want
  // to ensure the el-table-cell-checkbox class is present on _some_ element.
  expect(container.querySelector('.el-table-cell-checkbox')).toHaveClass('el-table-cell-checkbox')
})

test('accepts other classes', () => {
  // NOTE: Again, we don't use getByRole here because it's not the checkbox element that receives
  // the class, rather it's the checkbox's parent. To rely on this knowledge here would be to couple
  // this test to an implementation concern. For the purpose of testing this subject, we just want
  // to ensure our custom class also reaches the DOM.
  const { container } = render(<TableCellCheckbox className="custom-class" />)
  expect(container.querySelector('.el-table-cell-checkbox')).toHaveClass('el-table-cell-checkbox custom-class')
})

test('forwards additional props to the checkbox element', () => {
  render(<TableCellCheckbox data-testid="test-id" />)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('checkbox'))
})
