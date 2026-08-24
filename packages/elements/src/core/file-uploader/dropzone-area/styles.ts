import { css } from "@linaria/core";
import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const elFileUploaderDropzoneFileInput = css`
  @layer elements.main {
    display: flex;
    width: 100%;
  }
`;

export const ElFileUploaderDropzone = styled.button`
  @layer elements.main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    border: var(--border-width-default) dashed var(--colour-border-neutral-light_darker);
    border-radius: var(--border-radius-l);
    background: transparent;
    color: var(--colour-text-tertiary);
    cursor: pointer;

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }

    &:hover,
    &[data-is-dragging-over="true"] {
      background: var(--comp-uploader-colour-fill-drop_area-hover);
    }

    &:disabled {
      cursor: not-allowed;
      background: var(--colour-fill-neutral-lightest);
      color: var(--colour-text-placeholder);
    }

    /* NOTE: this button is rendered as FileInput's children, so it's always a direct sibling of
     * the native, visually-hidden file input — see FileUploaderDropzoneArea's callers. :where(...)
     * keeps data-show-validity from adding specificity that would fight the
     * hover/dragging-over styles above. */
    input:where([data-show-validity="true"]):invalid + &,
    input:where([data-show-validity="true"]):user-invalid + & {
      border-color: var(--colour-border-error-default);
    }

    /* Fixed height, variable width — per Figma, the compact drop area's height doesn't grow with
     * its container. */
    &[data-variant="compact"] {
      flex-direction: row;
      gap: var(--spacing-2);
      height: var(--size-18);
      padding-inline: var(--spacing-6);
    }

    /* Resizable along both axes — height fills whatever a consumer's layout gives the trigger,
     * falling back to its padding-driven intrinsic height otherwise. */
    &[data-variant="large"] {
      flex-direction: column;
      gap: var(--spacing-3);
      height: 100%;
      padding: var(--spacing-10) var(--spacing-6);
    }
  }
`;

export const ElFileUploaderDropzoneIcon = styled.span`
  @layer elements.main {
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--colour-icon-secondary);

    [data-variant="compact"] & {
      width: var(--icon_size-md);
      height: var(--icon_size-md);
    }

    /* The large icon sits inside a bordered, unfilled circle — see Figma's "Icon wrapper". */
    [data-variant="large"] & {
      width: var(--icon_size-lg);
      height: var(--icon_size-lg);
      padding: var(--spacing-3);
      border: var(--border-width-default) solid var(--colour-border-neutral-light_darker);
      border-radius: var(--border-radius-3xl);
    }

    button:disabled & {
      color: var(--colour-icon-primary);
    }
  }
`;

export const ElFileUploaderDropzoneText = styled.div`
  @layer elements.main {
    ${font("base", "regular")}

    color: inherit;

    b,
    strong {
      ${font("base", "bold")}
    }

    [data-variant="large"] & {
      text-align: center;
    }

    &[data-slot="secondary"] {
      ${font("xs", "regular")}

      color: var(--comp-input-colour-text-info-helper);
    }

    button:disabled &[data-slot="secondary"] {
      color: inherit;
    }
  }
`;
