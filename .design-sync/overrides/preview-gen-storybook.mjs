// FORK of .ds-sync/lib/preview-gen-storybook.mjs — see cfg.libOverrides in
// .design-sync/config.json for why. Two fixes to COMPOSE, both found by the
// grading fan-out (see NOTES.md):
//
// 1. Decorator double-count/wrong-order: this repo's stories are exclusively
//    CSF4 factories (preview.meta()/.story()/.extend()), and the
//    story-imports.mjs override's CSF4_FACTORY_STUB already fully merges
//    meta.decorators into every story.decorators (mergeArr(parent, config),
//    parent-first/own-last, recursively through .extend() chains — so the
//    final array is already correctly ordered [inherited..., own-last] i.e.
//    story-innermost). The base COMPOSE then did
//    `[].concat(st.decorators).concat(meta.decorators)`, appending
//    meta.decorators a SECOND time — duplicating every meta-level decorator
//    and pushing it to the outermost position (reduce's last array entry
//    wraps outermost), which also demoted the story's own `.extend()`
//    decorator to a middle position instead of properly wrapping around its
//    parent. Fixed by using `st.decorators` alone when present (it's already
//    complete) and only falling back to `meta.decorators` for the
//    (unused-by-this-repo) case where `st` has no decorators array of its
//    own at all.
//
// 2. `ctx.globals` was hardcoded to `{}` — any story setting
//    `.extend({globals: {backgrounds: {value: 'dark'}}})` (the real
//    Storybook backgrounds-addon mechanism) never got that value, so a
//    light-on-dark story (e.g. Link's "Reversed" variant) rendered
//    invisible light text on the default white page. Real Storybook sets
//    the addon's resolved colour on the preview iframe body; since several
//    stories render together in one grid page here (not isolated iframes),
//    doing the same to `document.body` would bleed into every sibling cell.
//    Instead, wrap just this story's rendered output in a `<div>` carrying
//    the resolved background as an inline style. The light/dark → CSS value
//    mapping is copied from this repo's own `.storybook/preview.tsx`
//    `parameters.backgrounds.options` (light: --colour-fill-neutral-lightest,
//    dark: --colour-fill-neutral-darkest) — repo-specific, which is exactly
//    why this lives in a fork rather than the generic base lib.
import { relative } from 'node:path'
import { exportName } from '../../.ds-sync/lib/common.mjs'

const COMPOSE = `function compose(S: any, key: string) {
  const meta: any = S.default ?? {};
  const st: any = S[key];
  const args: any = { ...(meta.args ?? {}), ...(st && st.args ? st.args : {}) };
  // Storybook resolves argTypes.mapping (control value -> real arg) before
  // rendering; mirror that so mapped args don't render raw. Merged PER KEY
  // (not whole-object) so a story that overrides one field of an argType
  // (typically {control: false}, to hide the control in Storybook's UI —
  // Badge/SectionMessage/SplitButton's Variants-style stories all do this)
  // doesn't silently drop that key's inherited "mapping" — the prior
  // whole-object merge did exactly that, letting the raw control string
  // (e.g. 'None') flow straight into a ReactNode prop and render as text.
  const metaAt: any = meta.argTypes ?? {};
  const stAt: any = (st && st.argTypes) ?? {};
  const at: any = {};
  for (const k of new Set([...Object.keys(metaAt), ...Object.keys(stAt)])) {
    at[k] = { ...(metaAt[k] ?? {}), ...(stAt[k] ?? {}) };
    if (at[k].mapping === undefined) at[k].mapping = (stAt[k] ?? {}).mapping ?? (metaAt[k] ?? {}).mapping;
  }
  for (const k of Object.keys(args)) {
    const m = at[k] && at[k].mapping;
    if (m && typeof m === 'object' && args[k] in m) args[k] = m[args[k]];
  }
  const title: string = typeof meta.title === 'string' ? meta.title : '';
  const globals: any = (st && st.globals) ?? meta.globals ?? {};
  const ctx: any = {
    args, name: key, title, kind: title, id: '', componentId: '',
    globals, viewMode: 'story',
    parameters: (st && st.parameters) ?? meta.parameters ?? {},
  };
  let render: (() => any) | null = null;
  if (st && typeof st.render === 'function') render = () => st.render(args, ctx);
  else if (typeof st === 'function') render = () => st(args, ctx);
  else if (typeof meta.render === 'function') render = () => meta.render(args, ctx);
  else {
    const C = (st && st.component) || meta.component;
    if (C) render = () => React.createElement(C, args);
  }
  if (!render) return () => null;
  // [].concat: a single function is legal CSF decorator shorthand. A
  // decorator returning undefined (stubbed addon) falls through to the inner
  // render — otherwise one unrecognized addon blanks the cell silently.
  // st.decorators (when present) is ALREADY the full meta+story chain —
  // CSF4_FACTORY_STUB's makeStory()/meta() merge inherited-first/own-last at
  // every .extend() step — so re-adding meta.decorators here would duplicate
  // and misorder them. Only fall back to meta.decorators when st itself
  // carries none (a plain CSF2/3-style export, unused by this repo but kept
  // for robustness).
  const decorators: any[] = ([] as any[]).concat((st && st.decorators) ?? meta.decorators ?? []);
  let composed = decorators.reduce((inner: any, dec: any) => () => {
    const out = dec(inner, ctx);
    return out === undefined ? inner() : out;
  }, render);
  const BG: any = { light: 'var(--colour-fill-neutral-lightest)', dark: 'var(--colour-fill-neutral-darkest)' };
  const bgValue = ctx.globals?.backgrounds?.value;
  const bg = bgValue && BG[bgValue];
  if (bg) {
    // Real Storybook's backgrounds addon paints the ENTIRE canvas/iframe body,
    // not a padded box hugging the component — fill the container edge-to-edge.
    const inner = composed;
    composed = () => React.createElement('div', { style: { background: bg, width: '100%', minHeight: '100%', boxSizing: 'border-box' } }, inner());
  }
  // parameters.layout: 'centered' wraps the story in a non-stretching,
  // centered flex container in real Storybook. Without it, any trigger
  // element styled to fill its parent's width (e.g. Tooltip's own trigger
  // button) has nothing but the full grid cell to size against and
  // stretches edge-to-edge instead of sitting content-sized — found on
  // Tooltip (uses this parameter); also present on table/more-actions,
  // menu, top-bar/avatar-menu, top-bar/avatar (not all necessarily affected
  // visually, only components whose trigger sizing depends on it).
  if (ctx.parameters?.layout === 'centered') {
    // A single flex wrapper doesn't stop a self-stretching trigger (e.g.
    // Tooltip's width:100% button) from filling the grid cell: the outer
    // div has no intrinsic width of its own, so it just inherits the
    // cell's full width and the percentage-width child fills it. Real
    // Storybook's #storybook-root avoids this via an intermediate
    // shrink-to-fit layer. Add one here: an inline-flex inner div sized to
    // its own content, nested inside the centering outer div.
    const inner = composed;
    composed = () => React.createElement(
      'div',
      { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' } },
      React.createElement('div', { style: { display: 'inline-flex' } }, inner()),
    );
  }
  return composed;
}`

// Generate the preview .tsx body for one component — or null when nothing
// paired, in which case no wrapper is written and the html shows the floor
// card (the same floor as a wrapper that fails to compile). Pairing failures
// are loud and fixable, so the floor card is the only fallback.
export function generatePreviewSource(c, opts) {
  // Story-module tier: needs the story source path and at least one visible
  // story paired to a module export (pairing happens in source-storybook.mjs
  // — c.storyIds[].exportKey).
  const skipSet = new Set(opts.skip ?? [])
  const visible = (c.storyIds ?? []).filter((s) => !skipSet.has(s.id))
  const paired = visible.filter((s) => s.exportKey)
  if (!c.storySrc || paired.length === 0) {
    if (c.storySrc && visible.length > 0) {
      console.error(`  (preview: ${c.name} — no story exports paired (storyName overrides?); showing the floor card)`)
    }
    return null
  }
  // Location-independent import: `@ds-stories/<path relative to the repo
  // root>` (forward slashes for machine portability), resolved by the
  // story-imports plugin set. A relative spec would bake in the wrapper's
  // directory depth — and the promote flow copies wrappers from the
  // generated cache into .design-sync/previews/ (one level shallower), so
  // the same file must compile from either home. One import per distinct
  // story module, in first-paired order; S is the first (and for
  // single-module components the only) one.
  const toSpec = (p) => {
    const rel = relative(process.cwd(), p).replace(/\\/g, '/')
    return JSON.stringify(`@ds-stories/${rel}`.replace(/\.[cm]?[jt]sx?$/, ''))
  }
  const modVars = new Map() // story source path -> import identifier
  const modVarFor = (p) => {
    if (!modVars.has(p)) modVars.set(p, modVars.size === 0 ? 'S' : `S${modVars.size + 1}`)
    return modVars.get(p)
  }
  // Emitted export names are PascalCased via exportName (the html mount loop
  // only renders /^[A-Z]/ exports; CSF allows camelCase keys) — compare's
  // squash pairing is case-insensitive, so pairing is unaffected. compose()
  // still receives the RAW module key. Squash collisions (two index stories
  // pairing to one export of the same module, e.g. via a storyName override)
  // emit once.
  // Each story records the EXACT export name its cell is emitted under
  // (s.emitted, carried into the stories-map) — labels are deduped when the
  // same key appears in several modules ("Default" + "Default2"), so compare
  // must pair on the emitted label, not a fuzzy match of the raw key.
  const seen = new Set()
  const used = new Set()
  const lines = []
  for (const s of paired) {
    const mod = modVarFor(s.storySrc ?? c.storySrc)
    const dupKey = `${mod}:${s.exportKey}`
    if (seen.has(dupKey)) {
      console.error(
        `  (preview: ${c.name} — story "${s.name}" pairs to already-emitted export ${s.exportKey}; skipping duplicate)`,
      )
      continue
    }
    seen.add(dupKey)
    const label = exportName(s.exportKey, used)
    s.emitted = label
    lines.push(`export const ${label} = /* ${s.name} */ compose(${mod}, ${JSON.stringify(s.exportKey)});`)
  }
  const imports = [...modVars.entries()].map(([p, v]) => `import * as ${v} from ${toSpec(p)};`).join('\n')
  return `import * as React from 'react';
${imports}

${COMPOSE}

${lines.join('\n')}
`
}
