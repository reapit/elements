import { styled } from "@linaria/react";

import { font } from "#src/utils/font";

export const ElFormControlErrorText = styled.p`
  @layer elements.main {
    display: block;
    color: var(--comp-input-colour-text-info-error);

    font: inherit;

    margin: 0;
    padding: 0;

    /* By default, we simply inherit from the parent FormControl's font styles. These styles allow for
     * that sizing to be overridden. */
    &[data-size="small"],
    &[data-size="medium"] {
      ${font("xs", "regular")}
    }
    &[data-size="large"] {
      ${font("sm", "regular")}
    }
  }
`;
