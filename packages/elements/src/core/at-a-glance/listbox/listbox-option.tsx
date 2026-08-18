import { cx } from "@linaria/core";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import { Listbox } from "#src/utils/listbox";

import { AtAGlanceButtonCard } from "../button-card";
import { elAtAGlanceListboxOption } from "./styles";

export namespace AtAGlanceListboxOption {
  export interface BaseProps extends AtAGlanceButtonCard.Props, Listbox.OptionProps {
    /** Option value used in form submission and selection tracking */
    value: string;
  }

  export type Props<C extends ElementType = typeof AtAGlanceButtonCard> = BaseProps &
    Omit<ComponentPropsWithoutRef<C>, keyof BaseProps> & {
      /**
       * Element type to render for the option. Must be button-based.
       * Forward all props to the underlying `<button>` element for proper accessibility
       * and functionality.
       */
      as?: C;
    };
}

/**
 * Integrates `ButtonCard` with Listbox for selection interfaces.
 * Updates aria-selected/aria-checked state automatically and renders as
 * a native `<option>` when needed.
 *
 * @example
 * ```tsx
 * import { AtAGlance } from '@reapit/elements'
 *
 * <AtAGlance.Listbox name="plan" value={selected} onChange={handleChange}>
 *   <AtAGlance.ListboxOption
 *     value="basic"
 *     label="Basic Plan"
 *     description="Perfect for individuals"
 *     icon={<Icon />}
 *   />
 *   <AtAGlance.ListboxOption
 *     value="pro"
 *     label="Pro Plan"
 *     description="For teams"
 *     icon={<Icon />}
 *   />
 * </AtAGlance.Listbox>
 * ```
 */
export function AtAGlanceListboxOption<C extends ElementType = typeof AtAGlanceButtonCard>({
  as,
  className,
  ...rest
}: AtAGlanceListboxOption.Props<C>) {
  return (
    <Listbox.Option
      {...rest}
      as={as ?? AtAGlanceButtonCard}
      className={cx(elAtAGlanceListboxOption, className)}
    />
  );
}

AtAGlanceListboxOption.displayName = "AtAGlance.ListboxOption";
