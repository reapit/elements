import { renderHook } from "@testing-library/react";

import { useFileInputValidity } from "../use-file-input-validity";

afterEach(() => {
  document.body.innerHTML = "";
});

test("syncs the input files to match the given files", () => {
  const input = createFileInput("input");
  const file = makeFile("a.txt");

  renderHook(() => useValidity({ files: [file] }));

  expect(Array.from(input.files ?? [])).toEqual([file]);
});

test("sets no custom validity message when the files satisfy the rules", () => {
  const input = createFileInput("input");

  renderHook(() => useValidity({ files: [makeFile("a.txt")] }));

  expect(input.validationMessage).toBe("");
});

test("sets a custom validity token when the files violate a selection-level rule", () => {
  const input = createFileInput("input");

  renderHook(() => useValidity({ files: [makeFile("a.txt"), makeFile("b.txt")], maxFiles: 1 }));

  expect(input.validationMessage).toBe("filesOverflow");
});

test("sets a custom validity token when the files violate minFiles", () => {
  const input = createFileInput("input");

  renderHook(() => useValidity({ files: [], minFiles: 1 }));

  expect(input.validationMessage).toBe("filesUnderflow");
});

test("updates the validity message when the files change", () => {
  const input = createFileInput("input");
  const { rerender } = renderHook((files: File[]) => useValidity({ files, maxFiles: 1 }), {
    initialProps: [makeFile("a.txt"), makeFile("b.txt")],
  });
  expect(input.validationMessage).toBe("filesOverflow");

  rerender([makeFile("a.txt")]);

  expect(input.validationMessage).toBe("");
});

test("drops a file that fails a per-file rule from the native input rather than invalidating it", () => {
  const input = createFileInput("input");

  renderHook(() => useValidity({ files: [makeFile("report.pdf")], accept: "image/*" }));

  expect(Array.from(input.files ?? [])).toEqual([]);
  expect(input.validationMessage).toBe("");
});

test("keeps a file that satisfies per-file rules while dropping a sibling that fails them", () => {
  const input = createFileInput("input");
  const valid = makeFile("photo.png", { type: "image/png" });

  renderHook(() => useValidity({ files: [valid, makeFile("report.pdf")], accept: "image/*" }));

  expect(Array.from(input.files ?? [])).toEqual([valid]);
  expect(input.validationMessage).toBe("");
});

test("does not count a file dropped by a per-file rule towards maxFiles", () => {
  const input = createFileInput("input");
  const valid = makeFile("a.txt");

  renderHook(() =>
    useValidity({ files: [valid, makeFile("report.pdf")], accept: ".txt", maxFiles: 1 }),
  );

  expect(Array.from(input.files ?? [])).toEqual([valid]);
  expect(input.validationMessage).toBe("");
});

test("does not throw when the input element for inputId does not exist", () => {
  expect(() => {
    renderHook(() => useValidity({ files: [], inputId: "missing" }));
  }).not.toThrow();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function useValidity(
  overrides: Partial<Parameters<typeof useFileInputValidity>[0]> & { files: File[] },
) {
  return useFileInputValidity({
    inputId: "input",
    accept: undefined,
    minFiles: undefined,
    maxFileSize: undefined,
    maxFiles: undefined,
    maxTotalSize: undefined,
    ...overrides,
  });
}

function createFileInput(id: string): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "file";
  input.id = id;
  document.body.appendChild(input);
  return input;
}

function makeFile(name: string, options: { type?: string } = {}): File {
  const { type = "" } = options;
  return new File([new Uint8Array(10)], name, { type });
}
