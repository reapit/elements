import { AutocompleteControl } from './autocomplete-control'
import { figma } from '@figma/code-connect'

figma.connect(AutocompleteControl, '<AUTOCOMPLETE_MULTI_SELECT_URL>', {
  props: {
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    errorText: figma.enum('State', {
      Default: { text: undefined },
      Disabled: { text: undefined },
      Error: figma.nestedProps('FormControl ErrorText', {
        text: figma.string('Error text'),
      }),
      Focused: { text: undefined },
    }),
    helpText: figma.boolean('Show helper', {
      true: figma.nestedProps('FormControl HelpText', {
        text: figma.string('Helper text'),
      }),
      false: { text: undefined },
    }),
    label: figma.boolean('Show label', {
      true: figma.nestedProps('FormControl Label', {
        text: figma.string('Label'),
        required: figma.boolean('Required'),
      }),
      false: { text: undefined, required: undefined },
    }),
    placeholder: figma.string('Placeholder text'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: (props) => (
    <AutocompleteControl
      disabled={props.disabled}
      errorText={props.errorText.text}
      helpText={props.helpText.text}
      label={props.label.text}
      multiple
      required={props.label.required}
    >
      <AutocompleteControl.Button />
      <AutocompleteControl.Popup search={<AutocompleteControl.SearchInput aria-label="<REPLACE ME>" />}>
        <AutocompleteControl.Listbox name="<REPLACE_ME>">
          {/* TODO: Implement list items */}
        </AutocompleteControl.Listbox>
      </AutocompleteControl.Popup>
    </AutocompleteControl>
  ),
})

figma.connect(AutocompleteControl, '<AUTOCOMPLETE_SINGLE_SELECT_URL>', {
  props: {
    children: figma.boolean('Selection as card', {
      true: () => (
        // TODO: implement card content component
        <AutocompleteControl.CardDefaultContent>Replace me with label text</AutocompleteControl.CardDefaultContent>
      ),
      false: undefined,
    }),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    errorText: figma.enum('State', {
      Default: { text: undefined },
      Disabled: { text: undefined },
      Error: figma.nestedProps('FormControl ErrorText', {
        text: figma.string('Error text'),
      }),
      Focused: { text: undefined },
    }),
    helpText: figma.boolean('Show helper', {
      true: figma.nestedProps('FormControl HelpText', {
        text: figma.string('Helper text'),
      }),
      false: { text: undefined },
    }),
    label: figma.boolean('Show label', {
      true: figma.nestedProps('FormControl Label', {
        text: figma.string('Label'),
        required: figma.boolean('Required'),
      }),
      false: { text: undefined, required: undefined },
    }),
    placeholder: figma.string('Placeholder text'),
    selectionStyle: figma.boolean('Selection as card', {
      true: 'card',
      false: 'default',
    }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: (props) => (
    <AutocompleteControl
      errorText={props.errorText?.text}
      helpText={props.helpText.text}
      label={props.label.text}
      required={props.label.required}
    >
      <AutocompleteControl.Button selectionStyle={props.selectionStyle}>{props.children}</AutocompleteControl.Button>
      <AutocompleteControl.Popup search={<AutocompleteControl.SearchInput aria-label="<REPLACE ME>" />}>
        <AutocompleteControl.Listbox name="<REPLACE_ME>">
          {/* TODO: Implement list items */}
        </AutocompleteControl.Listbox>
      </AutocompleteControl.Popup>
    </AutocompleteControl>
  ),
})
