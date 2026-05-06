import { version } from 'react'

const reactMajor = Number(version.split('.')[0])

/**
 * Returns the major version of React provided by the consumer.
 *
 * Exposed as a function so tests can mock the return value via
 * `vi.mocked(getReactMajor).mockReturnValue(...)`. Complements the
 * compile-time type detection provided by {@link IsReact19}.
 */
export function getReactMajor(): number {
  return reactMajor
}

/**
 * Resolves to `true` when the consumer's `@types/react` is React 19 or later.
 *
 * React 19 added first-class TypeScript support for Popover API attributes
 * (e.g. `popoverTarget`, `popoverTargetAction`) using camelCase names.
 * React 18 types do not include these attributes.
 *
 * Use alongside {@link getReactMajor} to handle both the type-level and runtime
 * differences between React versions.
 *
 * @example
 * type Props = IsReact19 extends true
 *   ? { popoverTarget: string }
 *   : { popovertarget: string }
 */
export type IsReact19 = 'popoverTarget' extends keyof React.ButtonHTMLAttributes<HTMLButtonElement> ? true : false
