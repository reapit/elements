import { useRef, useState, useSyncExternalStore } from 'react'

import type { FileUploadQueue } from './file-upload-queue'

/**
 * Diffs successive queue snapshots and returns an ever-growing list of announcement strings
 * suitable for an `aria-live="polite"` region. Never clears — stale content in a live region
 * is handled gracefully by screen readers, and clearing introduces timing complexity for no
 * UX benefit.
 *
 * Announcements produced per transition:
 * - Item newly `uploaded`            → `"{fileName} uploaded"`
 * - Item newly `error`               → `"{fileName} failed to upload: {errorMessage}"`
 * - Single-select replace: when a    → `"{oldFileName} replaced with {newFileName}"`
 *   file is replaced, the old item
 *   disappears before the new item
 *   finishes uploading. The hook
 *   parks the old filename in a
 *   pending-replace set; when the new
 *   item settles (uploaded or error),
 *   the parked name is correlated into
 *   a single replace announcement —
 *   consistent with how every other
 *   outcome is announced only on
 *   completion, not on queue.
 */
export function useFileUploaderAnnouncements(queue: FileUploadQueue<any>): string[] {
  const currentItems = useSyncExternalStore(queue.subscribe, queue.getItemsSnapshot)
  const prevItemsRef = useRef<FileUploadQueue.Item[]>([])
  // Names of items that disappeared from the snapshot while a single-select replace was in
  // progress. Cleared once matched to an incoming upload.
  const pendingReplaceNamesRef = useRef<string[]>([])
  const [announcements, setAnnouncements] = useState<string[]>([])

  const prevItems = prevItemsRef.current

  if (currentItems !== prevItems) {
    prevItemsRef.current = currentItems

    const prevById = new Map(prevItems.map((item) => [item.id, item]))
    const currentById = new Map(currentItems.map((item) => [item.id, item]))

    // Items that disappeared in this diff tick (present before, gone now).
    const removedItems = prevItems.filter((item) => !currentById.has(item.id))

    // Items that newly reached `uploaded` in this diff tick: either they're new to the
    // snapshot, or their status changed to `uploaded` from something else.
    const newlyUploaded = currentItems.filter((item) => {
      if (item.status !== 'uploaded') return false
      const prev = prevById.get(item.id)
      return !prev || prev.status !== 'uploaded'
    })

    // Items that newly reached `error` in this diff tick.
    const newlyErrored = currentItems.filter((item) => {
      if (item.status !== 'error') return false
      const prev = prevById.get(item.id)
      return !prev || prev.status !== 'error'
    })

    const next: string[] = []

    // Park any removed items as pending replacements when there are currently uploading items
    // in the new snapshot (i.e. this looks like a replace rather than a plain remove).
    const currentlyUploading = currentItems.filter((item) => item.status === 'uploading' || item.status === 'queued')
    if (removedItems.length > 0 && currentlyUploading.length > 0) {
      for (const removed of removedItems) {
        pendingReplaceNamesRef.current.push(removed.file.name)
      }
    } else if (removedItems.length > 0) {
      // Plain remove with nothing uploading — clear any stale pending replace names.
      pendingReplaceNamesRef.current = []
    }

    // Correlate newly-uploaded items with pending replace names.
    for (const item of newlyUploaded) {
      const pendingName = pendingReplaceNamesRef.current.shift()
      if (pendingName) {
        next.push(`${pendingName} replaced with ${item.file.name}`)
      } else {
        next.push(`${item.file.name} uploaded`)
      }
    }

    // If the upload failed, discard the pending replace name (no replace announcement).
    for (const item of newlyErrored) {
      pendingReplaceNamesRef.current.shift()
      if (item.status === 'error') {
        next.push(`${item.file.name} failed to upload: ${item.errorMessage}`)
      }
    }

    if (next.length > 0) {
      setAnnouncements((prev) => [...prev, ...next])
    }
  }

  return announcements
}
