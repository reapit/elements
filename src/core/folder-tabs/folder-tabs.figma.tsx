import { FolderTabs } from './folder-tabs'
import figma from '@figma/code-connect'

// NOTE: This is the top-most folder tabs component in Figma
figma.connect(FolderTabs, '<FOLDER_TABS_URL>', {
  props: {
    children: figma.children('Folder tabs'),
  },
  example: (props) => <FolderTabs>{props.children}</FolderTabs>,
})

// NOTE: These two are the two breakpoint-specific folder tab components in Figma
figma.connect(FolderTabs, '<FOLDER_TABS_SM_2XL_URL>', {
  props: {
    children: figma.children('Tab *'),
  },
  example: (props) => <FolderTabs>{props.children}</FolderTabs>,
})

figma.connect(FolderTabs, '<FOLDER_TABS_XS_URL>', {
  props: {
    children: figma.children('Tab *'),
  },
  example: (props) => <FolderTabs>{props.children}</FolderTabs>,
})
