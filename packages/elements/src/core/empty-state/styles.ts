import { styled } from "@linaria/react";

export const ElEmptyState = styled.div`
  @layer elements.main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    width: 100%;
    overflow: hidden;

    &[data-background="transparent"] {
      background-color: transparent;
    }

    &[data-background="neutral-lightest"] {
      background-color: var(--colour-fill-neutral-lightest);
    }

    &[data-background="white"] {
      background-color: var(--colour-fill-white);
    }

    &[data-size="small"] {
      gap: var(--spacing-4);
      padding: var(--spacing-8) var(--spacing-6);
      border-radius: var(--border-radius-l);
      max-width: var(--size-112);
    }

    &[data-size="large"] {
      gap: var(--spacing-5);
      padding: var(--spacing-10) var(--spacing-8);
      border-radius: var(--border-radius-xl);
      max-width: var(--size-160);
    }
  }
`;
