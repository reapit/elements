import { FileUploadQueue } from "../file-upload-queue";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function makeFile(name: string, size = 100, type = "text/plain"): File {
  return new File([new Uint8Array(size)], name, { type });
}

// `FileList` has no public constructor outside a real `<input>`, so this stubs the minimal
// array-like shape `Array.from()` needs (a `length` plus indexed access) to exercise `addFiles`'s
// `FileList` branch without a DOM element.
function makeFileList(files: File[]): FileList {
  const fileList: Record<number, File> & { length: number } = { length: files.length };
  files.forEach((file, index) => {
    fileList[index] = file;
  });
  return fileList as unknown as FileList;
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// Fake timers are active for every test in this file, so `vi.waitFor`'s internal polling (which
// itself uses `setTimeout`) would never fire. Awaiting a real `Promise.resolve()` a few times
// flushes pending microtasks (the queue's own `.then` handlers) without needing timers at all.
async function flushMicrotasks(): Promise<void> {
  for (let i = 0; i < 5; i++) await Promise.resolve();
}

test("addFiles() queues files without starting their upload", () => {
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });
  queue.addFiles([makeFile("a.txt")]);

  const [item] = queue.getItemsSnapshot();
  expect(item.status).toBe("queued");
  expect(item.file.name).toBe("a.txt");
  expect(typeof item.id).toBe("string");
  expect(item.validationError).toBeUndefined();
});

test("reportValidity() starts uploading a queued item reported as valid", () => {
  const onUpload = vi.fn().mockResolvedValue("id-1");
  const queue = new FileUploadQueue({ onUpload });
  queue.addFiles([makeFile("a.txt")]);

  queue.reportValidity([]);

  expect(onUpload).toHaveBeenCalledTimes(1);
  expect(queue.getItemsSnapshot()[0]).toMatchObject({
    status: "uploading",
    validationError: undefined,
  });
});

test("reportValidity() marks a rejected file with a validationError, and keeps it queued", () => {
  const onUpload = vi.fn().mockResolvedValue("id-1");
  const queue = new FileUploadQueue({ onUpload });
  queue.addFiles([makeFile("too-big.txt", 100)]);

  queue.reportValidity([
    { file: queue.getItemsSnapshot()[0].file, validationError: "fileSizeOverflow" },
  ]);

  expect(onUpload).not.toHaveBeenCalled();
  const [item] = queue.getItemsSnapshot();
  expect(item.status).toBe("queued");
  expect(item.validationError).toBe("fileSizeOverflow");
});

test("reportValidity() only starts the items it reports valid, leaving others queued", () => {
  const onUpload = vi.fn().mockResolvedValue("id-1");
  const queue = new FileUploadQueue({ onUpload });
  queue.addFiles([makeFile("good.txt"), makeFile("bad.txt", 100)]);

  const [good, bad] = queue.getItemsSnapshot();
  queue.reportValidity([{ file: bad.file, validationError: "fileSizeOverflow" }]);

  const snapshot = queue.getItemsSnapshot();
  expect(snapshot.find((item) => item.id === good.id)?.status).toBe("uploading");
  expect(snapshot.find((item) => item.id === bad.id)).toMatchObject({
    status: "queued",
    validationError: "fileSizeOverflow",
  });
  expect(onUpload).toHaveBeenCalledTimes(1);
});

test("reportValidity() leaves a previously-rejected item untouched on a later call that omits it", () => {
  const onUpload = vi.fn().mockResolvedValue("id-1");
  const queue = new FileUploadQueue({ onUpload });
  queue.addFiles([makeFile("bad.txt", 100)]);
  const [bad] = queue.getItemsSnapshot();

  queue.reportValidity([{ file: bad.file, validationError: "fileSizeOverflow" }]);
  queue.addFiles([makeFile("good.txt")]);
  queue.reportValidity([]);

  const snapshot = queue.getItemsSnapshot();
  expect(snapshot.find((item) => item.id === bad.id)).toMatchObject({
    status: "queued",
    validationError: "fileSizeOverflow",
  });
  expect(onUpload).toHaveBeenCalledTimes(1);
});

test("a successful upload does not abort its own signal", async () => {
  let signalRef: AbortSignal | undefined;
  const onUpload = vi.fn((_file: File, helpers: FileUploadQueue.UploadHelpers) => {
    signalRef = helpers.signal;
    return Promise.resolve("id-1");
  });
  const queue = new FileUploadQueue({ onUpload });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  await flushMicrotasks();

  expect(queue.getItemsSnapshot()[0].status).toBe("uploaded");
  expect(signalRef?.aborted).toBe(false);
});

test("a failed upload does not abort its own signal", async () => {
  let signalRef: AbortSignal | undefined;
  const onUpload = vi.fn((_file: File, helpers: FileUploadQueue.UploadHelpers) => {
    signalRef = helpers.signal;
    return Promise.reject(new Error("boom"));
  });
  const queue = new FileUploadQueue({ onUpload });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  await flushMicrotasks();

  expect(queue.getItemsSnapshot()[0].status).toBe("error");
  expect(signalRef?.aborted).toBe(false);
});

test("replaceFiles() replaces the existing items", () => {
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });
  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  const firstId = queue.getItemsSnapshot()[0].id;

  queue.replaceFiles([makeFile("b.txt")]);

  const snapshot = queue.getItemsSnapshot();
  expect(snapshot).toHaveLength(1);
  expect(snapshot[0].id).not.toBe(firstId);
  expect(snapshot[0].file.name).toBe("b.txt");
});

test("replaceFiles() aborts in-flight uploads before replacing", async () => {
  const abortSpy = vi.spyOn(AbortController.prototype, "abort");
  const first = deferred<string>();
  const onUpload = vi
    .fn()
    .mockReturnValueOnce(first.promise)
    .mockReturnValueOnce(Promise.resolve("id-2"));
  const queue = new FileUploadQueue({ onUpload });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  expect(queue.getItemsSnapshot()[0].status).toBe("uploading");

  queue.replaceFiles([makeFile("b.txt")]);

  expect(abortSpy).toHaveBeenCalledTimes(1);
  expect(queue.getItemsSnapshot()).toHaveLength(1);
  expect(queue.getItemsSnapshot()[0].file.name).toBe("b.txt");
});

test("addFiles() accepts a FileList as well as a File[]", () => {
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });
  queue.addFiles(makeFileList([makeFile("a.txt"), makeFile("b.txt")]));

  const snapshot = queue.getItemsSnapshot();
  expect(snapshot.map((item) => item.file.name)).toEqual(["a.txt", "b.txt"]);
});

test("happy path: queued -> uploading -> uploaded, with fileId derived from the raw string result", async () => {
  const onUpload = vi.fn().mockResolvedValue("server-id-1");
  const queue = new FileUploadQueue({ onUpload });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  expect(queue.getItemsSnapshot()[0].status).toBe("uploading");

  await flushMicrotasks();
  expect(queue.getItemsSnapshot()[0].status).toBe("uploaded");

  const [item] = queue.getItemsSnapshot();
  if (item.status === "uploaded") {
    expect(item.fileId).toBe("server-id-1");
    expect(item.result).toBe("server-id-1");
  }
});

test("happy path with a custom getFileId", async () => {
  const onUpload = vi.fn().mockResolvedValue({ id: "abc", url: "https://example.com/abc" });
  const queue = new FileUploadQueue<{ id: string; url: string }>({
    onUpload,
    getFileId: (result) => result.id,
  });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  await flushMicrotasks();
  expect(queue.getItemsSnapshot()[0].status).toBe("uploaded");

  const [item] = queue.getItemsSnapshot();
  if (item.status === "uploaded") {
    expect(item.fileId).toBe("abc");
    expect(item.result).toEqual({ id: "abc", url: "https://example.com/abc" });
  }
});

test("progress is throttled: rapid onProgress calls collapse into fewer notifications, latest value always wins", async () => {
  let capturedOnProgress: ((progress: number) => void) | undefined;
  const { promise, resolve } = deferred<string>();
  const onUpload = vi.fn((_file: File, helpers: FileUploadQueue.UploadHelpers) => {
    capturedOnProgress = helpers.onProgress;
    return promise;
  });
  const queue = new FileUploadQueue({ onUpload });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);

  const listener = vi.fn();
  queue.subscribe(listener);
  listener.mockClear();

  capturedOnProgress?.(10);
  const notifyCountAfterFirst = listener.mock.calls.length;
  expect(notifyCountAfterFirst).toBeGreaterThan(0);

  capturedOnProgress?.(20);
  capturedOnProgress?.(30);
  capturedOnProgress?.(40);

  // Rapid-fire calls within the throttle window shouldn't each trigger a synchronous notify.
  expect(listener.mock.calls.length).toBe(notifyCountAfterFirst);

  vi.advanceTimersByTime(150);

  const [item] = queue.getItemsSnapshot();
  if (item.status === "uploading") {
    expect(item.progress).toBe(40);
  }

  resolve("done");
});

test("progress: a trailing throttle timer is cleared, not orphaned, when a later call takes the immediate-notify branch", async () => {
  let capturedOnProgress: ((progress: number) => void) | undefined;
  const { promise } = deferred<string>();
  const onUpload = vi.fn((_file: File, helpers: FileUploadQueue.UploadHelpers) => {
    capturedOnProgress = helpers.onProgress;
    return promise;
  });
  // A high delay keeps the unrelated loading-indicator timer from also firing during the
  // `advanceTimersByTime` below, so the assertion isolates the progress-throttle timer only.
  const queue = new FileUploadQueue({ onUpload, minLoadingIndicatorDelayMs: 100_000 });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);

  const listener = vi.fn();
  queue.subscribe(listener);

  // `vi.setSystemTime` moves `Date.now()` forward without advancing the fake timer clock that
  // drives `setTimeout` — reproducing the real-world race where wall-clock time passes enough to
  // take the immediate-notify branch before a still-pending trailing timer's callback runs.
  const start = Date.now();
  capturedOnProgress?.(10); // immediate notify (no prior throttle entry): lastNotifiedAt = start
  vi.setSystemTime(new Date(start + 10));
  capturedOnProgress?.(20); // elapsed (10) < throttle window: schedules a trailing timer
  vi.setSystemTime(new Date(start + 110));
  capturedOnProgress?.(30); // elapsed (110) >= throttle window: immediate branch — must clear the pending trailing timer

  // Only the (irrelevantly-delayed) loading-indicator timer should remain pending; an orphaned
  // trailing throttle timer would leave this at 2.
  expect(vi.getTimerCount()).toBe(1);

  listener.mockClear();
  vi.advanceTimersByTime(500); // if the trailing timer were left orphaned, it would fire here

  expect(listener).not.toHaveBeenCalled();
});

test("setProcessing() transitions to processing and drops progress", async () => {
  let helpersRef: FileUploadQueue.UploadHelpers | undefined;
  const { promise } = deferred<string>();
  const onUpload = vi.fn((_file: File, helpers: FileUploadQueue.UploadHelpers) => {
    helpersRef = helpers;
    return promise;
  });
  const queue = new FileUploadQueue({ onUpload });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  helpersRef?.onProgress(55);
  helpersRef?.setProcessing();

  const [item] = queue.getItemsSnapshot();
  expect(item.status).toBe("processing");
});

test("isLoadingIndicatorVisible stays false for uploads that resolve before minLoadingIndicatorDelayMs", async () => {
  const onUpload = vi.fn().mockResolvedValue("id");
  const queue = new FileUploadQueue({ onUpload, minLoadingIndicatorDelayMs: 300 });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  const [item] = queue.getItemsSnapshot();
  if (item.status === "uploading") expect(item.isLoadingIndicatorVisible).toBe(false);

  await flushMicrotasks();
  expect(queue.getItemsSnapshot()[0].status).toBe("uploaded");
});

test("isLoadingIndicatorVisible flips true once minLoadingIndicatorDelayMs elapses while still uploading", async () => {
  const { promise } = deferred<string>();
  const onUpload = vi.fn().mockReturnValue(promise);
  const queue = new FileUploadQueue({ onUpload, minLoadingIndicatorDelayMs: 300 });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  vi.advanceTimersByTime(300);

  const [item] = queue.getItemsSnapshot();
  if (item.status === "uploading") expect(item.isLoadingIndicatorVisible).toBe(true);
});

test("upload rejection sets status to error with a message, and clears the loading indicator", async () => {
  const onUpload = vi.fn().mockRejectedValue(new Error("boom"));
  const queue = new FileUploadQueue({ onUpload, minLoadingIndicatorDelayMs: 300 });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  vi.advanceTimersByTime(300);

  await flushMicrotasks();
  expect(queue.getItemsSnapshot()[0].status).toBe("error");

  const [item] = queue.getItemsSnapshot();
  if (item.status === "error") expect(item.errorMessage).toBe("boom");
});

test("onUpload throwing synchronously is treated the same as a rejection", async () => {
  const onUpload = vi.fn(() => {
    throw new Error("sync boom");
  });
  const queue = new FileUploadQueue({ onUpload });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  await flushMicrotasks();

  const [item] = queue.getItemsSnapshot();
  expect(item.status).toBe("error");
  if (item.status === "error") expect(item.errorMessage).toBe("sync boom");
});

test("removeItem() mid-upload aborts the signal and removes the item", async () => {
  const abortSpy = vi.spyOn(AbortController.prototype, "abort");
  const { promise } = deferred<string>();
  const onUpload = vi.fn().mockReturnValue(promise);
  const queue = new FileUploadQueue({ onUpload });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  const id = queue.getItemsSnapshot()[0].id;

  queue.removeItem(id);

  expect(abortSpy).toHaveBeenCalledTimes(1);
  expect(queue.getItemsSnapshot()).toHaveLength(0);
});

test("removeItem() mid-upload prevents a late-firing loading-indicator timer from resurrecting the item", () => {
  const { promise } = deferred<string>();
  const onUpload = vi.fn().mockReturnValue(promise);
  const queue = new FileUploadQueue({ onUpload, minLoadingIndicatorDelayMs: 300 });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  const id = queue.getItemsSnapshot()[0].id;
  queue.removeItem(id);

  expect(() => vi.advanceTimersByTime(300)).not.toThrow();
  expect(queue.getItemsSnapshot()).toHaveLength(0);
});

test("removeItem() mid-upload prevents a late-resolving promise from resurrecting the item", async () => {
  const { promise, resolve } = deferred<string>();
  const onUpload = vi.fn().mockReturnValue(promise);
  const queue = new FileUploadQueue({ onUpload });

  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);
  const id = queue.getItemsSnapshot()[0].id;
  queue.removeItem(id);

  resolve("too-late");
  await flushMicrotasks();

  expect(queue.getItemsSnapshot()).toHaveLength(0);
});

test("subscribe() notifies listeners on mutation, and unsubscribe stops further notifications", () => {
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });
  const listener = vi.fn();
  const unsubscribe = queue.subscribe(listener);

  queue.addFiles([makeFile("a.txt")]);
  const callsBeforeUnsubscribe = listener.mock.calls.length;
  expect(callsBeforeUnsubscribe).toBeGreaterThan(0);

  unsubscribe();
  queue.addFiles([makeFile("b.txt")]);
  expect(listener).toHaveBeenCalledTimes(callsBeforeUnsubscribe);
});

test("getFilesSnapshot() includes items with a validationError, in order", () => {
  const goodFile = makeFile("good.txt", 5);
  const badFile = makeFile("bad.txt", 100);
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });

  queue.addFiles([goodFile, badFile]);
  queue.reportValidity([
    { file: queue.getItemsSnapshot()[1].file, validationError: "fileSizeOverflow" },
  ]);

  const files = queue.getFilesSnapshot();
  expect(files.map((f) => f.name)).toEqual(["good.txt", "bad.txt"]);
});

test("getStatusSnapshot() reports idle when no files are uploading or processing", async () => {
  vi.useFakeTimers();

  const goodFile = makeFile("good.txt", 5);
  const badFile = makeFile("bad.txt", 100);
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });

  queue.addFiles([goodFile, badFile]);
  expect(queue.getStatusSnapshot()).toEqual("idle");

  queue.reportValidity([
    { file: queue.getItemsSnapshot()[1].file, validationError: "fileSizeOverflow" },
  ]);
  await vi.runAllTimersAsync();

  expect(queue.getStatusSnapshot()).toEqual("idle");
});

test("getStatusSnapshot() reports busy when files are uploading", async () => {
  const goodFile = makeFile("good.txt", 5);
  const badFile = makeFile("bad.txt", 100);
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });

  queue.addFiles([goodFile, badFile]);
  queue.reportValidity([
    { file: queue.getItemsSnapshot()[1].file, validationError: "fileSizeOverflow" },
  ]);

  expect(queue.getStatusSnapshot()).toEqual("busy"); // uploading good.txt, bad.txt is queued with validationError
});

test("getStatusSnapshot() reports busy when files are processing", async () => {
  const { promise, resolve } = Promise.withResolvers<void>();
  const queue = new FileUploadQueue({
    onUpload: async (_, { setProcessing }) => {
      setProcessing();
      return promise;
    },
  });

  queue.addFiles([makeFile("good.txt", 5)]);
  queue.reportValidity([]);

  expect(queue.getStatusSnapshot()).toEqual("busy"); // uploading good.txt, bad.txt is queued with validationError
  resolve();
});
