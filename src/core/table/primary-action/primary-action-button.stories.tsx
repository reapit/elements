import preview from '#.storybook/preview'
import { TableRowPrimaryActionButton } from './primary-action-button'

const meta = preview.meta({
  title: 'Core/Table/PrimaryAction',
  component: TableRowPrimaryActionButton,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * `Table.PrimaryActionButton` is identical to `Table.PrimaryAction`, except it renders as a
 * `<button>` element, which allows button semantics to be used for a table row's primary action.
 * That said, typically a row's primary action will involve navigation, such as opening a drawer
 * or navigating to another page.
 */
export const Buttons = meta.story({
  args: {
    children: '1 Brisbane St, Brisbane 4300',
  },
})
