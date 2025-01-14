import { styled } from '@linaria/react'

export const ElBadge = styled.div`
  display: inline-flex;
  height: var(--size-5);
  padding: var(--spacing-half) var(--spacing-1);
  align-item: center;
  gap: var(--spacing-half);
  border-radius: var(--corner-default);
  color: var(--text-info);
  background: var(--fill-info-lightest);

  .el-icon {
    width: var(--icon-xs);
    height: var(--icon-xs);
    color: var(--icon-info);
  }

  &[data-variant='neutral'] {
    color: var(--text-info);
    background: var(--fill-info-lightest);
  }

  &[data-is-reversed='true'] {
    color: var(--text-white);
    background: var(--fill-info-dark);

    .el-icon {
      color: var(--icon-white);
    }
  }

  &[data-variant='success'] {
    color: var(--text-success);
    background: var(--fill-success-lightest);

    .el-icon {
      color: var(--icon-success);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-success-dark);

      .el-icon {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='pending'] {
    color: var(--text-pending);
    background: var(--fill-pending-lightest);

    .el-icon {
      color: var(--icon-pending);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-pending-dark);

      .el-icon {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='warning'] {
    color: var(--text-warning);
    background: var(--fill-warning-lightest);

    .el-icon {
      color: var(--icon-warning);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-warning-dark);

      .el-icon {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='danger'] {
    color: var(--text-error);
    background: var(--fill-error-lightest);

    .el-icon {
      color: var(--icon-error);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-error-dark);

      .el-icon {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='inactive'] {
    color: var(--text-secondary);
    background: var(--fill-default-lightest);

    .el-icon {
      color: var(--icon-secondary);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-default-medium);

      .el-icon {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='accent_1'] {
    color: var(--text-accent_1);
    background: var(--fill-accent_1-lightest);

    .el-icon {
      color: var(--icon-accent_1);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-accent_1-dark);

      .el-icon {
        color: var(--icon-white);
      }
    }
  }

  &[data-variant='accent_2'] {
    color: var(--text-accent_2);
    background: var(--fill-accent_2-lightest);

    .el-icon {
      color: var(--icon-accent_2);
    }

    &[data-is-reversed='true'] {
      color: var(--text-white);
      background: var(--fill-accent_2-dark);

      .el-icon {
        color: var(--icon-white);
      }
    }
  }
`

// Badge Label style
export const ElBadgeLabel = styled.span`
  text-align: center;
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-style: normal;
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
`
