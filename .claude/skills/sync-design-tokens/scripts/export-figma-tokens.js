// Run via the Figma MCP `use_figma` tool. Read-only: touches nothing in the file.
//
// The four token files total ~240KB, and a `use_figma` response is capped at 20KB.
// The two Semantics files are 110KB each, so no per-file split fits: the transfer
// has to be chunked. Edit REQUEST below to say what this call should return:
//
//   { file: null }              manifest: per-file size, digest, chunk count
//   { file: "<name>", chunk: N } one chunk of that file, base64-encoded
//
// The manifest carries no file content, so it always fits. Chunks are sized to
// stay under the cap by construction rather than by luck.

const REQUEST = { file: null, chunk: 0 };

// 9000 bytes of JSON becomes 12000 bytes of base64, leaving room for the
// surrounding JSON envelope inside the 20KB cap.
const CHUNK_BYTES = 9000;

// Only these collections are exported. Figma also contains `_Product demo`
// and `_Responsive`, which are Figma-only and must NOT be emitted.
const EXPORT = [
  { collection: "Semantics", mode: "Reapit", file: "Semantics.Reapit.tokens.json" },
  { collection: "Semantics", mode: "PayProp", file: "Semantics.PayProp.tokens.json" },
  { collection: "_Primitives", mode: "Value", file: "Primitives.Value.tokens.json" },
];

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const idToName = new Map();
const all = new Map();
for (const c of collections) {
  for (const id of c.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) {
      idToName.set(v.id, v.name);
      all.set(v.id, v);
    }
  }
}

const DTCG_TYPE = { COLOR: "color", FLOAT: "dimension", STRING: "string" };

// 6-digit hex when fully opaque, 8-digit when it carries alpha.
const hexc = (c) => {
  const h = (n) =>
    Math.round(n * 255)
      .toString(16)
      .padStart(2, "0");
  const base = "#" + h(c.r) + h(c.g) + h(c.b);
  const a = c.a === undefined ? 1 : c.a;
  return Math.round(a * 255) === 255 ? base : base + h(a);
};

// Figma stores floats; the token files carry a px suffix rounded to 2dp.
const dim = (n) => String(Math.round(n * 100) / 100) + "px";

// Figma group separator becomes object nesting, and spaces become underscores.
// A duplicate named "top_bar 2" therefore arrives as the token "top_bar_2",
// which reads as a deliberate name. See `suspicious` at the end of this file.
const pathOf = (name) => name.split("/").map((s) => s.replace(/ /g, "_"));

const value = (v, leaf, mode) => {
  const raw = v.valuesByMode[mode];
  if (raw && typeof raw === "object" && raw.type === "VARIABLE_ALIAS") {
    // Aliases arrive as variable ids and must be re-expressed as names.
    return "{" + (idToName.get(raw.id) || "UNRESOLVED") + "}";
  }
  // A variable with no value in this mode would otherwise crash inside hexc()
  // without naming it, or reach the token file as a "NaNpx" dimension.
  if (raw === undefined) {
    throw new Error(`"${v.name}" has no value in the exported mode`);
  }
  if (v.resolvedType === "COLOR") return hexc(raw);
  // Font weights are the one dimension emitted without a unit.
  if (v.resolvedType === "FLOAT") return leaf === "weight" ? String(raw) : dim(raw);
  return String(raw);
};

const buildVariables = (collectionName, modeName) => {
  // A collection or mode renamed in Figma needs an EXPORT update, so name the
  // one that is missing rather than failing on an undefined read below.
  const c = collections.find((x) => x.name === collectionName);
  if (!c) throw new Error(`No "${collectionName}" collection in this file: check EXPORT`);
  const m = c.modes.find((x) => x.name === modeName);
  if (!m) throw new Error(`"${collectionName}" has no "${modeName}" mode: check EXPORT`);
  const mode = m.modeId;
  const root = {};
  for (const id of c.variableIds) {
    const v = all.get(id);
    if (!v) continue;
    const parts = pathOf(v.name);
    const leaf = parts[parts.length - 1];
    let node = root;
    for (const seg of parts.slice(0, -1)) node = node[seg] = node[seg] || {};
    const type = DTCG_TYPE[v.resolvedType];
    if (!type) throw new Error(`"${v.name}" has unsupported resolvedType "${v.resolvedType}"`);
    const token = { $type: type, $value: value(v, leaf, mode) };
    if (v.description) token.$description = v.description;
    node[leaf] = token;
  }
  return root;
};

const buildEffects = async () => {
  const styles = await figma.getLocalEffectStylesAsync();
  const root = {};
  for (const s of styles) {
    const parts = pathOf(s.name);
    let node = root;
    for (const seg of parts.slice(0, -1)) node = node[seg] = node[seg] || {};
    node[parts[parts.length - 1]] = {
      $type: "shadow",
      // Key order matters: sortKeys leaves arrays alone, so the order written
      // here is the order committed to git.
      $value: s.effects.map((e) => ({
        offsetX: dim(e.offset.x),
        offsetY: dim(e.offset.y),
        blur: dim(e.radius),
        spread: dim(e.spread),
        color:
          e.boundVariables && e.boundVariables.color
            ? "{" + (idToName.get(e.boundVariables.color.id) || "UNRESOLVED") + "}"
            : hexc(e.color),
      })),
    };
  }
  return root;
};

// Mirrors src/tokens/preprocess.js, including its treatment of arrays as opaque.
const sortKeys = (o) => {
  if (o === null || typeof o !== "object" || Array.isArray(o)) return o;
  const out = {};
  for (const k of Object.keys(o).sort()) out[k] = sortKeys(o[k]);
  return out;
};
const emit = (obj) => JSON.stringify(sortKeys(obj), null, 2) + "\n";

const files = {};
for (const { collection, mode, file } of EXPORT)
  files[file] = emit(buildVariables(collection, mode));
files["effect.styles.tokens.json"] = emit(await buildEffects());

// Chunks are base64-encoded rather than returned as JSON text because the
// agent reassembles them through a shell append, and raw token JSON is full of
// quotes, newlines and braces that shell quoting mangles. Base64 makes each
// chunk a single argument that survives the round trip untouched. Do not
// "simplify" this back to plain text.
//
// Hand-rolled rather than TextEncoder, which the plugin sandbox does not
// document. Chunks must be sliced on byte boundaries, never string
// boundaries, because a multi-byte character split across two chunks would decode
// to mojibake on reassembly.
const utf8 = (s) => {
  const out = [];
  for (let i = 0; i < s.length; i++) {
    const c = s.codePointAt(i);
    if (c === undefined || (c >= 0xd800 && c <= 0xdfff))
      throw new Error(`Unpaired surrogate at index ${i} in token output`);
    if (c > 0xffff) i++;
    if (c < 0x80) out.push(c);
    else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
    else if (c < 0x10000) out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    else
      out.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
  }
  return new Uint8Array(out);
};

// FNV-1a over the UTF-8 bytes. Must stay identical to token-digest.js, which
// computes the same hash for the committed files so the two can be compared.
//
// FNV-1a rather than SHA-256 because the plugin sandbox exposes no crypto API,
// so the hash has to be short enough to reimplement identically in two
// runtimes. It only has to catch accidental difference: a dropped chunk, an
// unchanged file: and `generate:tokens` plus the CI drift check are the real
// backstop against bad bytes reaching the committed CSS.
const digest = (bytes) => {
  let h = 0x811c9dc5;
  for (const b of bytes) h = Math.imul(h ^ b, 0x01000193) >>> 0;
  return h.toString(16).padStart(8, "0");
};

const bytesOf = new Map();
for (const name of Object.keys(files)) bytesOf.set(name, utf8(files[name]));

const chunkCount = (name) => Math.ceil(bytesOf.get(name).length / CHUNK_BYTES) || 1;

if (REQUEST.file === null) {
  // A name ending in a space and a digit ("Foo 2") is almost always an
  // accidental Figma duplicate. Report these rather than emitting them as
  // "Foo_2" tokens.
  const suspicious = [...all.values()].map((v) => v.name).filter((n) => / \d+$/.test(n));
  const manifest = {};
  for (const name of Object.keys(files)) {
    const bytes = bytesOf.get(name);
    manifest[name] = {
      bytes: bytes.length,
      digest: digest(bytes),
      chunks: chunkCount(name),
    };
  }
  return { mode: "manifest", chunkBytes: CHUNK_BYTES, manifest, suspicious };
}

const bytes = bytesOf.get(REQUEST.file);
// A typo'd filename would otherwise return chunk 0 of `undefined`.
if (!bytes) {
  throw new Error(
    `No file "${REQUEST.file}" in this export: expected one of ${Object.keys(files).join(", ")}`,
  );
}

const chunks = chunkCount(REQUEST.file);
if (!(REQUEST.chunk >= 0 && REQUEST.chunk < chunks)) {
  throw new Error(`Chunk ${REQUEST.chunk} out of range: "${REQUEST.file}" has ${chunks}`);
}

if (typeof figma.base64Encode !== "function") {
  throw new Error("figma.base64Encode is unavailable: cannot transfer chunks safely");
}

const start = REQUEST.chunk * CHUNK_BYTES;
const slice = bytes.slice(start, start + CHUNK_BYTES);

return {
  mode: "chunk",
  file: REQUEST.file,
  chunk: REQUEST.chunk,
  chunks,
  // Whole-file figures, repeated on every chunk so verification data travels
  // with the payload rather than depending on a manifest fetched earlier.
  bytes: bytes.length,
  digest: digest(bytes),
  b64: figma.base64Encode(slice),
};
