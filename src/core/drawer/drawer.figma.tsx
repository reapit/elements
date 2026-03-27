import { Drawer } from './drawer'
import figma from '@figma/code-connect'

figma.connect(Drawer, '<DRAWER_URL>', {
  variant: { Variant: 'Simple' },
  props: {
    children: figma.slot('Content slot'),
    overline: figma.string('Overline'),
    supplementaryInfo: figma.children('Supplementary info'),
    tabs: figma.children('Tabs'),
    title: figma.string('Drawer title'),
  },
  example: (props) => (
    <Drawer>
      <Drawer.Header
        action={<Drawer.HeaderCloseButton />}
        overline={props.overline}
        supplementaryInfo={props.supplementaryInfo}
        tabs={props.tabs}
      >
        {props.title}
      </Drawer.Header>
      <Drawer.Body>{props.children}</Drawer.Body>
    </Drawer>
  ),
})

figma.connect(Drawer, '<DRAWER_URL>', {
  variant: { Variant: 'With footer' },
  props: {
    children: figma.slot('Content slot'),
    footer: figma.children('Button group'),
    overline: figma.string('Overline'),
    supplementaryInfo: figma.children('Supplementary info'),
    title: figma.string('Drawer title'),
  },
  example: (props) => (
    <Drawer>
      <Drawer.Header overline={props.overline} supplementaryInfo={props.supplementaryInfo}>
        {props.title}
      </Drawer.Header>
      <Drawer.Body>{props.children}</Drawer.Body>
      <Drawer.Footer>{props.footer}</Drawer.Footer>
    </Drawer>
  ),
})

//
// Deprecated Figma component support
//

figma.connect(Drawer, '<DRAWER_URL_DEPRECATED>', {
  variant: { Variant: 'Simple' },
  props: {
    overline: figma.string('Overline'),
    supplementaryInfo: figma.children('Supplementary info'),
    tabs: figma.children('Tabs'),
    title: figma.string('Drawer title'),
  },
  example: (props) => (
    <Drawer>
      <Drawer.Header
        action={<Drawer.HeaderCloseButton />}
        overline={props.overline}
        supplementaryInfo={props.supplementaryInfo}
        tabs={props.tabs}
      >
        {props.title}
      </Drawer.Header>
      <Drawer.Body>TODO: Add drawer content</Drawer.Body>
    </Drawer>
  ),
})

figma.connect(Drawer, '<DRAWER_URL_DEPRECATED>', {
  variant: { Variant: 'With footer' },
  props: {
    footer: figma.children('Button group'),
    overline: figma.string('Overline'),
    supplementaryInfo: figma.children('Supplementary info'),
    title: figma.string('Drawer title'),
  },
  example: (props) => (
    <Drawer>
      <Drawer.Header overline={props.overline} supplementaryInfo={props.supplementaryInfo}>
        {props.title}
      </Drawer.Header>
      <Drawer.Body>TODO: Add drawer content</Drawer.Body>
      <Drawer.Footer>{props.footer}</Drawer.Footer>
    </Drawer>
  ),
})
