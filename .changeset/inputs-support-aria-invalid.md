---
'@reapit/elements': minor
---

`TextInput`, `Textarea`, `SelectNative`, `Combobox`, `CheckboxInput`, `RadioInput`, and `DateTimeInput` now trigger error styling when `aria-invalid="true"` and `data-show-validity="true"` are both set, even when the DOM element carries no native invalid state.

`TextControl`, `TextareaControl`, `SelectNativeControl`, `SelectControl`, `AutocompleteControl`, `DateTimeControl`, `CheckboxControl`, `CheckboxGroupControl`, and `RadioGroupControl` now default `showValidity` to `true` when `errorText` is provided. Pass `showValidity={false}` explicitly to override.
