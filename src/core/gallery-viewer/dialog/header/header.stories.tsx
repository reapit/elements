import preview from '#.storybook/preview'
import { GalleryViewerDialogContext } from '../context'
import { GalleryViewerDialogHeader } from './header'

const meta = preview.meta({
  title: 'Core/GalleryViewer/Dialog/Header',
  component: GalleryViewerDialogHeader,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
  decorators: [
    (Story) => (
      <GalleryViewerDialogContext.Provider value={{ titleId: 'story-title-id' }}>
        <Story />
      </GalleryViewerDialogContext.Provider>
    ),
  ],
})

export const Example = meta.story({
  args: {
    children: '10 High Street, Great Horwood, Buckinghamshire, MK17 0QL',
  },
})

/**
 * When the title text is very long and the container is constrained, the text will truncate with an ellipsis.
 */
export const Truncation = Example.extend({
  args: {
    children: '10 High Street, Great Horwood, Buckinghamshire, MK17 0QL, London, UK, Earth, Solar System',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          containerType: 'inline-size',
          boxSizing: 'border-box',
          border: '1px solid #FA00FF',
          width: '320px',
        }}
      >
        <Story />
      </div>
    ),
  ],
})

/**
 * The dialog header will adjust its layout based on the inline-size of the gallery viewer dialog. This story demonstrates
 * the layout changes (e.g. padding adjustments) within containers that mimic different breakpoints.
 */
export const DynamicLayout = Example.extend({
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          color: '#FA00FF',
          gridAutoFlow: 'column',
          gridTemplateColumns: '320px 800px',
          justifyContent: 'start',
          gap: 'var(--spacing-6)',
          width: 'min-content',
        }}
      >
        <div>
          <p style={{ textAlign: 'center' }}>XS</p>
          <div
            style={{
              containerType: 'inline-size',
              boxSizing: 'content-box',
              border: '1px solid #FA00FF',
              margin: '0 auto',
            }}
          >
            <Story />
          </div>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>SM–2XL</p>
          <div
            style={{
              containerType: 'inline-size',
              boxSizing: 'content-box',
              border: '1px solid #FA00FF',
            }}
          >
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
})
