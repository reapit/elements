import { useEffect } from "react";

import type { LocaleNumberSeparators } from "#src/utils/number-format";

import { getInputElement } from "./get-input-element";
import {
  classifyInputType,
  sanitisePastedText,
  resolvePaste,
  resolveKeystroke,
} from "./resolve-input";

// Use the native HTMLInputElement value setter so React's input value tracker
// still holds the previous value when we dispatch `input`. Assigning via
// `input.value` would update the tracker too, causing React's onChange to
// dedup the dispatched event and not fire.
// Guard the lookup so the module can be imported in non-DOM environments (SSR).
const nativeInputValueSetter =
  typeof HTMLInputElement !== "undefined"
    ? Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
    : undefined;

/**
 * Attaches a `beforeinput` listener to the input element identified by `inputId`.
 * The listener enforces numeric-only entry, normalises locale decimal separators
 * to `.`, and sanitises pasted or dropped content: delegating all decisions to
 * the pure functions in `resolve-input.ts`.
 *
 * `maxFractionDigits` controls precision: `0` restricts entry to integers
 * (`inputMode="numeric"`), a finite positive number caps the fractional part,
 * and `Infinity` (the default) allows unlimited decimal digits.
 */
export function useInputFilter(
  inputId: string,
  {
    separators,
    allowNegative,
    maxFractionDigits,
  }: { separators: LocaleNumberSeparators; allowNegative: boolean; maxFractionDigits: number },
): void {
  useEffect(() => {
    const input = getInputElement(inputId);
    if (!input) return;

    const commitValue = (newValue: string, cursorPos: number) => {
      nativeInputValueSetter?.call(input, newValue);
      input.setSelectionRange(cursorPos, cursorPos);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    };

    const handleBeforeInput = (event: InputEvent) => {
      const classification = classifyInputType({ data: event.data, inputType: event.inputType });
      if (classification === "ignore") return;

      const selection = {
        start: input.selectionStart ?? 0,
        end: input.selectionEnd ?? 0,
      };

      if (classification === "paste") {
        event.preventDefault();
        const sanitised = sanitisePastedText(event.data!, separators, maxFractionDigits);
        const resolution = resolvePaste({
          currentValue: input.value,
          selection,
          sanitised,
          allowNegative,
        });
        if (resolution.type === "commit") commitValue(resolution.value, resolution.cursor);
        return;
      }

      // classification === 'keystroke'
      const resolution = resolveKeystroke({
        currentValue: input.value,
        selection,
        data: event.data!,
        decimalSep: separators.decimal,
        allowNegative,
        maxFractionDigits,
      });

      if (resolution.type === "reject") {
        event.preventDefault();
      } else if (resolution.type === "commit") {
        event.preventDefault();
        commitValue(resolution.value, resolution.cursor);
      }
    };

    input.addEventListener("beforeinput", handleBeforeInput);
    return () => input.removeEventListener("beforeinput", handleBeforeInput);
  }, [allowNegative, maxFractionDigits, separators, inputId]);
}
