// Prints the size and digest of each committed token file, in the same format
// the Figma exporter's manifest reports. Two uses:
//
//   Before transfer: a file whose bytes and digest already match the manifest
//   is unchanged in Figma and does not need transferring at all.
//   After transfer: a reassembled file whose digest does not match the
//   manifest arrived corrupt, and must not be committed.
//
// Run from the repo root:
//   node .claude/skills/sync-design-tokens/scripts/token-digest.js

import { readFileSync } from "node:fs";

const DIR = "packages/elements/src/tokens";

const FILES = [
  "Semantics.Reapit.tokens.json",
  "Semantics.PayProp.tokens.json",
  "Primitives.Value.tokens.json",
  "effect.styles.tokens.json",
];

// FNV-1a over the raw file bytes. Must stay identical to the `digest` helper in
// export-figma-tokens.js, or every file reads as changed on every sync.
const digest = (bytes) => {
  let h = 0x811c9dc5;
  for (const b of bytes) h = Math.imul(h ^ b, 0x01000193) >>> 0;
  return h.toString(16).padStart(8, "0");
};

const rows = FILES.map((file) => {
  let bytes;
  try {
    bytes = readFileSync(`${DIR}/${file}`);
  } catch (error) {
    // A file absent locally is a legitimate state on a first sync, and reads as
    // "differs from the manifest" without needing a special case downstream.
    if (error.code !== "ENOENT") throw error;
    return { file, bytes: null, digest: null };
  }
  return { file, bytes: bytes.length, digest: digest(bytes) };
});

for (const row of rows) {
  const size = row.bytes === null ? "absent" : String(row.bytes);
  console.log(`${row.file}\t${size}\t${row.digest ?? "-"}`);
}
