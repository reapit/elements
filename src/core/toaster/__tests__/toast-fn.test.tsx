import { toastStore } from "../store";
import { toast } from "../toast-fn";

afterEach(() => {
  for (const entry of toastStore.getSnapshot()) {
    toastStore.remove(entry.id);
  }
});

test("toast() adds a neutral toast and returns an ID", () => {
  const id = toast("Hello");
  expect(typeof id).toBe("string");
  expect(toastStore.getSnapshot()).toHaveLength(1);
});

test("toast() stores the neutral variant on the entry", () => {
  toast("Hello");
  expect(toastStore.getSnapshot()[0].variant).toBe("neutral");
});

test("toast.success() adds a toast with the success variant", () => {
  toast.success("Saved");
  expect(toastStore.getSnapshot()).toHaveLength(1);
  expect(toastStore.getSnapshot()[0].variant).toBe("success");
});

test("toast.error() adds a toast with the error variant", () => {
  toast.error("Failed");
  expect(toastStore.getSnapshot()).toHaveLength(1);
  expect(toastStore.getSnapshot()[0].variant).toBe("error");
});

test("toast.info() adds a toast with the info variant", () => {
  toast.info("Note");
  expect(toastStore.getSnapshot()).toHaveLength(1);
  expect(toastStore.getSnapshot()[0].variant).toBe("info");
});

test("toast.warning() adds a toast with the warning variant", () => {
  toast.warning("Caution");
  expect(toastStore.getSnapshot()).toHaveLength(1);
  expect(toastStore.getSnapshot()[0].variant).toBe("warning");
});

test("toast.neutral() adds a toast with the neutral variant", () => {
  toast.neutral("FYI");
  expect(toastStore.getSnapshot()).toHaveLength(1);
  expect(toastStore.getSnapshot()[0].variant).toBe("neutral");
});

test("toast() stores duration in the entry", () => {
  toast("Hello", { duration: 4000 });
  expect(toastStore.getSnapshot()[0].duration).toBe(4000);
});

test("toast() clamps duration below 4000ms to 4000ms", () => {
  toast("Hello", { duration: 100 });
  expect(toastStore.getSnapshot()[0].duration).toBe(4000);
});

test("toast.dismiss() transitions the toast to dismissing state", () => {
  const id = toast("Hello");
  toast.dismiss(id);
  expect(toastStore.getSnapshot()[0].state).toBe("dismissing");
});
