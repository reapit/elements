import { FileUploadQueue } from '../file-upload-queue'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

function makeFile(name: string, size = 100, type = 'text/plain'): File {
  return new File([new Uint8Array(size)], name, { type })
}

// `FileList` has no public constructor outside a real `<input>`, so this stubs the minimal
// array-like shape `Array.from()` needs (a `length` plus indexed access) to exercise `addFiles`'s
// `FileList` branch without a DOM element.
function makeFileList(files: File[]): FileList {
  const fileList: Record<number, File> & { length: number } = { length: files.length }
  files.forEach((file, index) => {
    fileList[index] = file
  })
  return fileList as unknown as FileList
}

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

// Fake timers are active for every test in this file, so `vi.waitFor`'s internal polling (which
// itself uses `setTimeout`) would never fire. Awaiting a real `Promise.resolve()` a few times
// flushes pending microtasks (the queue's own `.then` handlers) without needing timers at all.
async function flushMicrotasks(): Promise<void> {
  for (let i = 0; i < 5; i++) await Promise.resolve()
}

test('addFiles() queues accepted files', () => {
  const queue = new FileUploadQueue()
  queue.addFiles([makeFile('a.txt')])

  const [item] = queue.getSnapshot()
  expect(item.status).toBe('queued')
  expect(item.file.name).toBe('a.txt')
  expect(typeof item.id).toBe('string')
  expect(item.validationError).toBeUndefined()
})

test('addFiles() marks files that fail validation with a validationError, but keeps them queued', () => {
  const queue = new FileUploadQueue()
  queue.addFiles([makeFile('too-big.txt', 100)], { maxFileSize: 10 })

  const [item] = queue.getSnapshot()
  expect(item.status).toBe('queued')
  expect(item.validationError).toMatch(/maximum size/i)
})

test('addFiles() derives readable validationError messages for each rejection reason', () => {
  const acceptQueue = new FileUploadQueue()
  acceptQueue.addFiles([makeFile('a.txt')], { accept: 'image/*' })
  expect(acceptQueue.getSnapshot()[0]).toMatchObject({ status: 'queued', validationError: 'File type not accepted' })

  // maxFiles: 1 only triggers replace semantics on a *subsequent* addFiles call when a slot is
  // already occupied — within one call, two files at once still validates 'multiple' first.
  const multipleQueue = new FileUploadQueue()
  multipleQueue.addFiles([makeFile('a.txt'), makeFile('b.txt')], { maxFiles: 1 })
  expect(multipleQueue.getSnapshot()[1]).toMatchObject({
    status: 'queued',
    validationError: 'Only one file may be selected',
  })

  // maxFiles: 1 triggers replace semantics instead of a maxFiles rejection — use 2 to hit the
  // maxFiles rejection path directly without replace kicking in.
  const maxFilesQueue = new FileUploadQueue()
  maxFilesQueue.addFiles([makeFile('a.txt'), makeFile('b.txt'), makeFile('c.txt')], { maxFiles: 2 })
  expect(maxFilesQueue.getSnapshot()[2]).toMatchObject({
    status: 'queued',
    validationError: 'Maximum number of files exceeded (2)',
  })

  const maxTotalSizeQueue = new FileUploadQueue()
  maxTotalSizeQueue.addFiles([makeFile('a.txt', 100)], { maxTotalSize: 10 })
  expect(maxTotalSizeQueue.getSnapshot()[0]).toMatchObject({ status: 'queued' })
  expect(maxTotalSizeQueue.getSnapshot()[0].validationError).toMatch(/maximum/i)
})

test('addFiles() with maxFiles 1 replaces the existing item rather than rejecting', () => {
  const queue = new FileUploadQueue()
  queue.addFiles([makeFile('a.txt')], { maxFiles: 1 })
  const firstId = queue.getSnapshot()[0].id

  queue.addFiles([makeFile('b.txt')], { maxFiles: 1 })

  const snapshot = queue.getSnapshot()
  expect(snapshot).toHaveLength(1)
  expect(snapshot[0].id).not.toBe(firstId)
  expect(snapshot[0].file.name).toBe('b.txt')
})

test('addFiles() with maxFiles 1 aborts an in-flight upload before replacing', async () => {
  const abortSpy = vi.spyOn(AbortController.prototype, 'abort')
  const first = deferred<string>()
  const onUpload = vi.fn().mockReturnValueOnce(first.promise).mockReturnValueOnce(Promise.resolve('id-2'))
  const queue = new FileUploadQueue({ onUpload })

  queue.addFiles([makeFile('a.txt')], { maxFiles: 1 })
  expect(queue.getSnapshot()[0].status).toBe('uploading')

  queue.addFiles([makeFile('b.txt')], { maxFiles: 1 })

  expect(abortSpy).toHaveBeenCalledTimes(1)
  expect(queue.getSnapshot()).toHaveLength(1)
  expect(queue.getSnapshot()[0].file.name).toBe('b.txt')
})

test('addFiles() accepts a FileList as well as a File[]', () => {
  const queue = new FileUploadQueue()
  queue.addFiles(makeFileList([makeFile('a.txt'), makeFile('b.txt')]))

  const snapshot = queue.getSnapshot()
  expect(snapshot.map((item) => item.file.name)).toEqual(['a.txt', 'b.txt'])
})

test('updateConstraints() re-projects validity onto existing items without adding files', () => {
  const queue = new FileUploadQueue()
  queue.addFiles([makeFile('a.txt'), makeFile('b.txt'), makeFile('c.txt')], { maxFiles: 3 })
  expect(queue.getSnapshot().every((item) => item.validationError === undefined)).toBe(true)

  queue.updateConstraints({ maxFiles: 2 })

  const snapshot = queue.getSnapshot()
  expect(snapshot[0].validationError).toBeUndefined()
  expect(snapshot[1].validationError).toBeUndefined()
  expect(snapshot[2].validationError).toMatch(/maximum number of files/i)
})

test('removeItem() re-projects validity, relaxing constraints for the remaining items', () => {
  const queue = new FileUploadQueue()
  queue.addFiles([makeFile('a.txt'), makeFile('b.txt'), makeFile('c.txt')], { maxFiles: 2 })
  const [first, , third] = queue.getSnapshot()
  expect(third.validationError).toMatch(/maximum number of files/i)

  queue.removeItem(first.id)

  const snapshot = queue.getSnapshot()
  expect(snapshot.map((item) => item.file.name)).toEqual(['b.txt', 'c.txt'])
  expect(snapshot.every((item) => item.validationError === undefined)).toBe(true)
})

test('a queued item that flips from invalid to valid starts uploading', async () => {
  const onUpload = vi.fn().mockResolvedValue('id-1')
  const queue = new FileUploadQueue({ onUpload })

  queue.addFiles([makeFile('a.txt'), makeFile('b.txt')], { maxFiles: 1 })
  expect(onUpload).toHaveBeenCalledTimes(1)
  expect(queue.getSnapshot()[1]).toMatchObject({ status: 'queued' })
  expect(queue.getSnapshot()[1].validationError).toBeDefined()

  queue.updateConstraints({ maxFiles: 2 })

  expect(onUpload).toHaveBeenCalledTimes(2)
  expect(queue.getSnapshot()[1].status).toBe('uploading')
})

test('an item that becomes invalid while uploading is not aborted, and one that becomes invalid after uploading keeps its result', async () => {
  const onUpload = vi.fn().mockResolvedValue('id-1')
  const queue = new FileUploadQueue({ onUpload })

  queue.addFiles([makeFile('a.txt')], { maxFiles: 2 })
  expect(queue.getSnapshot()[0].status).toBe('uploading')

  queue.updateConstraints({ maxFiles: 0 })
  expect(queue.getSnapshot()[0].status).toBe('uploading')
  expect(queue.getSnapshot()[0].validationError).toBeDefined()

  await flushMicrotasks()

  const [item] = queue.getSnapshot()
  expect(item.status).toBe('uploaded')
  expect(item.validationError).toBeDefined()
  if (item.status === 'uploaded') expect(item.fileId).toBe('id-1')
})

test('happy path: queued -> uploading -> uploaded, with fileId derived from the raw string result', async () => {
  const onUpload = vi.fn().mockResolvedValue('server-id-1')
  const queue = new FileUploadQueue({ onUpload })

  queue.addFiles([makeFile('a.txt')])
  expect(queue.getSnapshot()[0].status).toBe('uploading')

  await flushMicrotasks()
  expect(queue.getSnapshot()[0].status).toBe('uploaded')

  const [item] = queue.getSnapshot()
  if (item.status === 'uploaded') {
    expect(item.fileId).toBe('server-id-1')
    expect(item.result).toBe('server-id-1')
  }
})

test('happy path with a custom getFileId', async () => {
  const onUpload = vi.fn().mockResolvedValue({ id: 'abc', url: 'https://example.com/abc' })
  const queue = new FileUploadQueue<{ id: string; url: string }>({ onUpload, getFileId: (result) => result.id })

  queue.addFiles([makeFile('a.txt')])
  await flushMicrotasks()
  expect(queue.getSnapshot()[0].status).toBe('uploaded')

  const [item] = queue.getSnapshot()
  if (item.status === 'uploaded') {
    expect(item.fileId).toBe('abc')
    expect(item.result).toEqual({ id: 'abc', url: 'https://example.com/abc' })
  }
})

test('setFileId() records the ID immediately, before the upload resolves, and it survives into `uploaded`', async () => {
  const { promise, resolve } = deferred<string>()
  const onUpload = vi.fn((_file: File, helpers: FileUploadQueue.UploadHelpers) => {
    helpers.setFileId('early-id')
    return promise
  })
  const queue = new FileUploadQueue({ onUpload })

  queue.addFiles([makeFile('a.txt')])

  const [uploading] = queue.getSnapshot()
  expect(uploading.status).toBe('uploading')
  if (uploading.status === 'uploading') expect(uploading.fileId).toBe('early-id')

  resolve('final-result')
  await flushMicrotasks()
  expect(queue.getSnapshot()[0].status).toBe('uploaded')

  const [uploaded] = queue.getSnapshot()
  if (uploaded.status === 'uploaded') {
    expect(uploaded.fileId).toBe('early-id')
  }
})

test('progress is throttled: rapid onProgress calls collapse into fewer notifications, latest value always wins', async () => {
  let capturedOnProgress: ((progress: number) => void) | undefined
  const { promise, resolve } = deferred<string>()
  const onUpload = vi.fn((_file: File, helpers: FileUploadQueue.UploadHelpers) => {
    capturedOnProgress = helpers.onProgress
    return promise
  })
  const queue = new FileUploadQueue({ onUpload })

  queue.addFiles([makeFile('a.txt')])

  const listener = vi.fn()
  queue.subscribe(listener)
  listener.mockClear()

  capturedOnProgress?.(10)
  const notifyCountAfterFirst = listener.mock.calls.length
  expect(notifyCountAfterFirst).toBeGreaterThan(0)

  capturedOnProgress?.(20)
  capturedOnProgress?.(30)
  capturedOnProgress?.(40)

  // Rapid-fire calls within the throttle window shouldn't each trigger a synchronous notify.
  expect(listener.mock.calls.length).toBe(notifyCountAfterFirst)

  vi.advanceTimersByTime(150)

  const [item] = queue.getSnapshot()
  if (item.status === 'uploading') {
    expect(item.progress).toBe(40)
  }

  resolve('done')
})

test('progress: a trailing throttle timer is cleared, not orphaned, when a later call takes the immediate-notify branch', async () => {
  let capturedOnProgress: ((progress: number) => void) | undefined
  const { promise } = deferred<string>()
  const onUpload = vi.fn((_file: File, helpers: FileUploadQueue.UploadHelpers) => {
    capturedOnProgress = helpers.onProgress
    return promise
  })
  // A high delay keeps the unrelated loading-indicator timer from also firing during the
  // `advanceTimersByTime` below, so the assertion isolates the progress-throttle timer only.
  const queue = new FileUploadQueue({ onUpload, minLoadingIndicatorDelayMs: 100_000 })

  queue.addFiles([makeFile('a.txt')])

  const listener = vi.fn()
  queue.subscribe(listener)

  // `vi.setSystemTime` moves `Date.now()` forward without advancing the fake timer clock that
  // drives `setTimeout` — reproducing the real-world race where wall-clock time passes enough to
  // take the immediate-notify branch before a still-pending trailing timer's callback runs.
  const start = Date.now()
  capturedOnProgress?.(10) // immediate notify (no prior throttle entry): lastNotifiedAt = start
  vi.setSystemTime(new Date(start + 10))
  capturedOnProgress?.(20) // elapsed (10) < throttle window: schedules a trailing timer
  vi.setSystemTime(new Date(start + 110))
  capturedOnProgress?.(30) // elapsed (110) >= throttle window: immediate branch — must clear the pending trailing timer

  // Only the (irrelevantly-delayed) loading-indicator timer should remain pending; an orphaned
  // trailing throttle timer would leave this at 2.
  expect(vi.getTimerCount()).toBe(1)

  listener.mockClear()
  vi.advanceTimersByTime(500) // if the trailing timer were left orphaned, it would fire here

  expect(listener).not.toHaveBeenCalled()
})

test('setProcessing() transitions to processing and drops progress', async () => {
  let helpersRef: FileUploadQueue.UploadHelpers | undefined
  const { promise } = deferred<string>()
  const onUpload = vi.fn((_file: File, helpers: FileUploadQueue.UploadHelpers) => {
    helpersRef = helpers
    return promise
  })
  const queue = new FileUploadQueue({ onUpload })

  queue.addFiles([makeFile('a.txt')])
  helpersRef?.onProgress(55)
  helpersRef?.setProcessing()

  const [item] = queue.getSnapshot()
  expect(item.status).toBe('processing')
})

test('isLoadingIndicatorVisible stays false for uploads that resolve before minLoadingIndicatorDelayMs', async () => {
  const onUpload = vi.fn().mockResolvedValue('id')
  const queue = new FileUploadQueue({ onUpload, minLoadingIndicatorDelayMs: 300 })

  queue.addFiles([makeFile('a.txt')])
  const [item] = queue.getSnapshot()
  if (item.status === 'uploading') expect(item.isLoadingIndicatorVisible).toBe(false)

  await flushMicrotasks()
  expect(queue.getSnapshot()[0].status).toBe('uploaded')
})

test('isLoadingIndicatorVisible flips true once minLoadingIndicatorDelayMs elapses while still uploading', async () => {
  const { promise } = deferred<string>()
  const onUpload = vi.fn().mockReturnValue(promise)
  const queue = new FileUploadQueue({ onUpload, minLoadingIndicatorDelayMs: 300 })

  queue.addFiles([makeFile('a.txt')])
  vi.advanceTimersByTime(300)

  const [item] = queue.getSnapshot()
  if (item.status === 'uploading') expect(item.isLoadingIndicatorVisible).toBe(true)
})

test('upload rejection sets status to error with a message, and clears the loading indicator', async () => {
  const onUpload = vi.fn().mockRejectedValue(new Error('boom'))
  const queue = new FileUploadQueue({ onUpload, minLoadingIndicatorDelayMs: 300 })

  queue.addFiles([makeFile('a.txt')])
  vi.advanceTimersByTime(300)

  await flushMicrotasks()
  expect(queue.getSnapshot()[0].status).toBe('error')

  const [item] = queue.getSnapshot()
  if (item.status === 'error') expect(item.errorMessage).toBe('boom')
})

test('onUpload throwing synchronously is treated the same as a rejection', async () => {
  const onUpload = vi.fn(() => {
    throw new Error('sync boom')
  })
  const queue = new FileUploadQueue({ onUpload })

  queue.addFiles([makeFile('a.txt')])
  await flushMicrotasks()

  const [item] = queue.getSnapshot()
  expect(item.status).toBe('error')
  if (item.status === 'error') expect(item.errorMessage).toBe('sync boom')
})

test('removeItem() mid-upload aborts the signal and removes the item', async () => {
  const abortSpy = vi.spyOn(AbortController.prototype, 'abort')
  const { promise } = deferred<string>()
  const onUpload = vi.fn().mockReturnValue(promise)
  const queue = new FileUploadQueue({ onUpload })

  queue.addFiles([makeFile('a.txt')])
  const id = queue.getSnapshot()[0].id

  queue.removeItem(id)

  expect(abortSpy).toHaveBeenCalledTimes(1)
  expect(queue.getSnapshot()).toHaveLength(0)
})

test('removeItem() mid-upload prevents a late-firing loading-indicator timer from resurrecting the item', () => {
  const { promise } = deferred<string>()
  const onUpload = vi.fn().mockReturnValue(promise)
  const queue = new FileUploadQueue({ onUpload, minLoadingIndicatorDelayMs: 300 })

  queue.addFiles([makeFile('a.txt')])
  const id = queue.getSnapshot()[0].id
  queue.removeItem(id)

  expect(() => vi.advanceTimersByTime(300)).not.toThrow()
  expect(queue.getSnapshot()).toHaveLength(0)
})

test('removeItem() mid-upload prevents a late-resolving promise from resurrecting the item', async () => {
  const { promise, resolve } = deferred<string>()
  const onUpload = vi.fn().mockReturnValue(promise)
  const queue = new FileUploadQueue({ onUpload })

  queue.addFiles([makeFile('a.txt')])
  const id = queue.getSnapshot()[0].id
  queue.removeItem(id)

  resolve('too-late')
  await flushMicrotasks()

  expect(queue.getSnapshot()).toHaveLength(0)
})

test('subscribe() notifies listeners on mutation, and unsubscribe stops further notifications', () => {
  const queue = new FileUploadQueue()
  const listener = vi.fn()
  const unsubscribe = queue.subscribe(listener)

  queue.addFiles([makeFile('a.txt')])
  expect(listener).toHaveBeenCalledTimes(1)

  unsubscribe()
  queue.addFiles([makeFile('b.txt')])
  expect(listener).toHaveBeenCalledTimes(1)
})

test('getFiles() includes items with a validationError, in order', () => {
  const queue = new FileUploadQueue()
  queue.addFiles([makeFile('good.txt', 5), makeFile('bad.txt', 100)], { maxFileSize: 10 })

  const files = queue.getFiles()
  expect(files.map((f) => f.name)).toEqual(['good.txt', 'bad.txt'])
})
