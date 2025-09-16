import figma from '@figma/code-connect'
import { PageHeader } from '../page-header'

figma.connect(PageHeader.Title, '<PAGE_HEADER_TITLE_URL>', {
  variant: { 'Show additional info': true },
  props: {
    actions: figma.children('Button group'),
    badge: figma.children('Badge'),
    icon: figma.children('Icon'),
    tags: figma.children('Tag group'),
    title: figma.string('Page title'),
  },
  example: (props) => (
    <PageHeader.Title
      actions={props.actions}
      additionalInfo={
        <>
          {props.tags}
          {props.badge}
          {props.icon}
        </>
      }
    >
      {props.title}
    </PageHeader.Title>
  ),
})

figma.connect(PageHeader.Title, '<PAGE_HEADER_TITLE_URL>', {
  variant: { 'Show additional info': false },
  props: {
    actions: figma.children('Button group'),
    title: figma.textContent('Page title'),
  },
  example: (props) => <PageHeader.Title actions={props.actions}>{props.title}</PageHeader.Title>,
})
