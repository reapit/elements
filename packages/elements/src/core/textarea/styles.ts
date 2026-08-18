import { styled } from "@linaria/react";
import type { CSSProperties } from "react";

import { font } from "#src/utils/font";

import type { ContentFieldSizing, FixedFieldSizing, ManualFieldSizing } from "./types";

interface TextareaCSSProperties extends CSSProperties {
  "--textarea-max-rows"?: number;
  "--textarea-min-rows"?: number;
}

export interface ElTextareaProps {
  "data-field-sizing": ContentFieldSizing | FixedFieldSizing | ManualFieldSizing;
  "data-show-validity": boolean;
  "data-size": "small" | "medium" | "large";
  style?: TextareaCSSProperties;
}

export const ElTextarea = styled.textarea<ElTextareaProps>`
  @layer elements.main {
    /* NOTE: These are public CSS variables that we use to allow CSS-only consumers
     * to define the maximum and minimum rows the text area should resize between.
     * We do this ourselves instead of leveraging Linaria's dynamic styles because
     * that approach results in randomly-named CSS variables, which would not provide
     * a friendly interface for CSS-only consumers. */
    --textarea-max-rows: infinity;
    --textarea-min-rows: 2;

    /* NOTE: These are "private" CSS variables that we use to avoid repetition. They
     * should never be overridden by consumers. */
    --textarea-border-width: var(--comp-input-border-width);
    --textarea-padding-x: var(--spacing-3);
    --textarea-padding-y: var(--spacing-2);

    --textarea-background-colour: var(--comp-input-colour-fill-default-background);
    --textarea-colour: var(--comp-input-colour-text-default-input);
    --textarea-border-colour: var(--comp-input-colour-border-default);
    --textarea-placeholder-colour: var(--comp-input-colour-text-default-placeholder);

    background-color: var(--textarea-background-colour);
    color: var(--textarea-colour);

    border: var(--textarea-border-width) solid var(--textarea-border-colour);
    border-radius: var(--comp-input-border-radius);

    padding: var(--textarea-padding-y) var(--textarea-padding-x);
    resize: none;
    width: 100%;

    /* We use CSS to calulate the max/min block size of the text area based on the max/min number of rows
     * that have been specified. We use block-size instead of height because the latter is not writing-mode aware.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size */
    max-block-size: calc(
      1lh * var(--textarea-max-rows) + 2 *
        (var(--textarea-padding-y) + var(--textarea-border-width))
    );
    min-block-size: max(
      var(--textarea-min-block-size),
      calc(
        1lh * var(--textarea-min-rows) + 2 *
          (var(--textarea-padding-y) + var(--textarea-border-width))
      )
    );

    &::placeholder {
      color: var(--textarea-placeholder-colour);
      font: inherit;
    }

    &[data-size="small"] {
      --textarea-min-block-size: var(--size-16);
      ${font("xs", "regular")}
    }
    /* NOTE: medium is the default size */
    &,
    &[data-size="medium"] {
      --textarea-min-block-size: var(--size-20);
      ${font("sm", "regular")}
    }
    &[data-size="large"] {
      --textarea-min-block-size: var(--size-24);
      ${font("base", "regular")}
    }

    &[data-field-sizing="content"] {
      /* NOTE: field-sizing property is currently experimental
       * @see https://drafts.csswg.org/css-ui/#field-sizing
       * @see https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing */
      @supports (field-sizing: content) {
        field-sizing: content;
      }
    }

    &[data-field-sizing="fixed"] {
      /* NOTE: field-sizing property is currently experimental
       * @see https://drafts.csswg.org/css-ui/#field-sizing
       * @see https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing */
      @supports (field-sizing: fixed) {
        field-sizing: fixed;
      }
    }

    &[data-field-sizing="manual"] {
      resize: both;
    }

    /* NOTE: aria-invalid="true" is also supported as an alternative to the native :invalid
     * pseudo-class, for cases where the element is not natively invalid (e.g. server-side
     * validation). */
    &:invalid:where([data-show-validity="true"]),
    &:user-invalid:where([data-show-validity="true"]),
    &:where([aria-invalid="true"][data-show-validity="true"]) {
      --textarea-colour: var(--comp-input-colour-text-error-input);
      --textarea-background-colour: var(--comp-input-colour-fill-error-background);
      --textarea-border-colour: var(--comp-input-colour-border-error);
      --textarea-placeholder-colour: var(--comp-input-colour-text-error-placeholder);
    }

    &:focus {
      outline: none;
      --textarea-colour: var(--comp-input-colour-text-focused-input);
      --textarea-background-colour: var(--comp-input-colour-fill-focused-background);
      --textarea-border-colour: var(--comp-input-colour-border-focused);
    }

    &:disabled {
      --textarea-colour: var(--comp-input-colour-text-disabled-input);
      --textarea-background-colour: var(--comp-input-colour-fill-disabled-background);
      --textarea-border-colour: var(--comp-input-colour-border-disabled);
      --textarea-placeholder-colour: var(--comp-input-colour-text-disabled-placeholder);
    }

    &:read-only:not(:disabled) {
      --textarea-colour: var(--comp-input-colour-text-read_only-input);
      --textarea-background-colour: var(--comp-input-colour-fill-read_only-background);
      --textarea-border-colour: var(--comp-input-colour-fill-read_only-background);
      --textarea-placeholder-colour: var(--comp-input-colour-text-read_only-placeholder);
    }
  }
`;

export const ElShadowTextarea = styled(ElTextarea)`
  @layer elements.main {
    position: absolute;
    height: 0;
    left: 0;
    overflow: hidden;
    top: 0;
    transform: translateZ(0);
    visibility: hidden;
  }
`;
