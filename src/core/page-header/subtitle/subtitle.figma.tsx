import figma from '@figma/code-connect'
import { PageHeader } from '../page-header'

figma.connect(PageHeader.Subtitle, '<PAGE_HEADER_SUBTITLE_URL>', {
  props: {
    badge: figma.children('Badge'),
    icon: figma.children('Icon'),
    subtitle: figma.string('Page subtitle'),
    tags: figma.children('Tag group'),
  },
  example: (props) => (
    <PageHeader.Subtitle
      additionalInfo={
        <>
          {props.tags}
          {props.badge}
          {props.icon}
        </>
      }
    >
      {props.subtitle}
    </PageHeader.Subtitle>
  ),
})
