import figma from '@figma/code-connect'
import { PageHeader } from './page-header'

figma.connect(PageHeader, '<PAGE_HEADER_URL>', {
  props: {
    navigation: figma.nestedProps('Navigation', {
      children: figma.children('*'),
    }),
    leadingElement: figma.children('Leading element'),
    size: figma.enum('Main container size', {
      Fluid: 'fluid',
      Narrow: 'narrow',
      Wide: 'wide',
    }),
    subtitle: figma.children('Line 2'),
    supplementaryInfo: figma.children('Line 3'),
    title: figma.children('Title row'),
  },
  example: (props) => (
    <PageHeader
      leadingElement={props.leadingElement}
      navigation={props.navigation.children}
      size={props.size}
      subtitle={props.subtitle}
      supplementaryInfo={props.supplementaryInfo}
      title={props.title}
    />
  ),
})
