# Sync Design Tokens — reference

Background for changing the sync tooling itself. Running a sync needs none of this;
`SKILL.md` is self-contained for that.

## Editing the exporter

Most of the Figma-to-DTCG mapping is mechanical. Four parts are not, and each one costs
a debugging cycle if changed carelessly:

- **Aliases arrive as variable IDs.** The ID-to-name map has to be built across every
  collection before any value can be written, because semantic tokens alias into
  `_Primitives`.
- **Dimensions round to two decimal places and take a `px` suffix**, except font
  `weight`, which is emitted bare. Figma stores `-0.3199999928474426`; the file says
  `-0.32px`.
- **`preprocess.js` returns arrays untouched**, so objects inside a `$value` array never
  get key-sorted and keep insertion order. Shadow layers must be written `offsetX,
offsetY, blur, spread, color` or the bytes differ while the length matches.
- **Descriptions come from `variable.description`.** Omitting them leaves each theme
  file thousands of bytes short.

Two collections must never be exported. `_Product demo` and `_Responsive` are
Figma-only, and one holds booleans, which DTCG cannot represent. This is why `EXPORT`
in the exporter is an explicit allowlist rather than every local collection — a new
collection in Figma has to be added deliberately.

Two more constraints belong to the transfer rather than the mapping:

- **The `digest` helper is duplicated** in the exporter and in
  [`token-digest.js`](scripts/token-digest.js), because one runs in the Figma sandbox
  and the other in Node. Change one and every file reads as changed on every sync, which
  looks like a huge diff rather than a broken hash.
- **Chunks are sliced on byte boundaries, not string boundaries.** The exporter encodes
  to UTF-8 first for this reason. Slicing the JSON string instead would split a
  multi-byte character across two chunks and decode to mojibake — and only in the files
  that happen to carry a non-ASCII description.

## Why the transfer is chunked at all

Chunking means ~240KB of token JSON passes through the agent's context on a full sync,
which is slow and costs a lot of calls. It is worth knowing why, because the obvious
objection has a real answer and an unfinished one.

The transfer is chunked because `use_figma` returns its result **to the agent** — that
is the only channel the tool offers. There is no filesystem from inside the Figma plugin
sandbox, and no REST read on our plan, so the bytes have nowhere else to go.

The better design, **not yet proven to work**, is to skip the agent entirely: have the
exporter POST each file to a short-lived local receiver that writes straight into
`packages/elements/src/tokens/`, leaving the `use_figma` response to carry nothing but a
status. That removes the chunking, the digests and most of the calls in one go. It hangs
on a single unanswered question — whether the plugin sandbox can reach `127.0.0.1` at
all, which depends on the `networkAccess` allowlist in Figma's own MCP plugin manifest,
something we do not control. A probe for this was written and never run.

**If you are about to rework this transfer, answer that question first.** A ten-line
`fetch` probe against a local listener settles it, and a positive answer makes the whole
chunking protocol in `SKILL.md` unnecessary.
