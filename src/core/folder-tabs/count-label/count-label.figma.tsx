import figma from '@figma/code-connect'
import { FolderTabs } from '../folder-tabs'

figma.connect(FolderTabs.CountLabel, '<FOLDER_TAB_ITEM_CONTENT_SM_2XL_URL>', {
  variant: { Variant: 'Count' },
  props: {
    children: figma.string('Label'),
    count: figma.string('Count'),
  },
  example: (props) => <FolderTabs.CountLabel count={props.count}>{props.children}</FolderTabs.CountLabel>,
})

figma.connect(FolderTabs.CountLabel, '<FOLDER_TAB_ITEM_CONTENT_XS_URL>', {
  variant: { Variant: 'Count' },
  props: {
    children: figma.string('Label'),
    count: figma.string('Count'),
  },
  example: (props) => <FolderTabs.CountLabel count={props.count}>{props.children}</FolderTabs.CountLabel>,
})
