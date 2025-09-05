/** Extract initial selected values from children Option components */
import { ReactNode } from 'react'
import { SelectedItem } from './select-custom'
import { Option } from './option'
import { Group } from './group'

/**
 * Extracts the initially selected values from a tree of Option and Group components.
 * Traverses the ReactNode children recursively to find Option components with the `selected` prop.
 *
 * @param {ReactNode} children - The children nodes of the Select component (can include Option and Group components).
 * @param {boolean} isMultiple - Indicates if multiple selections are allowed.
 * If false, only the first selected value is returned.
 * @returns {SelectedItem[]} An array of selected items, each containing `value` and `label`.
 */
export const getInitialSelected = (children: ReactNode, isMultiple: boolean): SelectedItem[] => {
  const selected: SelectedItem[] = []

  const traverse = (nodes: ReactNode) => {
    if (!nodes) return
    if (Array.isArray(nodes)) {
      nodes.forEach(traverse)
    } else if (typeof nodes === 'object' && 'props' in (nodes as any)) {
      const props: any = (nodes as any).props
      if ((nodes as any).type === Option && props.selected) {
        selected.push({ value: props.value, label: props.label })
      }
      // recursively traverse groups
      if ((nodes as any).type === Group) traverse(props.children)
    }
  }

  traverse(children)

  if (!isMultiple && selected.length > 1) {
    return [selected[0]]
  }

  return selected
}

/**
 * Counts the total number of Option components within a tree of ReactNode children.
 * Useful for determining if all options are selected to potentially disable the Select component.
 *
 * @param {ReactNode} nodes - The children nodes of the Select component (can include Option and Group components).
 * @returns {number} The total count of Option components.
 */
export const getTotalOptions = (nodes: ReactNode): number => {
  let count = 0

  const traverse = (children: ReactNode) => {
    if (!children) return
    if (Array.isArray(children)) {
      children.forEach(traverse)
    } else if (typeof children === 'object' && 'props' in (children as any)) {
      const props: any = (children as any).props
      if ((children as any).type === Option) count += 1
      if ((children as any).type === Group) traverse(props.children)
    }
  }

  traverse(nodes)
  return count
}
