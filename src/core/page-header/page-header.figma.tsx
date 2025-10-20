import figma from '@figma/code-connect'
import { PageHeader } from './page-header'

figma.connect(PageHeader, '<PAGE_HEADER_URL>', {
  props: {
    navigation: figma.nestedProps('Navigation', {
      children: figma.children('*'),
    }),
    leadingElement: figma.children('Leading element'),
    subtitle: figma.children('Subtitle row'),
    supplementaryInfo: figma.children('Line 3'),
    title: figma.children('Title row'),
  },
  example: (props) => (
    <PageHeader
      leadingElement={props.leadingElement}
      navigation={props.navigation.children}
      size="fluid" // TODO: Make this match the design when supported by the component in Figma
      subtitle={props.subtitle}
      supplementaryInfo={props.supplementaryInfo}
      title={props.title}
    />
  ),
})
