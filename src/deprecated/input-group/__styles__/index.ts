import { styled } from '@linaria/react'
import { ElInput, elHasInputError } from '../../input/__styles__'
import { ElTextarea } from '../../../core/textarea/styles'
import { ElDeprecatedSelect } from '../../select/__styles__'
import { ElInputAddOn } from '../../input-add-on/__styles__'
import { ElMultiSelectInputWrapper } from '../../multi-select/__styles__'
import { ElInputError } from '../../input-error/__styles__'

/** @deprecated */
export const ElInputGroupLabel = styled.label`
  font-size: 0.875rem /* was --font-size-small */;
  color: var(--colour-text-secondary);
`

/** @deprecated */
export const ElInputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${ElInputGroupLabel} {
    order: 1;
    flex-basis: 100%;
    padding: 0 0.5rem 0.5rem 0;
  }

  ${ElInputAddOn} {
    border: 1px solid #d8dee4 /* was --component-input-border */;
    border-left: none;
    padding-right: 0.5rem;
    align-items: center;
    display: flex;
    order: 4;
  }

  ${ElInput}, ${ElTextarea}, ${ElDeprecatedSelect} {
    order: 3;
  }

  ${ElInputError} {
    order: 5;
    width: 100%;
  }

  ${ElInput}[type='checkbox'], ${ElInput}[type='radio'] {
    ~ ${ElInputAddOn} {
      box-shadow: none;
      padding-left: 0.5rem;
      border: none;
    }

    &:checked {
      ~ ${ElInputGroupLabel}, ~ ${ElInputAddOn} {
        background: var(--colour-fill-white);
      }

      ~ ${ElInputAddOn} {
        color: var(--colour-text-primary);
      }
    }
  }

  ${ElInput}[type='checkbox'] {
    ~ ${ElInputGroupLabel} {
      display: block;
    }
  }

  ${ElMultiSelectInputWrapper} {
    order: 2;
    ~ ${ElInputGroupLabel} {
      order: 1;
      padding: 0 0.5rem 0.5rem 0;
    }
  }

  ${ElInput}[type='radio'] ~ ${ElInputGroupLabel} {
    order: 4;
    flex-basis: auto;
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0;
  }

  ${ElTextarea}:has(~ ${ElInputAddOn}),
  ${ElDeprecatedSelect}:has(~ ${ElInputAddOn}),
  ${ElInput}:not([type='checkbox']):not([type='radio']):has(~ ${ElInputAddOn}) {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${ElTextarea},
  ${ElDeprecatedSelect},
  ${ElInput}:not([type='checkbox']):not([type='radio']) {
    &:focus {
      ~ ${ElInputAddOn} {
        border-color: var(--colour-fill-action-dark);
      }
    }

    &.${elHasInputError} {
      ~ ${ElInputAddOn} {
        border-color: var(--colour-fill-error-dark);
        background-color: var(--colour-fill-error-lightest);
      }
    }

    &:disabled {
      ~ ${ElInputAddOn}, ~ ${ElInputGroupLabel} {
        color: rgb(100 100 100 / 0.35);
      }
    }
  }
`
