import preview from '#.storybook/preview'
import { Avatar } from '#src/core/avatar'
import { Menu } from '#src/core/menu'
import { Table } from '../table'
import { useTableDecorator } from '../__story__/use-table-decorator'

const href = '#'

const meta = preview.meta({
  title: 'Core/Table/Body',
  component: Table.Body,
  argTypes: {
    as: {
      control: false,
      description: 'The element this table row will render as.',
      table: {
        type: {
          summary: "'tbody' | 'div'",
        },
      },
    },
    children: {
      control: 'select',
      description: 'The table rows.',
      options: ['Single-line', 'Double-line'],
      mapping: {
        'Single-line': buildRows('single-line'),
        'Double-line': buildRows('double-line'),
      },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
})

export const Example = meta.story({
  args: {
    as: 'tbody',
    children: 'Double-line',
  },
  decorators: [useTableDecorator('body', 'min-content 1fr 1fr 1fr min-content')],
})

/**
 * Sometimes it may be necessary to render the table row as a plain `<div>`. Providing
 * `as="div"` will achieve this outcome. When doing so, it's important to consider whether an
 * [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles)
 * should also be specified.
 *
 * Care must also be taken to ensure the descendant cells are also rendered as `<div>` elements,
 * possibly with explicit ARIA roles as well.
 */
export const Divs = meta.story({
  args: {
    as: 'div',
    children: (
      <Table.BodyRow as="div">
        <Table.BodyCell as="div">
          <Table.PrimaryAction href={href}>I&apos;m all divs and no a11y 😬</Table.PrimaryAction>
        </Table.BodyCell>
      </Table.BodyRow>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
})

function buildRows(type: 'single-line' | 'double-line') {
  switch (type) {
    case 'single-line': {
      return (
        <>
          <Table.BodyRow>
            <Table.BodyCell>
              <Table.Checkbox aria-label="Select 10 Hay St, Melbourne 3100" name="selections" value="1" />
            </Table.BodyCell>
            <Table.BodyCell as="th">
              <Table.PrimaryAction href={href}>10 Hay St, Melbourne 3100</Table.PrimaryAction>
            </Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>
              <Table.MoreActions aria-label="More actions for John Smith">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </Table.MoreActions>
            </Table.BodyCell>
          </Table.BodyRow>

          <Table.BodyRow>
            <Table.BodyCell>
              <Table.Checkbox aria-label="Select 45 Queen Elizabeth St, Melbourne 3100" name="selections" value="2" />
            </Table.BodyCell>
            <Table.BodyCell as="th">
              <Table.PrimaryAction href={href}>45 Queen Elizabeth St, Melbourne 3100</Table.PrimaryAction>
            </Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>
              <Table.MoreActions aria-label="More actions for 45 Queen Elizabeth St, Melbourne 3100">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </Table.MoreActions>
            </Table.BodyCell>
          </Table.BodyRow>
        </>
      )
    }
    case 'double-line': {
      return (
        <>
          <Table.BodyRow>
            <Table.BodyCell>
              <Table.Checkbox aria-label="Select Mary Jane" name="selections" value="1" />
            </Table.BodyCell>
            <Table.BodyCell as="th">
              <Table.DoubleLineLayout mediaItem={<Avatar>MJ</Avatar>} supplementaryData="Engineer">
                <Table.PrimaryAction href={href}>Mary Jane</Table.PrimaryAction>
              </Table.DoubleLineLayout>
            </Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>
              <Table.MoreActions aria-label="More actions for Mary Jane">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </Table.MoreActions>
            </Table.BodyCell>
          </Table.BodyRow>

          <Table.BodyRow>
            <Table.BodyCell>
              <Table.Checkbox aria-label="Select John Smith" name="selections" value="2" />
            </Table.BodyCell>
            <Table.BodyCell as="th">
              <Table.DoubleLineLayout mediaItem={<Avatar>JS</Avatar>} supplementaryData="Engineer">
                <Table.PrimaryAction href={href}>John Smith</Table.PrimaryAction>
              </Table.DoubleLineLayout>
            </Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>
              <Table.MoreActions aria-label="More actions for John Smith">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </Table.MoreActions>
            </Table.BodyCell>
          </Table.BodyRow>
        </>
      )
    }
  }
}
