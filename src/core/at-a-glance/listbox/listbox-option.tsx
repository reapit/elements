import { AtAGlanceButtonCard } from '../button-card'
import { cx } from '@linaria/core'
import { elAtAGlanceListboxOption } from './styles'
import { Listbox } from '#src/utils/listbox'

export namespace AtAGlanceListboxOption {
  export interface Props extends AtAGlanceButtonCard.Props, Listbox.OptionProps {
    /** Option value used in form submission and selection tracking */
    value: string
  }
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
export function AtAGlanceListboxOption({ className, ...rest }: AtAGlanceListboxOption.Props) {
  return <Listbox.Option as={AtAGlanceButtonCard} {...rest} className={cx(elAtAGlanceListboxOption, className)} />
}

AtAGlanceListboxOption.displayName = 'AtAGlance.ListboxOption'
