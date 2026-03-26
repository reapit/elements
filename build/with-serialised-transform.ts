import type { Plugin } from 'vite'

/**
 * Wraps a Vite plugin's `transform` hook so that invocations run one at a
 * time rather than concurrently.
 *
 * Vite 8 uses Rolldown, which invokes plugin `transform` hooks with higher
 * parallelism than Rollup did. The `@wyw-in-js/vite` plugin shares mutable
 * state (a `TransformCacheCollection`) across concurrent transforms, which
 * causes an intermittent `AbortError` when one transform supersedes another
 * in-flight entrypoint.
 *
 * The sibling `@wyw-in-js/rollup` package already serialises transforms by
 * default (via `serializeTransform`, added in PR #203), but the Vite plugin
 * does not. This wrapper applies the same promise-chain mutex approach.
 *
 * Remove this wrapper once `@wyw-in-js/vite` gains equivalent serialisation
 * support natively.
 *
 * @see https://github.com/Anber/wyw-in-js/pull/203
 * @see https://github.com/Anber/wyw-in-js/issues/54
 */
export function withSerialisedTransform(plugin: Plugin): Plugin {
  const original = plugin.transform
  if (original == null) return plugin

  const handler = typeof original === 'object' ? original.handler : original
  if (handler == null) return plugin

  let queue = Promise.resolve<unknown>(undefined)

  const serialisedHandler: typeof handler = function (...args) {
    let release: () => void
    const previous = queue
    queue = new Promise<void>((resolve) => {
      release = resolve
    })

    return previous.then(async () => {
      try {
        return await handler.apply(this, args)
      } finally {
        release!()
      }
    })
  }

  plugin.transform = typeof original === 'object' ? { ...original, handler: serialisedHandler } : serialisedHandler

  return plugin
}
