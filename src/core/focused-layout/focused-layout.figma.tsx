import figma from '@figma/code-connect'
import { FocusedLayout } from './focused-layout'

figma.connect(FocusedLayout, '<FOCUSED_LAYOUT_URL>', {
  variant: { Breakpoints: 'XS' },
  props: {
    actions: figma.children('Button group'),
    background: figma.enum('🎨 Style', {
      Light: 'light',
      Dark: 'dark',
    }),
    children: figma.slot('Content slot'),
    closeButton: figma.enum('Type', {
      Simple: undefined,
      MultiStep: figma.instance('Button'),
    }),
    pageTitle: figma.string('✏️ Page title'),
    logo: figma.children('Product logo'),
  },
  example: (props) => (
    <FocusedLayout background={props.background}>
      <FocusedLayout.TopBar logo={props.logo} title={props.pageTitle}>
        {props.closeButton}
      </FocusedLayout.TopBar>
      <FocusedLayout.Content>{props.children}</FocusedLayout.Content>
      <FocusedLayout.BottomBar>{props.actions}</FocusedLayout.BottomBar>
    </FocusedLayout>
  ),
})

figma.connect(FocusedLayout, '<FOCUSED_LAYOUT_URL>', {
  variant: { Breakpoints: 'SM' },
  props: {
    actions: figma.children('Button group'),
    background: figma.enum('🎨 Style', {
      Light: 'light',
      Dark: 'dark',
    }),
    children: figma.slot('Content slot'),
    closeButton: figma.enum('Type', {
      Simple: undefined,
      MultiStep: figma.instance('Button'),
    }),
    pageTitle: figma.string('✏️ Page title'),
    logo: figma.children('Product logo'),
  },
  example: (props) => (
    <FocusedLayout background={props.background}>
      <FocusedLayout.TopBar logo={props.logo} title={props.pageTitle}>
        {props.closeButton}
      </FocusedLayout.TopBar>
      <FocusedLayout.Content>{props.children}</FocusedLayout.Content>
      <FocusedLayout.BottomBar>{props.actions}</FocusedLayout.BottomBar>
    </FocusedLayout>
  ),
})

figma.connect(FocusedLayout, '<FOCUSED_LAYOUT_URL>', {
  variant: { Breakpoints: 'MD-2XL' },
  props: {
    actions: figma.children('Button group'),
    background: figma.enum('🎨 Style', {
      Light: 'light',
      Dark: 'dark',
    }),
    children: figma.slot('Content slot'),
    pageTitle: figma.string('✏️ Page title'),
    logo: figma.children('Product logo'),
  },
  example: (props) => (
    <FocusedLayout background={props.background}>
      <FocusedLayout.TopBar logo={props.logo} title={props.pageTitle}>
        {props.actions}
      </FocusedLayout.TopBar>
      <FocusedLayout.Content>{props.children}</FocusedLayout.Content>
    </FocusedLayout>
  ),
})

//
// Deprecated Figma component support
//

figma.connect(FocusedLayout, '<FOCUSED_LAYOUT_URL_DEPRECATED>', {
  variant: { Breakpoints: 'XS' },
  props: {
    actions: figma.children('Button group'),
    background: figma.enum('🎨 Style', {
      Light: 'light',
      Dark: 'dark',
    }),
    closeButton: figma.enum('Type', {
      Simple: undefined,
      MultiStep: figma.instance('Button'),
    }),
    pageTitle: figma.string('✏️ Page title'),
    logo: figma.children('Product logo'),
  },
  example: (props) => (
    <FocusedLayout background={props.background}>
      <FocusedLayout.TopBar logo={props.logo} title={props.pageTitle}>
        {props.closeButton}
      </FocusedLayout.TopBar>
      <FocusedLayout.Content>{/* TODO: add content */}</FocusedLayout.Content>
      <FocusedLayout.BottomBar>{props.actions}</FocusedLayout.BottomBar>
    </FocusedLayout>
  ),
})

figma.connect(FocusedLayout, '<FOCUSED_LAYOUT_URL_DEPRECATED>', {
  variant: { Breakpoints: 'SM' },
  props: {
    actions: figma.children('Button group'),
    background: figma.enum('🎨 Style', {
      Light: 'light',
      Dark: 'dark',
    }),
    closeButton: figma.enum('Type', {
      Simple: undefined,
      MultiStep: figma.instance('Button'),
    }),
    pageTitle: figma.string('✏️ Page title'),
    logo: figma.children('Product logo'),
  },
  example: (props) => (
    <FocusedLayout background={props.background}>
      <FocusedLayout.TopBar logo={props.logo} title={props.pageTitle}>
        {props.closeButton}
      </FocusedLayout.TopBar>
      <FocusedLayout.Content>{/* TODO: add content */}</FocusedLayout.Content>
      <FocusedLayout.BottomBar>{props.actions}</FocusedLayout.BottomBar>
    </FocusedLayout>
  ),
})

figma.connect(FocusedLayout, '<FOCUSED_LAYOUT_URL_DEPRECATED>', {
  variant: { Breakpoints: 'MD-2XL' },
  props: {
    actions: figma.children('Button group'),
    background: figma.enum('🎨 Style', {
      Light: 'light',
      Dark: 'dark',
    }),
    pageTitle: figma.string('✏️ Page title'),
    logo: figma.children('Product logo'),
  },
  example: (props) => (
    <FocusedLayout background={props.background}>
      <FocusedLayout.TopBar logo={props.logo} title={props.pageTitle}>
        {props.actions}
      </FocusedLayout.TopBar>
      <FocusedLayout.Content>{/* TODO: add content */}</FocusedLayout.Content>
    </FocusedLayout>
  ),
})
