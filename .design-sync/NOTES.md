# design-sync NOTES

## Prerequisite: `.ds-sync/`

`.design-sync/overrides/*.mjs` fork `../../.ds-sync/lib/*` — the base design-sync tool itself,
which is gitignored and not checked into this repo. Run the `/design-sync` command locally first;
it generates `.ds-sync/` as part of its setup, before any of the override scripts can run.

## [GENERAL] Monorepo layout (post-DS-335) — what a sync must get right

The repo became a Yarn workspaces monorepo in `77c4c71f` (DS-335, 2026-08-18).
The published library is `packages/elements` (`@reapit/elements`); the repo-root
`package.json` is private and named `gbl-ds-elements`. That rename is the trap
behind almost everything below.

- **The synthesised barrel MUST live inside the package**:
  `packages/elements/.design-sync/entry.mjs`, exporting `../dist/js/{core,icons,utils}/*.js`.
  `package-build.mjs` derives `PKG_DIR` by walking up from `dirname(cfg.entry)`
  to the first `package.json` with a `name`. With the barrel at the repo root,
  `PKG_DIR` becomes the repo root (`gbl-ds-elements`), and `dist/types`
  discovery (`findTypesRoot`/`exportedNames`), `src/` scanning, docs discovery
  and every `cfgPath()` resolution silently point at the wrong tree — the sync
  still runs, it just produces a hollow bundle.
- **`cssEntry` and `extraEntries` are `PKG_DIR`-relative — do NOT prefix them
  with `packages/elements/`.** Correct values are `"dist/js/style.css"` and
  `["./dist/js/core/app-switcher/anz.js"]`. The migration commit helpfully
  re-pointed both at repo-root paths; both had to be reverted. Extra danger:
  `extraEntries` is hashed verbatim into the grade contract
  (`configSlicesFor` in `lib/sync-hashes.mjs`), so "fixing" that string wipes
  every grade in the project. Restore the historic string rather than an
  equivalent one.
- **`entry`, `storybookStatic` and `storybookConfigDir` are cwd-relative**
  (the sync runs from the repo root), hence
  `"storybookConfigDir": "packages/elements/.storybook"`. `readmeHeader`
  resolves from the config's own home, i.e. the repo root.
- **Pass `--node-modules packages/elements/node_modules` to every script**
  (`package-build.mjs`, `package-validate.mjs`, `package-capture.mjs`,
  `resync.mjs`, `lib/preview-rebuild.mjs`). Under `nodeLinker: pnpm` React and
  React-DOM are installed per workspace, not at the repo root; the flag also
  defaults `--inputs` to `packages/elements`, which is where the
  `source-storybook.mjs` fork looks for `.storybook`.
- **Reference Storybook build**:
  `yarn workspace @reapit/elements exec storybook build -o ../../.design-sync/sb-reference`
  (the `-o` is relative to the workspace directory).
- `manifests/components.json` records package-relative story paths (`./src/...`),
  which the `source-storybook.mjs` fork resolves against its `bases` list — no
  config needed, but don't "helpfully" rewrite those paths.
- **Subagents do not have the `DesignSync` tool.** Anchor fetches, `list_files`,
  `finalize_plan` and all uploads must be done by the main agent; delegating
  them fails with "unable to locate the DesignSync tool".
- `.gitignore` patterns are repo-root anchored post-migration:
  `/.ds-sync/`, `/ds-bundle/`, `/.design-sync/{sb-reference,learnings,.cache,node_modules}`.
  The durable committed set is `.design-sync/{config.json,NOTES.md,conventions.md,overrides/*.mjs}`
  plus `packages/elements/.design-sync/entry.mjs`.
- **The move itself does not clear grades.** `srcSha` hashes story-file
  _contents_ only (no paths — see `source-storybook.mjs`), and the migration
  commit changed zero story bytes (287 story paths, all pure renames). If a
  post-migration sync clears grades wholesale, the cause is real story churn,
  not the move: 310 story files changed content between the last sync and 5.3.

## Scope

First sync scoped to `src/core` + `src/icons` only (per user choice), excluding
`src/blocks`, `src/lab`, `src/deprecated`. `src/utils` is included in the
runtime bundle (`.design-sync/entry.mjs`) because core components depend on it
internally (ThemeProvider, Flex, Listbox, Combobox, etc.), but standalone
utils-only story titles are excluded from the browsable component list via
`cfg.titleMap` (Title, Subtitle, Text, Video, ThemeProvider, Flex, Heading,
Image, LineClamp, Popover, MatchMedia, AnchorPositioning, Combobox) since
they're not part of the chosen scope.

## [GENERAL] fixes (apply to any re-sync of this repo)

- **Grade file keys must be the exact story display name, spaces/hyphens and
  all** (e.g. `"Overridden surface"`, `"Max-width"`, `"Selected Tab"`) — never
  the PascalCase export name (`OverriddenSurface`, `MaxWidth`, `SelectedTab`).
  A wrong key silently never joins a real story and just resurfaces later as
  a confusing "awaiting grade" on the next driver run (`compare.mjs` prints
  `(grade key(s) matching no story for <Name>: ...)` when this happens —
  watch for it). Also: when two stories in the same 6-story-capped sheet
  share a display name (e.g. two "Example" rows from different subcomponent
  files), they collapse into ONE key — do not invent `Example2`/`Example3`
  keys for the duplicates, `compare.mjs` dedupes by the literal display name.
  Hit 13/84 components in the 2026-07-16 re-grade wave; all were genuine
  `match` verdicts, just mis-keyed — fixed by rewriting the grade.json keys,
  no re-grading needed.

- **No root `.` export**: `package.json` only has subpath exports
  (`./core/*`, `./icons/*`, etc.) — `cfg.entry` points at a synthesized
  `.design-sync/entry.mjs` that re-exports every `dist/js/{core,icons,utils}/*.js`
  file. `.design-sync/overrides/dts.mjs` fixes `exportedNames()`'s entry
  resolution (it fell back to `<pkgDir>/index.d.ts` instead of
  `<typesRoot>/index.d.ts`) and supplements the top-level barrel scan with
  every `<typesRoot>/*/*/index.d.ts` sub-barrel — `dist/types/core/index.d.ts`
  is missing several real components (CompactSelect, CurrencyControl,
  CurrencyInput, ProgressIndicator) — an upstream barrel-generation gap.
- **Node `imports` field subpath aliases** (`#src/*`, `#.storybook/*` in
  `package.json`): Vite resolves these leniently (directory + extension
  fallback); esbuild's own Node-imports algorithm is strict and throws
  "Importing the directory ... is forbidden". `.design-sync/overrides/story-imports.mjs`
  pre-resolves `#`-specifiers to a real file before handing them to `b.resolve()`.
- **kebab-case source dirs vs PascalCase/ancestor-prefixed exports**: the
  upstream component-redirect heuristic (`exportedComponentFor`) assumed
  matching case and exact dir↔export names. Forked to add: kebab→PascalCase
  conversion, an `Icon`-suffix fallback (`src/icons/<kebab>.tsx` exports
  `<Pascal>Icon`), and a 2-level ancestor-prefix fallback (e.g.
  `focused-layout/product-logo/product-logo.tsx` exports
  `FocusedLayoutProductLogo`).
- **CSF v4 "factories"**: stories call `preview.meta({...})` /
  `meta.story({...})` / `story.extend({...})` / `preview.type<T>()` (no
  `export default meta`). Added a real functional `definePreview` stub for
  `@storybook/react-vite` (not the generic inert `@storybook/*` stub) so
  these evaluate correctly. `meta`/story objects expose `.input` (the raw
  config passed to `.meta()`/`.story()`/`.extend()`) — several stories read
  `meta.input.argTypes` directly.
- **`@linaria/core` + `@linaria/react`**: runtime guard throws
  ("Using the css tag in runtime is not supported") whenever a style helper
  or compound/namespace subcomponent (not itself a top-level export, so it
  can't redirect to the shipped global) bundles from source. Replaced with a
  real minimal runtime CSS-in-JS (`<style>` injection, hashed classNames) —
  dynamic (function) interpolations are dropped, not evaluated.
- **`vite-plugin-svgr` `?react` imports** (214+ files): `./foo.svg?react`
  imports a real React component, not a URL — the default `.svg`→`dataurl`
  loader breaks this. Added a real `onLoad` plugin that parses the SVG and
  emits a functional component, falling through to `dataurl` for
  non-`?react` imports.

## Known title collisions

A subcomponent name coincidentally matches an unrelated top-level export —
`titleParts`'s right-to-left scan stops at the first exportedSet match, so a
nested title like `X/Y/Button` collapses into the unrelated top-level
`Button` instead of `X.Y`'s own `Button` member.

Fixed via `cfg.overrides.<RealName>.skip` (see config.json): Button (vs
`Utils/Combobox/Button`), Dialog (vs `Content display/GalleryViewer/Dialog*`),
Listbox (vs `Utils/Listbox` and `Utils/Combobox/Listbox`), TopBar (vs
`Containers and layout/FocusedLayout/TopBar`), Chip (vs
`Input and selection/ChipSelect/Chip`), BottomBar (vs
`Containers and layout/FocusedLayout/BottomBar` and its own `MenuList`
subcomponent, which needs `BottomBarContext` and can't render standalone).

**If a re-sync introduces a NEW nested/compound title, check whether its
last 1-2 segments coincidentally match an existing top-level export name —
that's this same class of bug, not a new one.**

## Remaining known-bad components — RESOLVED (87/87 clean as of this sync)

Fixed via `cfg.overrides.<Name>.skip` this session (subcomponent rendered
standalone, outside its real parent, needs a context the isolated capture
can't provide — same root cause each time): SplitButton (Action/MenuButton),
SideBar (CollapseButton/MenuGroup/MenuItem/MenuList/Submenu/SubmenuItem),
Dialog (Header's Action/NoTitle/StaticPositioning/StickyPositioning variants,
Footer's Example/FullScreen/Sticky, GalleryViewer's nested Dialog).

The remaining 5 unresolved components from the previous session are now fixed:

- **Dialog**: the 3 errors were `Dialog/Body`'s own 3 stories (Example,
  LongContent, DynamicLayout) — `component: Dialog.Body` with no custom
  `render`, so storybook (and our capture) renders `<Dialog.Body>` standalone
  with no `<Dialog>` ancestor providing `DialogContext`. Also
  `Dialog/Header`'s `--example` story had the same issue but was missing from
  the skip list (only action/no-title/sticky-positioning/static-positioning
  were skipped). Fixed by adding all of Body's + Header's `--example` story
  IDs to `cfg.overrides.Dialog.skip`.
- **PageLayout**: the "Mobile" story's `BottomBarPlaceholder` (in
  `__story__/placeholders.tsx`) calls `usePageLayoutContext` via a relative
  import (`'../context'`) that the story-imports redirect heuristic doesn't
  touch (only "component" names get redirected, not context modules) — so it
  gets a freshly-source-compiled `PageLayoutContext` instance, different from
  the one the redirected (bundle) `PageLayout`/`BottomBarRegion` actually
  provide. Two context instances → `usePageLayoutContext` throws despite
  being nested correctly. Fixed by skipping
  `containers-and-layout-pagelayout--mobile`.
- **Accordion**: `Content display/Accordion/Summary`'s title ends in
  "Summary", which isn't a recognized top-level export, so `titleParts`'s
  right-to-left scan fell through to the unrelated top-level "Accordion"
  export — a title collision (same class as the Button/Dialog/Listbox/etc.
  collisions already documented below), merging Summary's 4 stories into
  Accordion's own HTML. Summary's own decorator wraps `<Story/>` in an
  `AccordionContext.Provider` imported relatively (`'../context'`) —
  same dual-context-instance bug as PageLayout's Mobile story above, since
  `Accordion.Summary` itself IS redirected to the bundle. Fixed by adding the
  4 Summary story IDs to `cfg.overrides.Accordion.skip`.
- **TopBar**: `TopBarMenuDrawer` (`top-bar/menu-drawer/menu-drawer.tsx`) is
  not a real package export (only reachable as `TopBar.MenuDrawer`), but the
  `dts.mjs` override's sub-barrel scan (`core/*/*/index.d.ts`, added to catch
  the main barrel's missing exports) picked up
  `top-bar/menu-drawer/index.d.ts`'s re-export of `TopBarMenuDrawer` as if it
  were a real top-level name. The story-imports ancestor-prefix heuristic
  then matched `menu-drawer/menu-drawer.tsx` → `"TopBar" + "MenuDrawer"` and
  shimmed it to `window.ReapitElements.TopBarMenuDrawer`, which doesn't
  exist → `undefined`. The same false-positive also hit
  `menu-drawer/secondary-nav/secondary-nav.tsx` (`dirP` "SecondaryNav"
  collided with the real, unrelated `dist/js/deprecated/secondary-nav.js`
  export). Fixed via `cfg.storyImports.bundle: ["top-bar/menu-drawer/"]`,
  forcing the whole `menu-drawer/` subtree to bundle from source instead of
  being shimmed — safe since all its pieces are mutually self-consistent.
- **SearchInput**: `Utils/Combobox/SearchInput`'s 3 stories (Example, Drawer,
  Auto) collided into the real `Input and selection/SearchInput`'s HTML via
  the same title-collision class documented below. Fixed by adding those 3
  story IDs to `cfg.overrides.SearchInput.skip`.

**[GENERAL] dts.mjs sub-barrel scan can surface non-public names**: the
`core/*/*/index.d.ts` sub-barrel scan (added to catch the main barrel's
missing exports — see below) also picks up NESTED namespace barrels
(`top-bar/menu-drawer/index.d.ts`, `top-bar/secondary-nav/index.d.ts`, etc.)
whose re-exported names are only reachable via their parent's compound
namespace (`TopBar.MenuDrawer`, `TopBar.SecondaryNav`), not as flat package
exports. Two failure modes from this: (1) a name that happens to match an
UNRELATED real top-level export gets wrongly shimmed to that other export's
global (`storyImports.bundle` override, see TopBar above); (2) a
subcomponent's OWN display name (the story title's last segment) gets
captured as if it were independently browsable, then fails
`[BUNDLE_EXPORT]` at validate time since it's not addressable as a flat
`window.ReapitElements.<Name>` global. `Portal`, `SecondaryNav`, and `Tab`
hit failure mode (2) this session — excluded via `cfg.titleMap.<Name>: null`
(their real functionality stays documented under their parent's own
component: `AlertBanner.Portal`, `TopBar.SecondaryNav`,
`FolderTabs.Tab`/`PrimaryTabs.Tab`). **If a re-sync's `[BUNDLE_EXPORT]`
check fails on a new name, check whether it's actually only reachable via a
parent namespace before assuming it's a real regression.**

**[GENERAL] GRID_OVERFLOW warnings**: ~34 components had stories that render
wider than their grid cells (data tables, wide bars, sizing comparisons).
Fixed by adding `cardMode: "column"` to each in `cfg.overrides` per the
validator's own suggested remedy — full card width per story, nothing
dropped, no re-grade needed (presentation-only key). See config.json for the
full list (AnchorCard, ButtonCard, Drawer, FocusedLayout, PageHeader,
AtAGlance, Features, GalleryViewer, TopBar, Chip, ChipGroup, EmptyState,
StatusIndicator, ChipSelect, CompactSelectNative, CurrencyControl,
CurrencyInput, DateTimeControl, DateTimeInput, NumberControl, NumberInput,
SearchInput, SelectNative, SelectNativeControl, TextControl, TextInput,
TextareaControl, AlertBanner, SectionMessage, Breadcrumbs, FolderTabs,
PrimaryTabs, SecondaryTabs, SupplementaryInfo).

**[GENERAL] compare.mjs `sb-error` false positive (ChipSelect,
ChipSelectControl)**: `compare.mjs` reported "no storybook root content" for
`ChipSelect`'s Example/Multi-select stories and ALL 4 of
`ChipSelectControl`'s stories — but direct navigation to the exact same
reference iframe URL (`iframe.html?id=...&viewMode=story`), with the same
`networkidle` wait, reduced-motion, and frozen-clock setup, reliably renders
correct content every time (verified via ad-hoc Playwright scripts, isolated
and sequential). The DS-side preview also renders perfectly on its own. This
looks like a harness-specific flake (possibly shared-browser-process
contention between the sb/ds pages during a real compare run) rather than a
real reference-rendering bug — skipping these stories via
`cfg.overrides.<Name>.skip` per the normal `sb-error` recipe would have
dropped 2 working components entirely (ChipSelectControl has zero
non-sb-error stories), so instead their `.grade.json` files were
hand-written with `"basis": "manual-verify"` notes explaining the deviation.
**If a re-sync's `compare.mjs` run reproduces this on the SAME 2 components,
it's the known flake — re-verify manually rather than skipping.** If it
newly appears elsewhere, investigate for real — don't assume every
`sb-error` is this same flake.

Reproduced a third time on the 5.3 re-sync (2026-08-18): same 2 components,
same 6 stories (`ChipSelect` Example/Multi-select, all 4 of
`ChipSelectControl`). Practical notes for the next person doing the
manual re-verification:

- `compare.mjs` `continue`s on `sb-error` **before** it captures the DS panel,
  so no raw shot exists for EITHER side — the manual script must shoot both
  panels itself, not just the storybook one.
- Reuse the harness's own primitives so the comparison is like-for-like:
  `.ds-sync/storybook/http-serve.mjs`'s `serveDir` for both roots, the
  `#storybook-root, #root` content-wait, `settleRender`'s
  `fonts.ready` + `image.decode()` settle, and `{animations:'disabled'}` shots.
  The DS panel is the card at
  `components/<group>/<Name>/<Name>.html?story=<cellLabel>`, where the label
  comes from the card page's own `window.__dsCells`.
- `playwright` is installed under `.ds-sync/node_modules`, NOT repo root or the
  package — a bare `import 'playwright'` only resolves for scripts living
  inside `.ds-sync/`. A scratch script elsewhere must import it by absolute
  path (`NODE_PATH` does nothing for ESM).
- Outcome each time: storybook rendered fine on every attempt (no error,
  ~3.7-3.9KB of root HTML) and all 6 pairs were pixel-faithful, so the 6
  hand-written `manual-verify` verdicts stand.

**ProgressIndicator, Skeleton, StatusIndicator, CheckboxInput, RadioInput,
SwitchInput**: render without error but with placeholder/thin content — not
a bug, just need an authored `.design-sync/previews/<Name>.tsx` for a more
realistic demonstration (per the package-shape authoring guidance in the
base skill).

**Debugging recipe that solved every collision case this session** (reuse
this for the 5 above): 1) find the component's contact sheet in
`ds-bundle/_screenshots/<group>__<Name>.png` and identify which labeled
cells are actually blank; 2) `grep` `.design-sync/sb-reference/index.json`
for every title containing the component's name at any nesting depth; 3)
check whether a DIFFERENT, unrelated top-level export's name coincidentally
matches the last (or second-to-last) segment of one of those nested titles
— if so, that's a title collision, fixable with `cfg.overrides.<RealName>.skip`
naming the colliding IDs; 4) if no collision, `grep` the component's own
subcomponent source files for `use<X>Context` and check whether the failing
story renders that subcomponent standalone (outside its real parent) — same
fix, different story IDs.

## [GENERAL] Critical: cssEntry auto-detection missed the real stylesheet

The converter's `cssEntry` auto-detection only guesses
`build/esm/styles.css`, `dist/styles.css`, `dist/style.css`, `styles.css` —
none of which match this repo's real output at `dist/js/style.css` (the
`js/` subdir breaks every guess). It silently fell back to scraping CSS from
the storybook build instead, and that scrape ended up with a bare
`@layer elements.main;` declaration and NO body — i.e. almost none of the
real component CSS (borders, backgrounds, flex layouts, colours, padding,
focus rings, etc.) shipped in `_ds_bundle.css`, even though `:root` tokens
and `elements.base` resets were present and looked plausible at a glance.
This was caught only because a grading subagent flagged every one of its 8
components as a visual mismatch and traced it to the missing layer body.
**Fixed by setting `cfg.cssEntry: "dist/js/style.css"` explicitly.**
`_ds_bundle.css` grew from ~76KB to ~381KB after the fix — any future
resync where it's suspiciously small again is this same bug recurring
(check for an upstream cssEntry override loss, e.g. config restored from an
older backup).

**Any grade recorded before this fix landed in this session is invalid and
was cleared for re-grading against the corrected CSS.**

## [GENERAL] TOKENS_MISSING (non-blocking, upstream naming mismatches)

`package-validate.mjs` reports 27 CSS custom properties referenced by
component styles but not defined in any shipped stylesheet (`dist/js/style.css`
or `src/tokens/dist/reapit.css`) — e.g. `--border-default` (components
reference the bare name; the actual generated tokens are all prefixed,
`--comp-input-colour-border-default` etc.) and
`--comp-input-colour-text-busy-placeholder` (actual token is
`--comp-input-colour-text-busy-input`). These look like real upstream
naming mismatches in component source (typos or stale references after a
token rename), not a sync-tool/config gap — `src/tokens/dist/reapit.css`
was checked directly and genuinely doesn't define these exact names either.
Out of scope to fix here (that's a component-library-source fix, not a
design-sync config fix); left as a non-blocking validate warning. Re-check
this list on future syncs — if it shrinks, tokens got renamed to match; if
it grows, a new mismatch was introduced upstream.

## GRID_OVERFLOW after the cssEntry fix

Real box models only appeared once the CSS fix landed, surfacing several
new legitimately-wide stories the broken-CSS build couldn't have flagged
(collapsed/unstyled content can't overflow a grid cell). Fixed via
`cardMode: "column"` (Grid, Button, SplitButton, Card, Tag — full card
width, all stories kept) and `cardMode: "single"` + `primaryStory: "Example"`
(DescriptionList, SectionMessage — some of their stories position content
via fixed/portal layout that no grid can present at all).

## Per-component preview fixes from the grading fan-out (wave 1)

- **Badge**: the generated preview's `compose()` helper merges `argTypes` per
  key; when a story's `argTypes.extend()` overrides a key with
  `{control: false}` (as `Variants` does for `iconLeft`/`iconRight`, to hide
  the control in Storybook's UI), it silently drops that key's `mapping`
  (`None -> null`, etc.) — the raw control string `'None'` then flows
  straight into the `ReactNode` icon prop and renders as literal text.
  **Originally fixed per-component with an owned `.design-sync/previews/Badge.tsx`; superseded
  by the general fix below (SplitButton bug) — the owned preview was removed once the shared
  `compose()` handled the mapping correctly on its own, and Badge re-verified `match` without it.**
  **[GENERAL, confirmed on Badge, SectionMessage, and SplitButton] Fixed generically in
  `.design-sync/overrides/preview-gen-storybook.mjs`'s `compose()`: argTypes now merge PER KEY
  with a mapping fallback (`at[k].mapping ??= story-level ?? meta-level`), so a story overriding
  one field of an argType (typically `{control: false}`, to hide the control) no longer drops
  that key's inherited `mapping`. SplitButton's `Disabled` story (rendered literal `"Disabled"`
  text instead of its mapped disabled sub-component JSX) was the confirming case — re-verify
  `match` after this fix without needing a per-component owned preview.
  If another component's `Variants`-style story shows a literal control string rendering as
  content, this fix should already cover it — check the rendered result before authoring a new
  owned preview for the same cause.**

## [GENERAL] Two more shared-infra bugs found by the grading fan-out (wave 2), both fixed

- **Decorator merge order/duplication**: `story-imports.mjs`'s `CSF4_FACTORY_STUB.makeStory()`
  builds `story.decorators = mergeArr(parent.decorators, config.decorators)` — already the FULL
  meta+story chain, inherited-first/own-last, correctly ordered story-innermost. The base
  `compose()` (from `.ds-sync/lib/preview-gen-storybook.mjs`) then re-concatenated
  `meta.decorators` a SECOND time, duplicating every meta-level decorator and pushing it to the
  outermost position, which also demoted a story's own `.extend({decorators:[...]})` addition to
  a middle position instead of properly wrapping its parent. Hit GalleryViewer's `Carousel/Sizing`
  story (its 400px-bordered-box decorator got overridden, rendering at full unconstrained width).
  **Fixed** with a new fork, `.design-sync/overrides/preview-gen-storybook.mjs` — its `compose()`
  uses `st.decorators` alone when present (already complete) instead of re-adding
  `meta.decorators`.
- **`ctx.globals` hardcoded to `{}`**: any story setting `.extend({globals: {backgrounds: {value:
'dark'}}})` (Storybook's real backgrounds-addon mechanism) never got that value — a
  light-on-dark story (Link's `Reversed` variant) rendered invisible light text on the default
  white page. **Fixed** in the same new fork: `ctx.globals` now reads from `st.globals ?? meta.globals`,
  and if `globals.backgrounds.value` resolves via this repo's own `.storybook/preview.tsx` palette
  (light → `--colour-fill-neutral-lightest`, dark → `--colour-fill-neutral-darkest`), the story's
  rendered output is wrapped in a `<div>` carrying that background as an inline style (NOT applied
  to `document.body`, since multiple stories share one grid page here, not isolated iframes —
  touching body would bleed into every sibling cell).
- Both fixes verified this session: GalleryViewer's `Sizing` — no, see below (separate residual
  issue); Link's `Reversed` now renders correctly (dark background, white text, pixel-matching).

**Residual, NOT fixed by the above — GalleryViewer's `Carousel/Sizing` story still renders at full
width instead of the reference's 400px-bordered box.** Correction (2026-07-16): an earlier version
of this note attributed this to a "story-pairing collision" between two co-titled "Sizing" exports
across sibling sub-files — that theory is WRONG, disproven by direct inspection. There is only ONE
`export const Sizing` anywhere under `src/core/gallery-viewer/` (in `carousel.stories.tsx`); the
`Sizing2` name seen in `ds-bundle/_preview/GalleryViewer.js` is just esbuild's collision-avoidance
suffix between the raw per-module `Sizing` (`carousel_stories_exports.Sizing`) and the final
composed `Sizing2 = compose(carousel_stories_exports, "Sizing")` — the SAME story, composed twice
(module-level, then again for the preview-ready render), not two different stories. Confirmed by
checking `thumbnail-list.stories.tsx`'s superficially similar `--size-64`-bordered decorator: that
story is actually named `Layout`, not `Sizing` — a substring-matching false lead in the original
diagnosis.

The real cause: `Sizing` is the only one of its story siblings (`Controlled`, `VideoItem`,
`ReadOnly`, `ErrorFallback` — all pixel-match fine) that sets its OWN `decorators: [...]` array
(the 400px/magenta-border wrapper) rather than inheriting the meta-level `render`. All siblings go
through the identical `compose(carousel_stories_exports, "<Name>")` call and render correctly, so
the bug is specifically that this per-story `decorators` array isn't honored somewhere in that
composition step — narrower than, and distinct from, the meta+story decorator-duplication bug fixed
above (that fix didn't touch this case; `Sizing`'s decorator isn't duplicated, it's dropped
entirely). Not root-caused further this session. Graded `mismatch` with this note; not blocking
upload (one story out of GalleryViewer's many, rest all match) and not fixable via an owned preview
(the decorator, not the story's JSX, is what's being dropped).

## [GENERAL] Linaria ancestor-selector CSS bug in the runtime stub, fixed

`story-imports.mjs`'s minimal Linaria `css()` runtime wrapped the ENTIRE raw template — including
nested rule blocks — inside one outer `.hash { }`. For an ancestor-selector pattern like
`details:open & { transform: rotate(180deg); }` (used by ~19 files across
`src/core/{office-switcher/office-group,side-bar/*,chip*,dialog/*,button,table/sort-button,
menu/item,top-bar/*,supplementary-info,features/item,badge}/styles.ts` — grep for
`details:open &` / `) &\s*{` / `] &\s*{` to find them all), this produced
`.hash { details:open .hash { ... } }` — under native CSS nesting semantics, a nested selector not
starting with `&` gets the parent PREPENDED, so this became `.hash details:open .hash`, requiring
TWO `.hash` ancestors — never matches. OfficeSwitcher's chevron never rotated open as a result.
**Fixed**: `css()` now splits the raw template into top-level declarations (still wrapped in
`.hash{}`) vs nested blocks (each emitted as its own top-level rule, `&` replaced by `.hash`,
`@media`/`@supports` handled by wrapping their inner declarations in `.hash{}` instead). Verified
this session: OfficeSwitcher's `Open` story now shows the chevron correctly rotated, matching the
reference exactly. Only components whose ancestor-selector-using styles are bundled from SOURCE
(non-top-level subcomponents not redirected to the shipped bundle — e.g. `OfficeGroup`) were ever
affected; top-level exports (Button, Dialog, Table, Menu, TopBar, Chip, etc.) redirect their own
module wholesale to the real compiled bundle and were never at risk, confirmed by re-checking their
sheets post-fix (no change, still match).

## [GENERAL] `.el-form-layout` class-name collision with a deprecated component (upstream, not fixable here)

`dist/js/style.css` defines `.el-form-layout` TWICE — once for `src/core/form-layout`
(`display:flex;flex-direction:column`) and once for `src/deprecated/form-layout`'s `ElFormLayout`
(`display:grid;grid-template-columns:repeat(4,1fr)`). Both Linaria `styled()` calls slugify to the
identical class name with no disambiguating hash, and the deprecated grid rule appears later in
the stylesheet so it wins the cascade — verified live: `getComputedStyle` returns `display:grid`
on the current, non-deprecated `FormLayout`. This only surfaces here (not in the real Storybook)
because `cfg.cssEntry` ships the full production stylesheet — including deprecated styles —
unconditionally, while Storybook's own build for this story never pulls in the deprecated module.
**Fixed** via a `css-fallback.mjs` fork in `.design-sync/overrides/` that appends an unlayered
`.el-form-layout{display:flex;flex-direction:column;gap:var(--spacing-10)}` override at the end of
`_ds_bundle.css` on every build — this comes after the deprecated grid rule in source order and
therefore wins the cascade. FormLayout re-graded `match`. The fork runs automatically on every sync.
**If a re-sync introduces a new component whose kebab-case name also exists under `src/deprecated/`,
check for this exact class-slug collision before assuming a different cause.**

## [GENERAL] `parameters.layout: 'centered'` now honoured in the shared harness

Real Storybook wraps a `layout: 'centered'` story in a non-stretching, centered flex container.
The shared `compose()` only read `ctx.globals.backgrounds` (wave 2's fix), never
`parameters.layout` — so any story whose own root element sizes itself relative to its container
(e.g. Tooltip's trigger `<button style={{width:'100%'}}>`) had nothing to size against and
stretched to fill the whole grid cell instead of sitting content-sized. Confirmed on Tooltip
(all 4 stories graded `mismatch` for this reason) and known to affect the same idiom in
`table/more-actions`, `menu`, `top-bar/avatar-menu`, `top-bar/avatar` stories repo-wide (grep
`layout: 'centered'` to find any more). **Fixed** in
`.design-sync/overrides/preview-gen-storybook.mjs`'s `compose()` — it now wraps the render in a
centering flex container when `ctx.parameters.layout === 'centered'`. **Tooltip's `mismatch`
grades predate this fix and must be re-graded** on the next full build; re-check Table/Menu/TopBar
too since their stories may share the same idiom even without a prior mismatch flag.

**Correction — this fix was incomplete; see "Fan-out re-grade wave — two real fixes" below.** A
bare single flex wrapper has no intrinsic width of its own, so a percentage-width trigger
(Tooltip's own `width:100%` button) still filled the whole grid cell — Tooltip's
`Example`/`Placement`/`Max-width` stories still reproduced the stretch even after this fix landed.
Menu graded clean only by coincidence (its trigger has no percentage-width styling, so it was never
exposed to the gap either way).

## [GENERAL] `backgrounds` global renders a padded box, not full-bleed paint — fixed

Real Storybook's `backgrounds` addon paints the ENTIRE canvas/iframe body. The shared `compose()`'s
`bg` wrapper block wrapped just the component in `<div style="background:...;padding:1rem">` — a
padded box hugging the component, not the same effect. Confirmed on Autocomplete's `Borderless`
story; the same `backgrounds` global appears on 20+ other story files repo-wide (drawer, side-bar,
bottom-bar, card, dialog, folder-tabs, link, table/toolbar, page-header, top-bar, search-input,
office-switcher, gallery-viewer, empty-state), so any of those may show the same delta once
re-graded. **Fixed** in `.design-sync/overrides/preview-gen-storybook.mjs`'s `compose()` — the `bg`
wrapper now fills its container edge-to-edge (`width/minHeight: 100%`, no padding) instead of an
inset padded box.

## [GENERAL] argType `mapping` loss on a partially-overridden key — the REAL root cause, fixed

The `[GENERAL, confirmed on Badge, SectionMessage, and SplitButton]` fix recorded above (per-key
argType merge in `preview-gen-storybook.mjs`'s `compose()`) turned out to be necessary but not
sufficient — SplitButton's `Disabled` story was fixed by it, but Badge's `Variants` story was NOT,
and the reason reveals the fix landed one layer too late:

1. **The mapping is already gone before `compose()` runs.** `story-imports.mjs`'s
   `CSF4_FACTORY_STUB.makeStory()` merges a story's `argTypes` onto its parent's with
   `Object.assign({}, parent.argTypes||{}, config.argTypes||{})` — a shallow merge keyed by argType
   NAME, but WHOLE-OBJECT per name. When a story (e.g. Badge's `Variants`) redefines `iconLeft`/
   `iconRight` as `{control: false}` to hide the control, that whole-object replacement destroys the
   parent's `{control:'radio', options, mapping}` for that key — by the time the story object exists,
   `mapping` is already gone. `compose()` never gets a chance to recover it.
2. **`compose()`'s meta-fallback is dead code in this repo.** It reads `meta = S.default ?? {}` to
   recover a dropped mapping from the meta-level argType — but this repo's stories are CSF4 factories
   (`preview.meta({...})`, no `export default meta`), so `S.default` is always `undefined`. There is
   no live path back to the full original argTypes from `compose()` at all here.
   Net effect: the compose()-level fix only helps a story that never redefines a mapped argType key
   (Badge's `Icons`/`Colours`/`IconOnly`/`Overflow` — fine, since they don't touch `iconLeft`/
   `iconRight`) — it does nothing for `Variants`-style stories that add `{control:false}` on a key
   that also carries a `mapping`.
   **Fixed for real** in `story-imports.mjs`'s `CSF4_FACTORY_STUB.makeStory()` — `argTypes` now merge
   PER SUB-KEY (like `compose()`'s fix), not per-argType-name-whole-object, so a story overriding one
   field of an argType no longer drops that key's inherited `mapping` before `compose()` ever sees it.
   **Re-verify Badge's `Variants` story (and SectionMessage/SplitButton, which may have been
   coincidentally fine before for unrelated reasons) after this lands** — this is the fix that should
   have made all three actually work.

**Verified**: Badge's `Variants` and Autocomplete's `Borderless` both re-graded `match` after this
fix + the backgrounds-wrapper fix above, rebuilt via a full `package-build.mjs` + `package-validate.mjs`
(validate stayed clean — same known `TOKENS_MISSING`/`RENDER_THIN` warnings as always, nothing new).
One incidental fix noticed in the same rebuild: `_ds_bundle.css` dropped from ~763KB to ~381KB — the
763KB figure from the earlier full driver run was accidental DOUBLED content (CSS "appended" onto a
stale leftover in the output dir rather than freshly "copied"), not lost content. 381KB matches
`dist/js/style.css`'s real size 1:1. SectionMessage/SplitButton have NOT been re-verified against
this fix yet — do so as part of the remaining fan-out waves rather than assuming they're still fine.

## Fan-out re-grade wave — two real fixes (Tooltip centering, Drawer viewport clipping)

Launched a full re-grade fan-out (4 subagents, batches A-D, 28 components) to re-verify everything
against the shared-infra fixes recorded above, since the argType-mapping-per-sub-key fix and the
backgrounds-full-bleed fix were both landed in the SAME `story-imports.mjs`/`preview-gen-storybook.mjs`
edit that cleared every existing grade (fork edits are global — see the rebuild-rules table in
`.ds-sync/storybook/SKILL.md` §4a). 26/28 components graded clean `match` with zero preview edits
needed. Two real, config-level bugs surfaced:

- **Tooltip's `layout:'centered'` fix (above) was genuinely incomplete, not just unverified.**
  Root cause: `compose()`'s centered-layout wrapper was a single
  `<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>` — this div has no
  intrinsic width of its own, so it just inherits the grid cell's full width, and a percentage-width
  trigger (Tooltip's own `<button style={{width:'100%'}}>`) still resolves against that full width and
  stretches edge-to-edge. In real Storybook, the centering flex container's DIRECT child
  (`#storybook-root`) is itself a flex item that gets shrink-to-fit sizing, and the button is a further
  descendant of THAT already-narrow box — there's an intermediate shrink-to-fit layer this repo's
  wrapper never had. Tooltip's `ConditionalDisplay` story passed only by accident (its own extra
  decorator happens to force the right sizing math); `Example`/`Placement`/`Max-width` all reproduced
  the stretch. **Fixed** in `preview-gen-storybook.mjs`'s `compose()` — nested an `inline-flex`
  shrink-to-fit inner div inside the centering outer div (which also now carries
  `width:'100%', height:'100%'` so `alignItems:'center'` has vertical room to act on — this
  incidentally fixes a second, non-blocking finding: the wrapper only ever centered horizontally, not
  vertically, pinning centered content to the top of the capture canvas instead of storybook's true
  2-axis centering; caught on TopBar's AvatarButton/AvatarMenu stories, which didn't regrade to
  `mismatch` only because their trigger is a fixed-size circle that doesn't depend on 2-axis centering
  to look right). Rebuilt (`package-build.mjs` + `package-validate.mjs`, both clean, same
  `TOKENS_MISSING`/`RENDER_THIN` warnings as always) and reverified with a scoped
  `compare.mjs --components Tooltip,Drawer`: Tooltip's trigger now renders content-sized on all 4
  stories, matching the reference.
- **Drawer's `Breakpoints` story was clipped by the fixed capture-cell viewport.** The DS capture cell
  defaults to 900×700 with `overflow:hidden`; storybook's own shot for this specific (unusually tall)
  story is a tight bbox around ~868×932 of real content — content past 700px (the pink
  "XS-SM/MD-2XL breakpoints" header labels) got cropped out of the DS shot even though the underlying
  render was pixel-identical. **Fixed** via `cfg.overrides.Drawer.viewport: "1000x1000"` — per the
  rebuild-rules table a `viewport` change moves the capture-viewport grade slice, so it needed the same
  full rebuild as the Tooltip fix (a `cardMode`/`primaryStory`-only change would not have). Reverified:
  Breakpoints now renders fully in both panels, `match`.

Both fixes are verified only on the 2 components that surfaced them — per §4c between-waves rules, a
global config/fork fix is proven on 1-2 hit components, not a roster-wide compare. The 24 components
still pending as of this note (see the fan-out task list) will pick up both fixes automatically on
their next scoped capture (already-graded `match`/`close` components on unrelated code paths are
unaffected and stay carried-forward). One informational, non-actionable signal seen by 2 of the 4
batches (C, D): `compare.mjs` printed `[REFERENCE_STALE?]` once each run — expected here, since the
fork edits changed the bundle/previews while `.design-sync/sb-reference` (the real storybook build,
correctly untouched) didn't; not a real staleness bug, don't chase it if seen again for the same reason
mid-campaign.

GalleryViewer's `Carousel/Sizing` mismatch (residual per-story decorator drop, documented earlier in
this file — see the 2026-07-16 correction) reproduced identically in this wave — no new information,
still not fixable via an owned preview.

## Fan-out waves 9-11 — remaining components graded, no other fixes needed

SelectControl, SelectNative, SelectNativeControl, Skeleton, StatusIndicator, Switch, SwitchInput,
Tag, TagGroup, Textarea, TextareaControl, TextControl, TextInput, Toast, Toaster all graded
`match` cleanly against the shared-infra fixes already in place (decorator-merge, `globals.backgrounds`,
Linaria ancestor-selector, argTypes-mapping). Skeleton's thin/placeholder look is genuinely correct
(matches the reference exactly) — the earlier "needs a more realistic preview" note doesn't apply
once judged against the true render. Textarea needed `--max-stories 10` (default cap is 6) to grade
its Fixed/Manual Sizing stories — all matched, including the resize-handle grip render.

## [GENERAL] Dead `.cache/compare/` entries for components that dropped out of capture

When a component stops being capturable, `compare.mjs` simply never visits it
again — and **nothing deletes its old `.design-sync/.cache/compare/<Name>.json`
or `<Name>.grade.json`**. The stale pair then sits in the cache describing
stories that no longer exist, which actively misleads a grading fan-out: on the
5.3 re-sync one wave "verified" `Listbox` against a stale grade file and another
reported it `blocked` for having no screenshots, when the truth was that
Listbox needs no grade at all.

Two ways a component drops out:

- **All its stories are skipped** via `cfg.overrides.<Name>.skip` → it lands in
  `ds-bundle/.stories-map.json` with `stories: []`. `resync.mjs`'s
  `isCapturable` then removes it from the worklist ("nothing to capture —
  re-ships via the upload partition, no grading needed") and it is correctly
  absent from `verification.pendingGrade`. It still ships, as a **floor card**:
  a `components/<group>/<Name>/<Name>.html` with no `_preview/<Name>.js` and no
  `<script src="_preview/">`. This is `Listbox`'s permanent state (all 12
  `utils-listbox--*` ids are skipped to resolve the title collision).
- **Only subcomponent-depth titles remain** → it leaves the stories-map
  entirely. This is `AnchorCard`/`ButtonCard` (see the DS-286 note below).

Rules that follow:

- **`pendingGrade` is the authority on what needs grading, not the cache
  directory.** A `<Name>.json` present in the cache does not mean the component
  is in this run's scope.
- **A `<Name>.grade.json` older than its `<Name>.json` is not evidence.** It was
  written against screenshots that no longer exist; re-judge from the current
  images or delete it. (`.grade.json` mtime < `.json` mtime is the cheap test —
  it is how the stale `Listbox` grade was caught.)
- Cross-check the cache against the stories-map when a fan-out starts, and
  delete entries whose component is missing from it or has `stories: []`. The
  three dead entries (`AnchorCard`, `ButtonCard`, `Listbox`) were removed on
  2026-08-18; they will reappear only if those components become capturable
  again.

## 5.3 + monorepo full-roster re-grade (2026-08-18) — outcome

Every one of the 84 synced components was re-graded in twelve parallel batches
(waves A-L) after 5.3's story churn cleared the whole roster's grades. Result:
**all `match`, except AppSwitcher's `All Accessible` / `None Accessible`, which
stay at the documented `close`** (story-level `decorators` limitation, see
below). Three components are new to the roster this release — `AvatarGroup`,
`FileUploader`, `FileInput` — and all three were graded exhaustively; nothing
was removed.

No new shared-infra bug surfaced. Every previously-recorded fix was re-confirmed
holding against fresh screenshots: the argTypes per-key `mapping` merge, the
Linaria ancestor-selector CSS, `globals.backgrounds` full-bleed paint, the
decorator merge order, Tooltip's nested inline-flex `layout: 'centered'`
wrapper, Drawer's `viewport` override, and TopBar's force-bundled
`top-bar/menu-drawer/`. The `.el-form-layout` css-fallback fork fired as
expected on the rebuilt `dist/js/style.css`.

Two process notes worth keeping for the next full-roster wave:

- Run the fan-out in **grade-only** mode (agents read sheets and write
  `<Name>.grade.json`, and are explicitly forbidden from running `compare.mjs`,
  `preview-rebuild.mjs`, `package-build.mjs` or `package-validate.mjs`). Four
  concurrent agents plus the driver otherwise contend for `ds-bundle/` and for
  chromium, and a scoped rebuild by one agent invalidates another's sheets
  mid-judgement. Fixes stay with the orchestrator.
- Subagents do **not** have the `DesignSync` tool, and `SendMessage` does not
  exist in every build — so anything needing the tool, or a batch needing to be
  sent back for re-grading, has to be done by the orchestrator itself. Budget
  for that rather than delegating and discovering it late.

## Capture flakes seen once, not reproduced (informational, don't re-chase on sight)

- **FolderTabs**: one capture showed broken tab-connector "waves" (gap instead of smooth curve);
  live chrome-devtools inspection showed correct geometry, and a plain recapture came back clean.
  Same class as the ChipSelect/ChipSelectControl `sb-error` flake below, but on the DS side.

## Re-sync risks

- `packages/elements/.design-sync/entry.mjs` is a generated file (not
  hand-maintained) — regenerate it if new files are added under
  `dist/js/{core,icons,utils}/` by re-running the same `readdirSync` +
  `export *` script (see git history of this file, or ask a future sync to
  regenerate it fresh). It must stay inside the package — see the monorepo
  section above for why.
- **5.3 + monorepo re-sync (2026-08-18)**: 5.3 changed every story file's
  contents (310 files between the last sync and HEAD), so the driver cleared
  the entire roster's grades and the run required a full re-grade wave. This
  is expected for a release-spanning sync and is NOT a symptom of the
  monorepo move (which changed no story bytes at all).
- 5.3 added components not present in the previous 82-component roster
  (AvatarGroup among them). `AvatarGroup` flagged `[GRID_OVERFLOW]` on its
  `ResponsiveOverflow`/`Sizes` stories and now carries
  `cfg.overrides.AvatarGroup.cardMode: "column"`.
- Seven storybook titles are deliberately dropped and now carry explicit
  `cfg.titleMap: null` entries so `[TITLE_UNMAPPED]` stays quiet:
  `AllocateFunds`, `ContactsList`, `CreateManagementAgreement`,
  `PropertyDetail` (all `src/blocks/` full-page composition examples, which
  export nothing by design), `Gallery` (`src/icons/docs/icon-gallery.stories.tsx`,
  a docs index of all icons), `Icon` (`src/icons/docs/icon.stories.tsx` — a
  usage demo whose manifest name is actually `StarIcon`; mapping it would
  card one arbitrary icon out of 205), and `useCSSCustomHighlights` (a hook
  demo, not a visual component).
- The Linaria runtime stub silently drops function-valued CSS template
  interpolations — if a component's real styling depends on dynamic
  (prop-based) Linaria values, its rendered preview will look visually
  simpler than production.
- `sb-reference/index.json` was hand-regenerated this sync (ground-truth
  title extraction from compiled `*.stories-*.js` assets) due to Storybook 10
  removing `index.json`. On a re-sync, rebuild `sb-reference` with the full
  storybook build first. Since the library moved into the `packages/elements`
  workspace (DS-335), run it from the repo root via
  `yarn workspace @reapit/elements exec storybook build -o ../../.design-sync/sb-reference`
  so the output still lands at `.design-sync/sb-reference`; the regenerated
  `index.json` is part of the build output and does not need
  manual authoring — the `source-storybook.mjs` fork generates it from
  `manifests/components.json`.
- **Resolved (2026-07-16 re-grade wave)**: the "Accepted close/mismatch"
  entries below for FolderTabs, LabelText, TextareaControl, PrimaryTabs, and
  SelectNativeControl all silently resolved as a side effect of this
  session's fixes (most likely the `.el-form-layout` css-fallback fork or the
  `sb-reference` rebuild) — re-verified pixel-identical on both sides (same
  `#607890` `colour-text-secondary` label colour on both panels; identical
  tab-pill heights/spacing). All five re-graded `match`. Re-check on the next
  sync in case this regresses.
- GalleryViewer's `Carousel/Sizing` story grades `mismatch` — its own
  `decorators` array (a 400px/magenta-border wrapper) isn't honored by the
  preview compiler, so it renders full-width instead of constrained. NOT a
  story-pairing collision (an earlier note misdiagnosed this — there's only
  one `Sizing` export in the whole component; see the 2026-07-16 correction
  above). Not fixable via an owned preview. All other GalleryViewer stories
  match. **Superseded as of 5.3 (2026-08-18)**: `Carousel/Sizing` is no longer
  in GalleryViewer's captured story set — the component now captures only
  `Example`, so this mismatch is dormant rather than fixed. If a future release
  reintroduces a `Sizing` story, expect the decorator limitation to return.
- AppSwitcher's `All Accessible` / `None Accessible` stories grade `close` for
  the same root cause as GalleryViewer's `Sizing` above: a story-level
  `decorators` array (magenta debug-border wrapper) isn't honoured by the
  preview compiler, so the preview renders with a plain border instead.
  Content is otherwise identical. Not fixable via an owned preview (the
  decorator lives in the story file). Found during the 2026-07-21 DS-286
  re-grade wave.
- **2026-07-21 DS-286 re-grade wave**: removing `maxTitleDepth` (an obsolete,
  unrecognized config key superseded by `titleParts()`'s exportedSet-based
  scan) and the DS-286 `source-storybook.mjs` fix changed grouping/path
  metadata for nearly all 82 components, clearing every grade. Re-verified
  the full roster in parallel batches — all re-graded `match` (bundle/CSS/
  providers were untouched, only story→component pairing metadata moved).
  AnchorCard and ButtonCard now correctly drop out of the sync entirely: their
  only stories are subcomponent-depth titles (`.../AtAGlance/AnchorCard`
  etc.), which are documentation-only, not synced, per DS-286's intent.
  ChipSelect/ChipSelectControl reproduced the known `sb-error` flake below on
  the same 2 components — re-verified manually as before, still `match`.
- The `.el-form-layout` CSS cascade fix lives in `.design-sync/overrides/
css-fallback.mjs`. If `dist/js/style.css` changes (new build), the upstream
  bug (deprecated grid overrides new flex) would still be present — the fork
  still fires and appends the override, so the fix is self-healing on every
  sync. If the upstream bug is fixed (deprecated form-layout renamed or
  removed), the fork's appended rule becomes harmless redundancy; remove it
  then.
- `@types/react` version pin and chromium build pin are toolchain-state
  assumptions made this run — re-verify if the toolchain changes.
- **Orphaned `_preview/*.js` on the remote when a component becomes a floor
  card.** `Listbox` had a compiled preview in earlier syncs; now that all its
  stories are skipped it ships as a floor card with no local
  `_preview/Listbox.js` — but `.sync-diff.json`'s `deletePaths` came back
  empty, so the remote kept the old module. It is harmless (the card HTML
  references no `_preview/` script, so nothing loads it) but it is dead weight
  and the diff will not clean it up on its own. Delete
  `_preview/Listbox.js` from the project by hand, or include `_preview/**` in a
  plan's `deletes` on a future sync. Check for this whenever a component moves
  from having stories to having none.
- The project also holds files this sync neither writes nor owns —
  `uploads/**` (design screenshots), `Canvas.dc.html`, `support.js`,
  `_ds_manifest.json`, `_adherence.oxlintrc.json`. The first two are
  user-authored, the rest app-managed. **Never include them in a plan's
  `deletes`**, and prefer finalizing the upload plan with `deletes: []`
  entirely when the diff reports no deletions — a bare
  `deletes: ["components/**", ...]` glob would put user content one bug away
  from removal for no benefit.

## [GENERAL] SB10 manifest sort had own-package components sorting LAST, not first (fixed, no re-grade needed)

`source-storybook.mjs`'s SB10 branch sorted `allComponents` with
`isOwnPath(a.path) - isOwnPath(b.path)` — own=true is `1`, non-own=false is
`0`, so an own entry (`1`) sorts AFTER a non-own entry (`0`) under a numeric
comparator, the opposite of the adjacent comment's stated intent ("Sort
own-package components first") and the opposite of the SB9 branch's
comparator two cases above it (`isOwnPath(b.importPath) - isOwnPath(a.importPath)`,
correct). Wrong order matters because `byComp`'s dedup keeps whichever entry
for a name is seen FIRST (`if (!byComp.has(compName)) byComp.set(...)`) and
the `own`/`c.own && !own` guard only checks against that first-seen entry's
`own` flag — a non-own entry processed first would win a name collision that
should go to the in-package component. **Fixed**: swapped to
`isOwnPath(b.path) - isOwnPath(a.path)`, matching SB9. Verified this build's
`manifests/components.json` has zero non-own entries (all 269 paths resolve
under `./src`), so the bug was latent for every grade recorded so far — no
re-grade needed now, but the fix matters for any future sync where a
non-own-path entry (e.g. an addon example story, a vendored/symlinked
dependency) shares a name with an in-package component.

## [GENERAL] `reconstructTitle()` only handled squished component IDs, not hyphenated ones (fixed, re-grades 6 components)

`source-storybook.mjs`'s `reconstructTitle()` built `nameSlug` by stripping
spaces from the component's PascalCase `name` (e.g. `AvatarRectangle` ->
`avatarrectangle`) and matching it against the tail of `componentId`. Most
multi-word names squish together in the id with no internal hyphen
(`AppAvatar` -> `...-appavatar`), but a real minority hyphenate at word
boundaries depending on how the original CSF title was authored
(`AvatarRectangle` -> `...-avatar-rectangle`, `ComboboxButton` ->
`...-combobox-button`). The old code only tried the squished form, so for
those 6 real components the id-tail never matched, `prefix` was never
stripped, and `reconstructTitle` returned a garbled group made of the WHOLE
id (e.g. `Content display avatar rectangle/AvatarRectangle` instead of
`Content display/AvatarRectangle`). **Fixed**: try the squished form first
(covers 135/176 multi-word components, unchanged), fall back to a
case-boundary-hyphenated form if that doesn't match. Verified against the
real 269-component manifest: exactly 6 titles change
(`AvatarRectangle`, `ComboboxButton`, `ComboboxCard`, `ComboboxListbox`,
`ComboboxOptgroup`, `ComboboxOption`), no regressions elsewhere. Per the
rebuild-rules table (fork edits are part of the grade contract), only these
6 components' grades clear on the next rebuild — the rest carry forward.

The 5 `Combobox*` names live under `src/utils/combobox/` — out of the
first-sync scope (`src/utils` is only pulled in as a transitive runtime
dependency, not independently browsable; see Scope above) but weren't
covered by the existing `titleMap.Combobox: null` (which matches the exact
name `Combobox`, not its subcomponents). Once `reconstructTitle` groups them
correctly they'd surface as newly-browsable top-level components for the
first time. Added `ComboboxButton`/`ComboboxCard`/`ComboboxListbox`/
`ComboboxOptgroup`/`ComboboxOption` to `titleMap` as `null` alongside
`Combobox` to keep them excluded.

`AvatarRectangle`'s corrected group (`Content display`) doesn't collide with
any existing top-level export name — checked per the title-collision class
documented above, no action needed. **If a future re-sync surfaces a
different id that fails BOTH the squished and hyphenated match, that's a
third id-hyphenation convention — check the underlying CSF title text before
assuming it's the same bug.**

**Correction (2026-07-17 re-sync)**: the claim above ("only these 6 components' grades clear") was wrong in
practice — `scriptsSha` (folded into every component's `sourceKey`) changed when this fix (plus the SB10-manifest-sort
fix above and other `.design-sync/overrides/` edits) landed as _committed but never re-uploaded_ fork edits, so the
next driver run cleared ALL 84 components' grades, not just the 6. The rebuild-rules table's claim that fork edits
only clear "affected" grades is only true when `scriptsSha` isn't part of the invalidated component's key — in this
repo it always is, so **any committed `.design-sync/overrides/*.mjs` change forces a full re-grade of the entire
roster on the next sync that runs the driver**, regardless of how narrow the fix's real impact is. Not a bug to
fix — just budget the fan-out time for it. This session's full re-grade (82 of 84 image-graded, 2 handled via the
existing ChipSelect/ChipSelectControl manual-verify recipe) found the roster still clean except for one real,
previously-latent bug — see the `AppSwitcherProductMenuItem` entry below.

## [GENERAL] `AppSwitcherProductMenuItem` not on the bundle global — dual-context-instance bug, fixed

Same root-cause class as the documented Accordion.Summary/PageLayout Mobile dual-context-instance bugs, newly
surfaced on `AppSwitcher`'s "All Accessible" story during the 2026-07-17 re-sync's full re-grade wave (triggered
by an unrelated scriptsSha bump, not a code change — this bug was latent all along, just never exercised by a
prior grading pass). `AppSwitcherProductMenuItem` is a real package export (`@reapit/elements/core/app-switcher/anz`,
compiled to `dist/js/core/app-switcher/anz.js`), but `entry.mjs` only re-exports the flat `dist/js/core/*.js` files,
not this nested subpath file — so it was never on `window.ReapitElements`, and stories importing it via the relative
`./anz/product-menu-item` path got it bundled from SOURCE instead. Its `useAppSwitcherMenuGroupHasAccessContext()`
consumer then read a freshly-source-compiled context instance, different from the one `AppSwitcher.YourAppsMenuGroup`/
`ExploreMenuGroup` (redirected wholesale to the bundle) actually provide — so every product rendered in its
disabled/grey state regardless of the story's `accessibleProductIds` prop. "None Accessible" coincidentally matched
(all disabled either way); "All Accessible" showed every icon grey instead of coloured.
**Fixed** via `cfg.extraEntries: ["./dist/js/core/app-switcher/anz.js"]` — this puts `AppSwitcherProductMenuItem`
(and its context module) in the SAME esbuild dependency graph as `app-switcher.js`, so both share one context
module instance. Causes one non-blocking `[EXPORT_COLLISION]` warning (`anz.js`'s own `AppSwitcher` re-export
collides with the main one; main package wins per the standard collision-resolution rule, harmless here since
nothing imports `AppSwitcher` from the anz path). Verified: "All Accessible" now renders every product icon
coloured/active, pixel-matching the reference.
**If a re-sync surfaces a similar dual-context-instance bug on a component whose subcomponent lives under a
nested subpath directory not covered by `entry.mjs`'s flat re-export list, check whether `cfg.extraEntries` for
that subpath file resolves it the same way** — cheaper than a `story-imports.mjs` fork edit.
