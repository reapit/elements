import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const ElStatusIndicator = styled.strong`
  @layer elements.main {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);

    color: var(--comp-status-colour-text-neutral);
    ${font("sm", "regular")}

    white-space: nowrap;

    &::before {
      content: "";
      width: var(--size-2);
      height: var(--size-2);
      border-radius: 100%;
      flex-shrink: 0;
    }

    &[data-variant="neutral"]::before {
      background: var(--comp-status-colour-icon-neutral);
    }

    &[data-variant="success"]::before {
      background: var(--comp-status-colour-icon-success);
    }

    &[data-variant="pending"]::before {
      background: var(--comp-status-colour-icon-pending);
    }

    &[data-variant="warning"]::before {
      background: var(--comp-status-colour-icon-warning);
    }

    &[data-variant="danger"]::before {
      background: var(--comp-status-colour-icon-danger);
    }

    &[data-variant="inactive"]::before {
      background: var(--comp-status-colour-icon-inactive);
    }

    &[data-variant="accent_1"]::before {
      background: var(--comp-status-colour-icon-accent_1);
    }

    &[data-variant="accent_2"]::before {
      background: var(--comp-status-colour-icon-accent_2);
    }
  }
`;
