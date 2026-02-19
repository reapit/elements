import { DescriptionList } from '../description-list'
import figma from '@figma/code-connect'

figma.connect(DescriptionList.Item, '<DESCRIPTION_LIST_ITEM_STACKED_URL>', {
  props: {
    description: 'TODO: add description content',
    label: figma.nestedProps('List item', {
      value: figma.string('Label'),
    }),
  },
  example: (props) => <DescriptionList.Item label={props.label.value}>{props.description}</DescriptionList.Item>,
})

figma.connect(DescriptionList.Item, '<DESCRIPTION_LIST_ITEM_INLINE_URL>', {
  props: {
    description: 'TODO: add description content',
    label: figma.nestedProps('List item', {
      value: figma.string('Label'),
    }),
  },
  example: (props) => <DescriptionList.Item label={props.label.value}>{props.description}</DescriptionList.Item>,
})
