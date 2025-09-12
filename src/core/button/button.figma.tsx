import { Button } from './button'
import figma from '@figma/code-connect'

figma.connect(Button, '<BUTTON_URL>', {
  variant: { Type: 'Text + Icon' },
  props: {
    children: figma.string('Label'),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    hasNoPadding: figma.boolean('Remove padding'),
    iconLeft: figma.instance('Icon L'),
    iconRight: figma.instance('Icon R'),
    isDestructive: figma.boolean('Destructive'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    useLinkStyle: figma.boolean('Link style'),
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
    }),
  },
  example: (props) => (
    // NOTE: Use AnchorButton when needing to navigate
    <Button
      disabled={props.disabled}
      hasNoPadding={props.hasNoPadding}
      iconLeft={props.iconLeft}
      iconRight={props.iconRight}
      isDestructive={props.isDestructive}
      size={props.size}
      useLinkStyle={props.useLinkStyle}
      variant={props.variant}
    >
      {props.children}
    </Button>
  ),
})

figma.connect(Button, '<BUTTON_URL>', {
  variant: { Type: 'Icon only' },
  props: {
    children: figma.string('Label'),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    hasNoPadding: figma.boolean('Remove padding'),
    iconLeft: figma.instance('Icon'),
    isDestructive: figma.boolean('Destructive'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    useLinkStyle: figma.boolean('Link style'),
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
    }),
  },
  example: (props) => (
    // NOTE: Use AnchorButton when needing to navigate
    <Button
      disabled={props.disabled}
      hasNoPadding={props.hasNoPadding}
      iconLeft={props.iconLeft}
      isDestructive={props.isDestructive}
      size={props.size}
      useLinkStyle={props.useLinkStyle}
      variant={props.variant}
    />
  ),
})
