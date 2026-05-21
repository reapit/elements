import preview from '#.storybook/preview'
import { IconGallery } from './icon-gallery'

const meta = preview.meta({
  title: 'Icons/Gallery',
  parameters: {
    docs: {
      description: {
        component: `A searchable gallery of every icon shipped by \`@reapit/elements\`.

Search by icon name (e.g. \`bed\`, \`BedIcon\`) or by a related keyword (e.g. \`bedroom\`, \`sleep\`).
Use the **Copy import** button on each tile to copy the icon's subpath import statement to your clipboard.`,
      },
      story: {
        inline: true,
      },
    },
  },
})

/**
 * Search by icon name or keyword, then click **Copy import** on any tile to copy the icon's
 * subpath import statement to the clipboard.
 */
export const Example = meta.story({
  render: () => <IconGallery />,
})
