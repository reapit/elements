import { styled } from '@linaria/react'
import { ElDeprecatedIcon } from '../../icon/__styles__'
import { ElDeprecatedLabel } from '../../label/__styles__'
import { ElInput, elHasInputError } from '../../input/__styles__'
import { ElTextArea } from '../../../components/textarea'
import { ElSelect } from '../../select/__styles__'
import { ElInputAddOn } from '../../input-add-on/__styles__'
import { ElToggleRadioWrap, ElToggleLabel } from '../../toggle/__styles__'
import { ElMultiSelectInputWrapper } from '../../multi-select/__styles__'
import { ElInputError } from '../../input-error/__styles__'

export const ElInputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${ElDeprecatedLabel} {
    order: 1;
    flex-basis: 100%;
    padding: 0 0.5rem 0.5rem 0;
  }

  ${ElDeprecatedIcon} {
    color: var(--neutral-400);
    border: var(--component-input-border);
    border-right: none;
    border-radius: 0.125rem 0 0 0.125rem;
    padding-left: 0.5rem;
    align-items: center;
    order: 2;
  }

  ${ElInputAddOn} {
    border: var(--component-input-border);
    border-left: none;
    padding-right: 0.5rem;
    align-items: center;
    display: flex;
    order: 4;
  }

  ${ElMultiSelectInputWrapper} ${ElDeprecatedIcon} {
    border: none;
    order: 0;
    padding-left: 0;
  }

  ${ElInput}, ${ElTextArea}, ${ElSelect} {
    order: 3;
  }

  ${ElInputError} {
    order: 5;
    width: 100%;
  }

  ${ElInput}[type='checkbox'], ${ElInput}[type='radio'] {
    ~ ${ElDeprecatedIcon} {
      box-shadow: none;
      padding-left: 0;
      padding-right: 0.5rem;
      border: none;
    }

    ~ ${ElInputAddOn} {
      box-shadow: none;
      padding-left: 0.5rem;
      border: none;
    }

    &:checked {
      ~ ${ElDeprecatedIcon}, ~ ${ElDeprecatedLabel}, ~ ${ElInputAddOn} {
        background: var(--white);
      }

      ~ ${ElInputAddOn} {
        color: var(--black);
      }
    }
  }

  ${ElInput}[type='checkbox'] {
    ~ ${ElDeprecatedLabel} {
      display: block;
    }
  }

  ${ElToggleRadioWrap},
  ${ElToggleLabel},
  ${ElMultiSelectInputWrapper} {
    order: 2;
    ~ ${ElDeprecatedLabel} {
      order: 1;
      padding: 0 0.5rem 0.5rem 0;
    }
  }

  ${ElInput}[type='radio'] ~ ${ElDeprecatedLabel} {
    order: 4;
    flex-basis: auto;
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0;
  }

  ${ElTextArea}:has(~ ${ElInputAddOn}),
  ${ElSelect}:has(~ ${ElInputAddOn}),
  ${ElInput}:not([type='checkbox']):not([type='radio']):has(~ ${ElInputAddOn}) {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${ElTextArea},
  ${ElSelect},
  ${ElInput}:not([type='checkbox']):not([type='radio']) {
    &:focus {
      ~ ${ElDeprecatedIcon}, ~ ${ElInputAddOn} {
        border-color: var(--intent-primary);
      }
    }

    &.${elHasInputError} {
      ~ ${ElDeprecatedIcon}, ~ ${ElInputAddOn} {
        border-color: var(--intent-danger);
        background-color: var(--red-100);
      }
    }

    &:disabled {
      ~ ${ElDeprecatedIcon}, ~ ${ElInputAddOn}, ~ ${ElDeprecatedLabel} {
        color: rgb(100 100 100 / 0.35);
      }
    }
  }

  ${ElInput}:not([type='checkbox']):not([type='radio']):has(~ ${ElDeprecatedIcon}) {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`
