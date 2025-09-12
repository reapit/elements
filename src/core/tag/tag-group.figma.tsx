import figma from '@figma/code-connect'
import { Tag } from './tag'

figma.connect(Tag, '<TAG_URL>', {
  props: {
    children: figma.string('Label text'),
  },
  example: ({ children }) => <Tag>{children}</Tag>,
})
