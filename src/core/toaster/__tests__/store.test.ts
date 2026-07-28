import { toastStore } from "../store";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  toastStore.clear();
  vi.useRealTimers();
});

test("add() clamps finite durations below 4000ms to 4000ms", () => {
  toastStore.add({ variant: "neutral", message: "Hello", duration: 500 });
  expect(toastStore.getSnapshot()[0].duration).toBe(4000);
});

test("add() does not clamp durations at or above 4000ms", () => {
  toastStore.add({ variant: "neutral", message: "Hello", duration: 5000 });
  expect(toastStore.getSnapshot()[0].duration).toBe(5000);
});

test("add() does not clamp Infinity", () => {
  toastStore.add({ variant: "neutral", message: "Hello", duration: Infinity });
  expect(toastStore.getSnapshot()[0].duration).toBe(Infinity);
});

test("add() returns an ID and adds the entry", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  expect(typeof id).toBe("string");
  expect(toastStore.getSnapshot()).toHaveLength(1);
  expect(toastStore.getSnapshot()[0].id).toBe(id);
});

test("add() sets the initial state to pending", () => {
  toastStore.add({ variant: "neutral", message: "Hello" });
  expect(toastStore.getSnapshot()[0].state).toBe("pending");
});

test("add() sets startedAt to null (startedAt is set on settle)", () => {
  toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  expect(toastStore.getSnapshot()[0].startedAt).toBeNull();
});

test("add() sets startedAt to null for untimed toasts", () => {
  toastStore.add({ variant: "neutral", message: "Hello" });
  expect(toastStore.getSnapshot()[0].startedAt).toBeNull();
});

test("settle() starts the auto-dismiss timer for timed toasts", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);

  vi.advanceTimersByTime(4000);

  expect(toastStore.getSnapshot()[0].state).toBe("dismissing");
});

test("settle() sets startedAt for timed toasts", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);
  expect(toastStore.getSnapshot()[0].startedAt).toBe(Date.now());
});

test("settle() does not start a timer for untimed toasts", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello" });
  toastStore.settle(id);

  vi.advanceTimersByTime(10_000);

  expect(toastStore.getSnapshot()[0].state).toBe("visible");
});

test("pause() transitions a visible entry to paused", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);
  toastStore.pause(id);
  expect(toastStore.getSnapshot()[0].state).toBe("paused");
});

test("pause() is a no-op when the entry is not visible", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.pause(id);
  expect(toastStore.getSnapshot()[0].state).toBe("pending");
});

test("pause() clears the active timer so it does not fire while paused", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);
  toastStore.pause(id);

  vi.advanceTimersByTime(5000);

  expect(toastStore.getSnapshot()[0].state).toBe("paused");
});

test("resume() transitions a paused entry back to visible", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);
  toastStore.pause(id);
  toastStore.resume(id);
  expect(toastStore.getSnapshot()[0].state).toBe("visible");
});

test("resume() is a no-op when the entry is not paused", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);
  toastStore.resume(id);
  expect(toastStore.getSnapshot()[0].state).toBe("visible");
});

test("resume() restarts the timer with the remaining duration", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);

  // Advance 1000ms, then pause
  vi.advanceTimersByTime(1000);
  toastStore.pause(id);

  // 3000ms remain — advance 2000ms while paused (should not dismiss)
  vi.advanceTimersByTime(2000);
  expect(toastStore.getSnapshot()[0].state).toBe("paused");

  // Resume — 3000ms timer restarts
  toastStore.resume(id);
  expect(toastStore.getSnapshot()[0].state).toBe("visible");

  // Advance past the remaining 3000ms
  vi.advanceTimersByTime(3000);
  expect(toastStore.getSnapshot()[0].state).toBe("dismissing");
});

test("resume() back-dates startedAt to reflect total elapsed time", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);
  const settledAt = Date.now();

  // Advance 1000ms, then pause
  vi.advanceTimersByTime(1000);
  toastStore.pause(id);

  // Advance 500ms while paused (should not count)
  vi.advanceTimersByTime(500);

  // Resume — startedAt should be back-dated so elapsed = 1000ms
  toastStore.resume(id);
  const entry = toastStore.getSnapshot()[0];

  // Date.now() - startedAt should equal the 1000ms already elapsed
  const impliedElapsed = Date.now() - (entry.startedAt ?? 0);
  expect(impliedElapsed).toBe(1000);
});

test("dismiss() transitions the entry to the dismissing state", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello" });
  toastStore.dismiss(id);
  expect(toastStore.getSnapshot()[0].state).toBe("dismissing");
});

test("dismiss() is a no-op when the entry is already dismissing", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello" });
  toastStore.dismiss(id);
  const before = toastStore.getSnapshot();
  toastStore.dismiss(id);
  expect(toastStore.getSnapshot()).toBe(before);
});

test("dismiss() clears any active timer", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);
  toastStore.dismiss(id);

  vi.advanceTimersByTime(5000);

  expect(toastStore.getSnapshot()[0].state).toBe("dismissing");
});

test("dismiss() works from the paused state", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);
  toastStore.pause(id);
  toastStore.dismiss(id);
  expect(toastStore.getSnapshot()[0].state).toBe("dismissing");
});

test("remove() removes the entry with the given ID", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello" });
  toastStore.remove(id);
  expect(toastStore.getSnapshot()).toHaveLength(0);
});

test("getSnapshot() returns a new array reference after add()", () => {
  const before = toastStore.getSnapshot();
  toastStore.add({ variant: "neutral", message: "Hello" });
  expect(toastStore.getSnapshot()).not.toBe(before);
});

test("getSnapshot() returns a new array reference after remove()", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello" });
  const before = toastStore.getSnapshot();
  toastStore.remove(id);
  expect(toastStore.getSnapshot()).not.toBe(before);
});

test("dismiss() produces a new array reference when the entry exists and is not dismissing", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello" });
  const before = toastStore.getSnapshot();
  toastStore.dismiss(id);
  expect(toastStore.getSnapshot()).not.toBe(before);
});

test("subscribe() notifies listener on add()", () => {
  const listener = vi.fn();
  const unsubscribe = toastStore.subscribe(listener);
  toastStore.add({ variant: "neutral", message: "Hello" });
  expect(listener).toHaveBeenCalledTimes(1);
  unsubscribe();
});

test("subscribe() notifies listener on settle()", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello" });
  const listener = vi.fn();
  const unsubscribe = toastStore.subscribe(listener);
  toastStore.settle(id);
  expect(listener).toHaveBeenCalledTimes(1);
  unsubscribe();
});

test("subscribe() notifies listener on pause()", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);
  const listener = vi.fn();
  const unsubscribe = toastStore.subscribe(listener);
  toastStore.pause(id);
  expect(listener).toHaveBeenCalledTimes(1);
  unsubscribe();
});

test("subscribe() notifies listener on resume()", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello", duration: 4000 });
  toastStore.settle(id);
  toastStore.pause(id);
  const listener = vi.fn();
  const unsubscribe = toastStore.subscribe(listener);
  toastStore.resume(id);
  expect(listener).toHaveBeenCalledTimes(1);
  unsubscribe();
});

test("subscribe() notifies listener on dismiss()", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello" });
  const listener = vi.fn();
  const unsubscribe = toastStore.subscribe(listener);
  toastStore.dismiss(id);
  expect(listener).toHaveBeenCalledTimes(1);
  unsubscribe();
});

test("subscribe() notifies listener on remove()", () => {
  const id = toastStore.add({ variant: "neutral", message: "Hello" });
  const listener = vi.fn();
  const unsubscribe = toastStore.subscribe(listener);
  toastStore.remove(id);
  expect(listener).toHaveBeenCalledTimes(1);
  unsubscribe();
});

test("unsubscribe() stops notifications", () => {
  const listener = vi.fn();
  const unsubscribe = toastStore.subscribe(listener);
  unsubscribe();
  toastStore.add({ variant: "neutral", message: "Hello" });
  expect(listener).not.toHaveBeenCalled();
});

test("clear() removes all entries and clears timers", () => {
  toastStore.add({ variant: "neutral", message: "A", duration: 4000 });
  toastStore.add({ variant: "neutral", message: "B", duration: 4000 });
  toastStore.clear();
  expect(toastStore.getSnapshot()).toHaveLength(0);
});
