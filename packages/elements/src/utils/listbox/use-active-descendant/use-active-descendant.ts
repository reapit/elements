import type { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from "react";

import { OPTION_SELECTOR } from "../dom-helpers";
import { getListboxSelectElement } from "../dom-helpers/common";
import {
  activateOption,
  clearActiveOption,
  clickOption,
  getInitialActiveOption,
  navigateActiveDescendant,
} from "./dom";

function isKeyboardFocus(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && target.matches(":focus-visible");
}

export namespace useActiveDescendant {
  export interface Input {
    /**
     * ID of the element that should receive aria-activedescendant as options are navigated,
     * instead of the listbox container itself. Use this when a different element owns focus
     * throughout the interaction (e.g. a search input in an Autocomplete). Defaults to the
     * listbox container.
     */
    activeDescendantOwnerId?: string;
    /** Keydown handler composed before internal keyboard navigation. Call event.preventDefault() to opt out of the built-in navigation. */
    onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
    /** Mousedown handler composed before the internal focus-retention guard */
    onMouseDown?: MouseEventHandler<HTMLDivElement>;
  }

  export interface Output {
    /** Clears the active descendant when focus leaves the listbox */
    onBlur: FocusEventHandler<HTMLDivElement>;
    /** Sets the initial active descendant when keyboard focus enters the listbox */
    onFocus: FocusEventHandler<HTMLDivElement>;
    /** Navigates options via aria-activedescendant in response to arrow keys */
    onKeyDown: KeyboardEventHandler<HTMLDivElement>;
    /**
     * Retains DOM focus on the listbox container when the user clicks within it.
     * Prevents option buttons from stealing focus while still allowing click events
     * to fire. Explicitly focuses the container when it is not already focused,
     * unless the listbox has tabIndex={-1} (e.g. when paired with a SearchInput).
     */
    onMouseDown: MouseEventHandler<HTMLDivElement>;
    /** Activates the clicked option so data-is-active tracks mouse interaction */
    onClick: MouseEventHandler<HTMLDivElement>;
  }
}

/**
 * Manages focus behaviour and keyboard navigation for a listbox.
 *
 * Provides event handlers implementing the ARIA listbox keyboard interaction pattern
 * using aria-activedescendant instead of roving tabindex. The listbox container retains
 * real DOM focus throughout; individual option elements never receive DOM focus.
 * aria-activedescendant on the container guides screen readers; data-is-active on the
 * current option drives visual state.
 *
 * data-is-active is set imperatively via the DOM (el.dataset.isActive), bypassing React's
 * render cycle. This is intentional — going through React state would trigger a re-render
 * on every arrow key press. React components cannot read data-is-active as a prop; use CSS
 * [data-is-active='true'] for styling instead.
 */
export function useActiveDescendant({
  activeDescendantOwnerId,
  onKeyDown,
  onMouseDown,
}: useActiveDescendant.Input): useActiveDescendant.Output {
  const resolveAriaOwner = (listboxElement: HTMLElement): HTMLElement =>
    (activeDescendantOwnerId && document.getElementById(activeDescendantOwnerId)) || listboxElement;

  const handleFocus: FocusEventHandler<HTMLDivElement> = (event) => {
    const listboxElement = event.currentTarget;
    const ariaOwner = resolveAriaOwner(listboxElement);
    const selectElement = getListboxSelectElement(listboxElement);
    const selectionFollowsFocus = listboxElement.dataset.selectionFollowsFocus === "true";
    const { relatedTarget, target } = event;

    const isKeyboard = isKeyboardFocus(target);
    const isFocusFromOutside = !listboxElement.contains(relatedTarget);

    if (isFocusFromOutside) {
      if (event.isTrusted) {
        // Proxy the focus event onto the hidden select so onFocus callbacks fire.
        selectElement.dispatchEvent(
          new FocusEvent("focusin", {
            bubbles: true,
            cancelable: true,
            relatedTarget: event.relatedTarget,
          }),
        );
      }

      if (isKeyboard) {
        const initialOption = getInitialActiveOption(listboxElement);
        if (initialOption) {
          activateOption(ariaOwner, initialOption);
          const isAlreadySelected =
            (initialOption as HTMLElement).getAttribute("aria-selected") === "true" ||
            (initialOption as HTMLElement).getAttribute("aria-checked") === "true";
          if (selectionFollowsFocus && !isAlreadySelected) {
            clickOption(initialOption);
          }
        }
      }
    }
  };

  const handleBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    const listboxElement = event.currentTarget;
    const ariaOwner = resolveAriaOwner(listboxElement);
    const selectElement = getListboxSelectElement(listboxElement);

    if (!listboxElement.contains(event.relatedTarget)) {
      clearActiveOption(ariaOwner, listboxElement);

      if (event.isTrusted) {
        // Proxy the blur event onto the hidden select so onBlur callbacks fire.
        selectElement.dispatchEvent(
          new FocusEvent("focusout", {
            bubbles: true,
            cancelable: true,
            relatedTarget: event.relatedTarget,
          }),
        );
      }
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const listboxElement = event.currentTarget;
    const ariaOwner = resolveAriaOwner(listboxElement);
    const selectionFollowsFocus = listboxElement.dataset.selectionFollowsFocus === "true";

    navigateActiveDescendant(event, { ariaOwner, listboxElement, selectionFollowsFocus });
  };

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    onMouseDown?.(event);
    if (event.target === event.currentTarget) return;
    event.preventDefault();
    const el = event.currentTarget;
    if (el.tabIndex >= 0 && document.activeElement !== el) {
      el.focus();
    }
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const option = target.closest<HTMLElement>(OPTION_SELECTOR);
    if (option) {
      const ariaOwner = resolveAriaOwner(event.currentTarget);
      activateOption(ariaOwner, option);
    }
  };

  return {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onMouseDown: handleMouseDown,
    onClick: handleClick,
  };
}
