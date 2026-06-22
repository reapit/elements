import preview from '#.storybook/preview'
import { MainContainer } from '../main-container'
import { ContentPlaceholder } from './__story__/placeholders'

const meta = preview.meta({
  title: 'Containers and layout/MainContainer',
  component: MainContainer,
  argTypes: {
    backgroundColour: {
      control: 'select',
      options: ['--colour-fill-white', '--colour-fill-neutral-lightest'],
    },
    children: {
      control: false,
    },
    size: {
      control: 'radio',
      options: ['fluid', 'wide', 'narrow'],
    },
  },
  decorators: (Story) => (
    <div style={{ containerType: 'inline-size', width: '100%' }}>
      <Story />
    </div>
  ),
})

/**
 * By default, the main container will take up the full width of its parent. This is the `fluid` size.
 * It will also have a single column layout.
 */
export const Example = meta.story({
  args: {
    backgroundColour: undefined,
    hasNoBottomPadding: false,
    hasNoTopPadding: false,
    children: <ContentPlaceholder />,
    size: 'fluid',
    template: 'single-column',
  },
})

/**
 * To constrain the width of the main container's content, the `wide` size can be used. Below the MD
 * breakpoint, a wide main container becomes fluid.
 */
export const Wide = Example.extend({
  args: {
    size: 'wide',
  },
})

/**
 * The `narrow` size also constrains the width of the main container's content. Below the MD
 * breakpoint, a narrow main container becomes fluid.
 */
export const Narrow = Example.extend({
  args: {
    size: 'narrow',
  },
})

/**
 * A two-column, symmetrical layout can be achieved using the `two-columns-symmetrical` template. This
 * layout should only be used on SM breakpoints and above.
 */
export const TwoColumnSymmetrical = Example.extend({
  args: {
    children: [
      <ContentPlaceholder key="col-1">Column 1</ContentPlaceholder>,
      <ContentPlaceholder key="col-2">Column 2</ContentPlaceholder>,
    ],

    template: 'two-columns-symmetrical',
  },
})

/**
 * A two-column, asymmetrical layout with the larger column logically first can be achieved using
 * the `two-columns-asymmetrical-start` template. This layout should only be used on MD breakpoints
 * and above.
 */
export const TwoColumnAsymmetricalStart = Example.extend({
  args: {
    children: [
      <ContentPlaceholder key="col-1">Column 1</ContentPlaceholder>,
      <ContentPlaceholder key="col-2">Column 2</ContentPlaceholder>,
    ],

    template: 'two-columns-asymmetrical-start',
  },
})

/**
 * A two-column, asymmetrical layout with the larger column logically last can be achieved using
 * the `two-columns-asymmetrical-end` template. This layout should only be used on MD breakpoints
 * and above.
 */
export const TwoColumnAsymmetricalEnd = Example.extend({
  args: {
    children: [
      <ContentPlaceholder key="col-1">Column 1</ContentPlaceholder>,
      <ContentPlaceholder key="col-2">Column 2</ContentPlaceholder>,
    ],

    template: 'two-columns-asymmetrical-end',
  },
})

/**
 * A three-column, symmetrical layout can be achieved using the `three-columns` template. This
 * layout should only be used on SM breakpoints and above.
 */
export const ThreeColumns = Example.extend({
  args: {
    children: [
      <ContentPlaceholder key="col-1">Column 1</ContentPlaceholder>,
      <ContentPlaceholder key="col-2">Column 2</ContentPlaceholder>,
      <ContentPlaceholder key="col-3">Column 3</ContentPlaceholder>,
    ],

    template: 'three-columns',
  },
})

/**
 * By default, the main container will have a transparent background. This can be changed using the optional
 * `backgroundColour` prop. This will typically be `--colour-fill-white` or `--colour-fill-neutral-lightest`.
 */
export const Background = Example.extend({
  args: {
    backgroundColour: '--colour-fill-neutral-lightest',
  },
})

/**
 * In some cases, it may be useful to have the main container render as a
 * [sectioning element](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#sectioning_content)
 * such as `section`, `article` or `aside`. This can be achieved using `as`. By default, the
 * main container renders as a `div`.
 *
 * When a semantic element is used, particularly `section`, an accessible title should be provided.
 */
export const Semantics = Background.extend({
  args: {
    'aria-labelledby': 'my-title',
    as: 'section',
    children: <h2 id="my-title">I am a section</h2>,
  },
})
