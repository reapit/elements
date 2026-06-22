import preview from '#.storybook/preview'
import { Flex } from './flex'

const itemStyle = {
  background: 'var(--colour-fill-action-light)',
  borderRadius: 'var(--border-radius-m)',
  padding: 'var(--spacing-2)',
}

const meta = preview.meta({
  title: 'Utils/Flex',
  component: Flex,
  argTypes: {
    alignContent: {
      control: 'select',
      options: [
        undefined,
        'flex-start',
        'flex-end',
        'center',
        'stretch',
        'space-between',
        'space-around',
        'space-evenly',
      ],
    },
    alignItems: {
      control: 'select',
      options: [undefined, 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    },
    direction: {
      control: 'select',
      options: [undefined, 'row', 'row-reverse', 'column', 'column-reverse'],
    },
    gap: { control: 'text' },
    columnGap: { control: 'text' },
    isInline: { control: 'boolean' },
    justifyContent: {
      control: 'select',
      options: [undefined, 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    },
    rowGap: { control: 'text' },
    wrap: {
      control: 'select',
      options: [undefined, 'nowrap', 'wrap', 'wrap-reverse'],
    },
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <Flex {...args}>
      <Flex.Item style={itemStyle}>1</Flex.Item>
      <Flex.Item style={itemStyle}>2</Flex.Item>
      <Flex.Item style={itemStyle}>3</Flex.Item>
    </Flex>
  ),
})

/**
 * The default layout — items arranged in a horizontal row.
 */
export const Row = meta.story({
  args: {
    gap: '--spacing-2',
  },
})

/**
 * Setting `direction="column"` stacks items vertically.
 */
export const Column = Row.extend({
  args: {
    direction: 'column',
    gap: '--spacing-2',
  },
})

/**
 * When `wrap="wrap"`, items that overflow the container width wrap onto a new line.
 */
export const Wrap = meta.story({
  args: {
    gap: '--spacing-2',
    wrap: 'wrap',
  },
  render: (args) => (
    <Flex {...args} style={{ maxWidth: '300px' }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Flex.Item key={i} style={itemStyle}>
          {i + 1}
        </Flex.Item>
      ))}
    </Flex>
  ),
})

/**
 * `alignItems` centres items on the cross axis, useful for vertically aligning items of
 * different heights in a row.
 */
export const Align = meta.story({
  args: {
    alignItems: 'center',
    gap: '--spacing-2',
  },
  render: (args) => (
    <Flex {...args} style={{ height: '120px', border: '1px dashed var(--colour-fill-neutral-dark)' }}>
      <Flex.Item style={{ ...itemStyle, height: '40px' }}>Short</Flex.Item>
      <Flex.Item style={{ ...itemStyle, height: '80px' }}>Tall</Flex.Item>
      <Flex.Item style={{ ...itemStyle, height: '60px' }}>Medium</Flex.Item>
    </Flex>
  ),
})

/**
 * `justifyContent` distributes items along the main axis.
 */
export const Justify = meta.story({
  args: {
    gap: '--spacing-2',
    justifyContent: 'space-between',
  },
  render: (args) => (
    <Flex {...args} style={{ border: '1px dashed var(--colour-fill-neutral-dark)' }}>
      <Flex.Item style={itemStyle}>One</Flex.Item>
      <Flex.Item style={itemStyle}>Two</Flex.Item>
      <Flex.Item style={itemStyle}>Three</Flex.Item>
    </Flex>
  ),
})

/**
 * `Flex.Item` exposes item-level flex properties. Here `flex="1"` makes two items share available
 * space equally, while a third item stays at its natural size.
 */
export const Items = meta.story({
  args: {
    gap: '--spacing-2',
  },
  render: (args) => (
    <Flex {...args}>
      <Flex.Item flex="1" style={{ ...itemStyle, width: '100%' }}>
        flex 1
      </Flex.Item>
      <Flex.Item flex="1" style={{ ...itemStyle, width: '100%' }}>
        flex 1
      </Flex.Item>
      <Flex.Item style={itemStyle}>fixed</Flex.Item>
    </Flex>
  ),
})

/**
 * Both `Flex` and `Flex.Item` accept an `as` prop to render as any HTML element. Here the
 * container renders as a `<ul>` and each item as an `<li>`.
 */
export const Polymorphism = meta.story({
  args: {
    gap: '--spacing-2',
  },
  render: (args) => (
    <Flex {...args} as="ul" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <Flex.Item as="li" style={itemStyle}>
        Item A
      </Flex.Item>
      <Flex.Item as="li" style={itemStyle}>
        Item B
      </Flex.Item>
      <Flex.Item as="li" style={itemStyle}>
        Item C
      </Flex.Item>
    </Flex>
  ),
})
