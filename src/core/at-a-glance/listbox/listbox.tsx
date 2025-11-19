import { AtAGlanceListboxOption } from './listbox-option'
import { Listbox } from '#src/utils/listbox'
import { ElementType } from 'react'

export namespace AtAGlanceListbox {
  export type Props<C extends ElementType> = Listbox.Props<C>
}

/**
 * A listbox for at-a-glance. Built on the Listbox foundation. Used with `AtAGlance.Grid` or
 * `AtAGlance.Carousel`.
 *
 * This component enforces specific behavior for at-a-glance patterns:
 * - Always uses horizontal orientation
 * - Always uses toggle select action
 * - Selection never follows focus, allowing users to navigate options without changing
 *   the selection or triggering page content updates.
 */
export function AtAGlanceListbox<C extends ElementType>(props: AtAGlanceListbox.Props<C>) {
  return <Listbox {...props} aria-orientation="horizontal" selectAction="toggle" selectionFollowsFocus={false} />
}

AtAGlanceListbox.displayName = 'AtAGlance.Listbox'

AtAGlanceListbox.Option = AtAGlanceListboxOption
AtAGlanceListbox.getValue = Listbox.getValue
