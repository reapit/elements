import { filterDroppedFiles, validateFiles } from "../validate-files";

// ---------------------------------------------------------------------------
// No rules
// ---------------------------------------------------------------------------

test("accepts a single incoming file when no rules are provided", () => {
  const file = makeFile("a.txt");
  const { accepted, rejected, selectionError } = validateFiles([file], {});
  expect(accepted).toEqual([file]);
  expect(rejected).toEqual([]);
  expect(selectionError).toBeUndefined();
});

// ---------------------------------------------------------------------------
// accept
// ---------------------------------------------------------------------------

test("accepts a file matching an extension pattern", () => {
  const file = makeFile("report.pdf");
  const { accepted } = validateFiles([file], { accept: ".pdf" });
  expect(accepted).toEqual([file]);
});

test("rejects a file not matching an extension pattern", () => {
  const file = makeFile("report.docx");
  const { rejected } = validateFiles([file], { accept: ".pdf" });
  expect(rejected).toEqual([{ file, validationError: "typeMismatch" }]);
});

test("accepts a file matching an exact MIME type", () => {
  const file = makeFile("photo.png", { type: "image/png" });
  const { accepted } = validateFiles([file], { accept: "image/png" });
  expect(accepted).toEqual([file]);
});

test("rejects a file not matching an exact MIME type", () => {
  const file = makeFile("photo.png", { type: "image/png" });
  const { rejected } = validateFiles([file], { accept: "image/jpeg" });
  expect(rejected).toEqual([{ file, validationError: "typeMismatch" }]);
});

test("accepts a file matching a MIME wildcard", () => {
  const file = makeFile("photo.png", { type: "image/png" });
  const { accepted } = validateFiles([file], { accept: "image/*" });
  expect(accepted).toEqual([file]);
});

test("rejects a file not matching a MIME wildcard", () => {
  const file = makeFile("report.pdf", { type: "application/pdf" });
  const { rejected } = validateFiles([file], { accept: "image/*" });
  expect(rejected).toEqual([{ file, validationError: "typeMismatch" }]);
});

test("accepts a file matching any pattern in a comma-separated accept list", () => {
  const file = makeFile("report.pdf");
  const { accepted } = validateFiles([file], { accept: "image/*,.pdf" });
  expect(accepted).toEqual([file]);
});

// ---------------------------------------------------------------------------
// No rules (multiple/required, and their minFiles/maxFiles defaults, are resolved by the caller —
// FileInput's effectiveMinFiles/effectiveMaxFiles — before validateFiles is ever called; see
// file-input.test.tsx for that resolution)
// ---------------------------------------------------------------------------

test("accepts every incoming file when no maxFiles is set", () => {
  const a = makeFile("a.txt");
  const b = makeFile("b.txt");
  const { accepted, rejected, selectionError } = validateFiles([a, b], {});
  expect(accepted).toEqual([a, b]);
  expect(rejected).toEqual([]);
  expect(selectionError).toBeUndefined();
});

// ---------------------------------------------------------------------------
// maxFileSize
// ---------------------------------------------------------------------------

test("accepts a file at exactly maxFileSize", () => {
  const file = makeFile("a.txt", { size: 100 });
  const { accepted } = validateFiles([file], { maxFileSize: 100 });
  expect(accepted).toEqual([file]);
});

test("rejects a file exceeding maxFileSize", () => {
  const file = makeFile("a.txt", { size: 101 });
  const { rejected } = validateFiles([file], { maxFileSize: 100 });
  expect(rejected).toEqual([{ file, validationError: "fileSizeOverflow" }]);
});

// ---------------------------------------------------------------------------
// maxFiles
// ---------------------------------------------------------------------------

test("accepts incoming files up to maxFiles", () => {
  const a = makeFile("a.txt");
  const b = makeFile("b.txt");
  const { accepted, rejected, selectionError } = validateFiles([a, b], { maxFiles: 2 });
  expect(accepted).toEqual([a, b]);
  expect(rejected).toEqual([]);
  expect(selectionError).toBeUndefined();
});

test("rejects incoming files beyond maxFiles", () => {
  const a = makeFile("a.txt");
  const b = makeFile("b.txt");
  const { accepted, rejected, selectionError } = validateFiles([a, b], { maxFiles: 1 });
  expect(accepted).toEqual([a]);
  expect(rejected).toEqual([]);
  expect(selectionError).toBe("filesOverflow");
});

// ---------------------------------------------------------------------------
// minFiles
// ---------------------------------------------------------------------------

test("accepts a selection at exactly minFiles", () => {
  const a = makeFile("a.txt");
  const { accepted, rejected, selectionError } = validateFiles([a], { minFiles: 1 });
  expect(accepted).toEqual([a]);
  expect(rejected).toEqual([]);
  expect(selectionError).toBeUndefined();
});

test("rejects a selection below minFiles", () => {
  const { accepted, rejected, selectionError } = validateFiles([], { minFiles: 1 });
  expect(accepted).toEqual([]);
  expect(rejected).toEqual([]);
  expect(selectionError).toBe("filesUnderflow");
});

test("reports minFiles against the final accepted count, not the incoming count", () => {
  const a = makeFile("a.txt");
  const b = makeFile("report.pdf");
  const { accepted, rejected, selectionError } = validateFiles([a, b], {
    accept: ".txt",
    minFiles: 2,
  });
  expect(accepted).toEqual([a]);
  expect(rejected).toEqual([{ file: b, validationError: "typeMismatch" }]);
  expect(selectionError).toBe("filesUnderflow");
});

test("reports an overflow rather than filesUnderflow when a selection fails both", () => {
  const a = makeFile("a.txt");
  const b = makeFile("b.txt");
  const c = makeFile("c.txt");
  const { selectionError } = validateFiles([a, b, c], { minFiles: 5, maxFiles: 2 });
  expect(selectionError).toBe("filesOverflow");
});

// ---------------------------------------------------------------------------
// maxTotalSize
// ---------------------------------------------------------------------------

test("accepts incoming files within maxTotalSize", () => {
  const a = makeFile("a.txt", { size: 50 });
  const b = makeFile("b.txt", { size: 50 });
  const { accepted, rejected, selectionError } = validateFiles([a, b], { maxTotalSize: 100 });
  expect(accepted).toEqual([a, b]);
  expect(rejected).toEqual([]);
  expect(selectionError).toBeUndefined();
});

test("rejects incoming files that would exceed maxTotalSize", () => {
  const a = makeFile("a.txt", { size: 50 });
  const b = makeFile("b.txt", { size: 51 });
  const { accepted, rejected, selectionError } = validateFiles([a, b], { maxTotalSize: 100 });
  expect(accepted).toEqual([a]);
  expect(rejected).toEqual([]);
  expect(selectionError).toBe("totalSizeOverflow");
});

// ---------------------------------------------------------------------------
// Rule precedence
// ---------------------------------------------------------------------------

test("reports accept before maxFileSize when a file fails both", () => {
  const file = makeFile("report.docx", { size: 200 });
  const { rejected } = validateFiles([file], { accept: ".pdf", maxFileSize: 100 });
  expect(rejected).toEqual([{ file, validationError: "typeMismatch" }]);
});

test("reports maxFileSize as a per-file rejection rather than a selection overflow", () => {
  const file = makeFile("a.txt", { size: 200 });
  const { rejected, selectionError } = validateFiles([makeFile("first.txt"), file], {
    maxFileSize: 100,
  });
  expect(rejected).toEqual([{ file, validationError: "fileSizeOverflow" }]);
  expect(selectionError).toBeUndefined();
});

test("does not count a file rejected for a per-file reason towards maxFiles", () => {
  const a = makeFile("report.docx");
  const b = makeFile("report.pdf");
  const { accepted, rejected, selectionError } = validateFiles([a, b], {
    accept: ".pdf",
    maxFiles: 1,
  });
  expect(accepted).toEqual([b]);
  expect(rejected).toEqual([{ file: a, validationError: "typeMismatch" }]);
  expect(selectionError).toBeUndefined();
});

// ---------------------------------------------------------------------------
// filterDroppedFiles
// ---------------------------------------------------------------------------

test("keeps only the first dropped file when multiple is not set", () => {
  const a = makeFile("a.txt");
  const b = makeFile("b.txt");
  expect(filterDroppedFiles([a, b], {})).toEqual([a]);
});

test("keeps every dropped file when multiple is true", () => {
  const a = makeFile("a.txt");
  const b = makeFile("b.txt");
  expect(filterDroppedFiles([a, b], { multiple: true })).toEqual([a, b]);
});

test("excludes a dropped file that does not match accept", () => {
  const match = makeFile("photo.png", { type: "image/png" });
  const mismatch = makeFile("report.pdf", { type: "application/pdf" });
  expect(filterDroppedFiles([match, mismatch], { accept: "image/*", multiple: true })).toEqual([
    match,
  ]);
});

test("applies the accept filter before clamping to a single file", () => {
  const mismatch = makeFile("report.pdf", { type: "application/pdf" });
  const match = makeFile("photo.png", { type: "image/png" });
  expect(filterDroppedFiles([mismatch, match], { accept: "image/*" })).toEqual([match]);
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeFile(name: string, options: { type?: string; size?: number } = {}): File {
  const { type = "", size = 10 } = options;
  return new File([new Uint8Array(size)], name, { type });
}
