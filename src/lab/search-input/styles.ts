import { font } from '#src/core/text/index'
import { styled } from '@linaria/react'

export const ELInput = styled.input`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: var(--comp-input-colour-text-default-placeholder);
  }
`

export const ELSearchInput = styled.div`
  display: flex;
  align-items: center;
  border-radius: var(--comp-input-border-radius);
  border: var(--comp-input-border-width) solid var(--comp-input-colour-border-default);
  background: var(--comp-input-colour-fill-default-background);
  gap: var(--spacing-2);

  .el-icon {
    flex-shrink: 0;
  }

  .el-button[data-size='small'][data-is-icon-only='true'] {
    width: var(--size-6);
    height: var(--size-6);

    .el-icon {
      width: var(--icon_size-m);
      height: var(--icon_size-m);
    }
  }

  &[aria-disabled='true'] {
    background: var(--comp-input-colour-fill-disabled-background);
    pointer-events: none;
  }

  &[data-size='small'] {
    height: var(--size-8);
    padding: 0 var(--spacing-1) 0 var(--spacing-2);

    input {
      ${font('xs', 'regular')}
    }

    .el-button[data-size='small'][data-is-icon-only='true'] {
      .el-icon {
        width: var(--icon_size-s);
        height: var(--icon_size-s);
      }
    }
  }

  &[data-size='medium'] {
    height: var(--size-9);
    padding: 0 var(--spacing-2) 0 var(--spacing-3);

    input {
      ${font('sm', 'regular')}
    }
  }

  &[data-size='large'] {
    height: var(--size-10);
    padding: var(--spacing-2) var(--spacing-2) var(--spacing-2) var(--spacing-3);

    input {
      ${font('base', 'regular')}
    }
  }
`
