import figma from '@figma/code-connect'
import { FolderTabs } from '../folder-tabs'

figma.connect(FolderTabs.Item, '<FOLDER_TAB_ITEM_SM_2XL_URL>', {
  props: {
    children: figma.children('↳Content'),
  },
  example: (props) => (
    <FolderTabs.Item aria-current={false} href="#replace-me">
      {props.children}
    </FolderTabs.Item>
  ),
})

figma.connect(FolderTabs.Item, '<FOLDER_TAB_ITEM_XS_URL>', {
  props: {
    children: figma.children('↳Content'),
  },
  example: (props) => (
    <FolderTabs.Item aria-current={false} href="#replace-me">
      {props.children}
    </FolderTabs.Item>
  ),
})
