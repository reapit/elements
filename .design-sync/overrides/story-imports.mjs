// How story modules resolve at preview-compile time. Small on purpose and
// FORKABLE: copy to .design-sync/overrides/story-imports.mjs (declare in
// cfg.libOverrides) when a repo's layout needs different rules — this seam
// owns ALL resolution policy, so a fork never touches generation or build
// orchestration. Lighter tweaks need no fork: cfg.storyImports.shim /
// cfg.storyImports.bundle are substring patterns matched against resolved
// paths (any import style — relative, tsconfig alias, bare workspace name)
// that force a module to the bundle global / to source bundling, and
// cfg.storyImports.loaders merges over STORY_LOADERS.
//
// Rules:
// 1. Package + extraEntries imports → `window.<GLOBAL>` (the shipped bundle).
//    Subpaths whose last segment is an exported component (`<pkg>/Button`)
//    shim with that export as the default; every other subpath
//    (`<pkg>/locales/en.json`, `<pkg>/utils`) bundles normally — a wrong
//    shim is silent, a missing module is loud (and the fix is named:
//    cfg.extraEntries merges a subpath's exports onto the global).
// 2. ANY import that RESOLVES to an EXPORTED component's module →
//    `window.<GLOBAL>` too, however it was spelled (relative `../Button` —
//    the dominant story convention — tsconfig alias, or monorepo path). This
//    keeps previews rendering the SHIPPED bundle instead of a duplicate
//    source copy — which breaks React context identity (consumers throw
//    their missing-provider errors) and drops co-located styles. Story files
//    themselves and anything under node_modules are never redirected.
//    Default imports get the matched export as `default` (default-importing
//    the component is a common story convention; a bare namespace shim
//    renders "Element type is invalid" in every such cell).
// 3. Every other import (fixtures, helpers, internal contexts) bundles from
//    source; component imports INSIDE those modules recurse through rule 2.
//    The honest residue: a story needing a component-PRIVATE context that
//    must share identity with the global component renders a cell error and
//    falls to grading/hand-fix — no shim can fix that, by construction.
// 4. @storybook/* runtime → functional stubs. manager/preview/client-api get
//    real no-op hooks (useGlobals/useArgs/addons — module-scope
//    `addons.register()` or a decorator calling `useGlobals()` on an empty
//    stub takes the whole module down); everything else gets an inert
//    callable proxy so the canonical CSF idiom — `args: { onClick: fn() }`,
//    `action('click')` at module scope — evaluates instead of throwing.
// 5. Styles/assets → LOADERS below (styles ship via _ds_bundle.css/styles.css;
//    images inline as data URLs so fixtures keep working offline). Note:
//    `.module.css` matches the same `.css` extension key as regular CSS
//    (esbuild's loader lookup is by extension, not basename), so it is
//    emptied by the `'.css': 'empty'` rule below too — there is no separate
//    local-css exception. No `.module.css` files exist in this repo yet; if
//    one is added and needs real class-name resolution, add an explicit
//    `.module.css` entry to STORY_LOADERS (or cfg.storyImports.loaders).

// forked from design-sync lib/story-imports.mjs — @reapit/elements source
// files use Node "imports"-field subpath aliases (`#src/*`, `#.storybook/*`)
// that Vite/Storybook resolve leniently (directory + extension fallback),
// but esbuild's own Node-imports algorithm is strict and throws "Importing
// the directory ... is forbidden" for the bare `./src/*` pattern target.
// Fix: pre-resolve `#`-prefixed specifiers to a real absolute file (trying
// extensions/index files) before handing them to b.resolve(), so the rest of
// the policy (rule 2 shim-to-global, barrel detection, etc.) still applies.
import { existsSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

let importsMapCache
function loadImportsMap(pkgDir) {
  if (importsMapCache) return importsMapCache
  try {
    const pj = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'))
    importsMapCache = pj.imports ?? {}
  } catch {
    importsMapCache = {}
  }
  return importsMapCache
}

const targetPatternOf = (target) =>
  typeof target === 'string' ? target : (target?.import ?? target?.default ?? target?.types ?? null)

const CANDIDATE_EXTS = [
  '',
  '.tsx',
  '.ts',
  '.jsx',
  '.js',
  '.mjs',
  '.cjs',
  '/index.tsx',
  '/index.ts',
  '/index.jsx',
  '/index.js',
]

function resolveHashImport(spec, pkgDir) {
  if (!spec.startsWith('#')) return null
  const importsMap = loadImportsMap(pkgDir)
  for (const [pattern, target] of Object.entries(importsMap)) {
    let base
    if (pattern.endsWith('/*') && spec.startsWith(pattern.slice(0, -1))) {
      const rest = spec.slice(pattern.length - 1)
      const targetPattern = targetPatternOf(target)
      if (!targetPattern) continue
      base = join(pkgDir, targetPattern.replace('*', rest))
    } else if (pattern === spec) {
      const targetPattern = targetPatternOf(target)
      if (!targetPattern) continue
      base = join(pkgDir, targetPattern)
    } else continue
    for (const ext of CANDIDATE_EXTS) {
      const candidate = base + ext
      // A bare '' candidate matching a directory must not win — that
      // reintroduces esbuild's "Importing the directory ... is forbidden"
      // error; fall through to the /index.* candidates instead.
      if (ext === '' ? existsSync(candidate) && statSync(candidate).isFile() : existsSync(candidate)) return candidate
    }
  }
  return null
}

// Storybook's preview-api also re-exports React-compatible hooks for use in
// render functions — those delegate to the page's React (an inert stub there
// is a guaranteed render crash: destructuring a non-iterable).
const MANAGER_API_STUB =
  'const noopChannel={on(){},off(){},once(){},emit(){},removeListener(){}};' +
  'const addons={register(){},add(){},getChannel(){return noopChannel},setConfig(){},getConfig(){return{}}};' +
  'const R=function(){return window.React||{}};' +
  'module.exports={addons,types:{},useGlobals(){return[{},function(){}]},useArgs(){return[{},function(){},function(){}]},useParameter(){},useStorybookApi(){return{}},' +
  'useState(){return R().useState.apply(null,arguments)},useCallback(){return R().useCallback.apply(null,arguments)},useRef(){return R().useRef.apply(null,arguments)},' +
  'useMemo(){return R().useMemo.apply(null,arguments)},useEffect(){return R().useEffect.apply(null,arguments)},useReducer(){return R().useReducer.apply(null,arguments)},' +
  'useChannel(){return function(){}}};'

// Inert callable proxy: every member access yields another inert callable, so
// `fn()`, `action("x")`, `expect.anything()`, `userEvent.click(...)` all
// evaluate to harmless values at module scope. Named imports are copied by
// esbuild's CJS interop from own enumerable props, so the common API surface
// is materialized explicitly (Object.assign keeps them as own props of the
// callable default — do not change the proxy target's own-property shape);
// everything else resolves through the get trap. The DEFAULT export is a
// children-passthrough component: stories render addon defaults as JSX
// (@storybook/addon-links `<LinkTo>…</LinkTo>`), and an object default
// throws "Element type is invalid" the instant React mounts it. Both traps
// hand back the REAL `prototype` — React's shouldConstruct() probes
// `.prototype.isReactComponent`, and a truthy proxy answer classifies the
// stub as a CLASS component, silently swallowing the children.
const INERT_STUB =
  'var inert=new Proxy(function(){},{' +
  'get:function(t,k){if(k==="then")return void 0;if(k==="prototype")return t.prototype;if(k==="valueOf"||k==="toString"||k===Symbol.toPrimitive)return function(){return""};return inert},' +
  'apply:function(){return inert},construct:function(){return{}}});' +
  'var m={};"fn action actions expect userEvent within waitFor screen fireEvent spyOn mocked jest vi configureActions decorateAction setupWorker http HttpResponse graphql rest".split(" ").forEach(function(k){m[k]=inert});' +
  'var def=function(p){return p&&p.children!==void 0?p.children:null};Object.assign(def,m);' +
  'module.exports=new Proxy(def,{get:function(t,k){if(k==="then")return void 0;if(k==="prototype")return t.prototype;return k in m?m[k]:k==="__esModule"?void 0:inert}});'

// @linaria/core + @linaria/react ship a runtime guard for `css`/`styled` that
// deliberately throws ("Using the css tag in runtime is not supported") when
// the build-time extraction babel/vite plugin never ran — which is always
// true here, since preview compiles are plain esbuild. Component MODULES
// themselves get redirected to the shipped (already-Linaria-compiled)
// global via Rule 2, but sibling style helpers and compound/namespace
// subcomponents (AtAGlance.Grid, AlertBanner.Portal, …) aren't top-level
// exports and can't be redirected — they bundle from source and hit the
// guard. Fix: real minimal runtime CSS-in-JS (inject a <style> per unique
// template, hashed className) instead of the throwing guard. Dynamic
// (function) interpolations are dropped rather than evaluated — an
// acceptable degradation caught by preview grading, not a build failure.
const LINARIA_RUNTIME = `
var __sheet;
function __inject(rule) {
  if (!__sheet) { __sheet = document.createElement('style'); document.head.appendChild(__sheet); }
  __sheet.appendChild(document.createTextNode(rule));
}
var __cache = Object.create(null);
function __hash(s) {
  var h = 0;
  for (var i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i) | 0; }
  return 'ds' + Math.abs(h).toString(36);
}
function __raw(strings, values) {
  var out = '';
  for (var i = 0; i < strings.length; i++) {
    out += strings[i];
    if (i < values.length) out += (typeof values[i] === 'function' || values[i] == null) ? '' : String(values[i]);
  }
  return out;
}
// Splits a Linaria template into top-level declarations vs nested rule
// blocks (& pseudo-classes, "<ancestor> &" ancestor-selectors, @media/@supports),
// each emitted as its OWN top-level CSS rule — mirrors what Linaria's real
// build-time extraction produces. The naive prior version wrapped the ENTIRE
// raw template (nested blocks included) inside one outer ".hash { }", which
// for an ancestor pattern like "details:open & { transform: rotate(180deg); }"
// produced ".hash { details:open .hash { ... } }" — invalid/non-matching
// nested CSS (native CSS nesting implicitly prepends the parent selector to
// a nested block not starting with '&', requiring TWO ".hash" ancestors) —
// so e.g. OfficeSwitcher's chevron never rotated. Found via the grading
// fan-out (see NOTES.md); this affects every component using this selector
// shape (~19 files — grep src/ for the pattern to find them all).
function css(strings) {
  var values = Array.prototype.slice.call(arguments, 1);
  var raw = __raw(strings, values);
  if (raw in __cache) return __cache[raw];
  var hash = __hash(raw);
  var sel = '.' + hash;
  var decls = '';
  var rules = [];
  var i = 0, n = raw.length;
  while (i < n) {
    var open = raw.indexOf('{', i);
    if (open === -1) { decls += raw.slice(i); break; }
    var head = raw.slice(i, open);
    var depth = 1, j = open + 1;
    while (j < n && depth > 0) {
      if (raw[j] === '{') depth++;
      else if (raw[j] === '}') depth--;
      j++;
    }
    var body = raw.slice(open + 1, j - 1);
    var headTrim = head.trim();
    if (headTrim.charAt(0) === '@') {
      // @media/@supports: keep the at-rule, wrap its own declarations in sel.
      rules.push(headTrim + ' { ' + sel + ' { ' + body + ' } }');
    } else if (headTrim) {
      // Nested selector: '&' present (pseudo-class, ancestor pattern, etc.)
      // becomes the real selector with '&' replaced by sel; no '&' at all
      // (rare) falls back to a plain descendant combinator.
      var nestedSel = headTrim.indexOf('&') !== -1 ? headTrim.replace(/&/g, sel) : (sel + ' ' + headTrim);
      rules.push(nestedSel + ' { ' + body + ' }');
    } else {
      // Brace with no selector head shouldn't occur for well-formed input;
      // treat its body as plain declarations rather than dropping it.
      decls += body;
    }
    i = j;
  }
  if (decls.trim()) rules.unshift(sel + ' { ' + decls + ' }');
  rules.forEach(__inject);
  __cache[raw] = hash;
  return hash;
}
function cx() {
  return Array.prototype.slice.call(arguments).filter(Boolean).join(' ');
}
function makeStyled(Tag) {
  return function (strings) {
    var values = Array.prototype.slice.call(arguments, 1);
    var className = css.apply(null, [strings].concat(values));
    function StyledComponent(props) {
      props = props || {};
      var rest = Object.assign({}, props, { className: cx(className, props.className) });
      delete rest.as;
      return window.React.createElement(props.as || Tag, rest);
    }
    return StyledComponent;
  };
}
var styled = new Proxy(function (Component) { return makeStyled(Component); }, {
  get: function (_target, tag) { return makeStyled(tag); },
});
module.exports = { css: css, cx: cx, styled: styled };
`

export const STORY_FILE_RE = /\.stor(?:y|ies)\.[cm]?[jt]sx?$/

export const STORY_LOADERS = {
  // jsx is a strict syntax superset of js — JSX-in-.js story files are a
  // common convention and plain .js parses identically.
  '.js': 'jsx',
  '.css': 'empty',
  '.scss': 'empty',
  '.sass': 'empty',
  '.less': 'empty',
  '.styl': 'empty',
  '.png': 'dataurl',
  '.jpg': 'dataurl',
  '.jpeg': 'dataurl',
  '.gif': 'dataurl',
  '.webp': 'dataurl',
  '.avif': 'dataurl',
  '.svg': 'dataurl',
  '.ico': 'dataurl',
  '.woff': 'dataurl',
  '.woff2': 'dataurl',
  '.ttf': 'dataurl',
  '.eot': 'empty',
  '.md': 'text',
  '.mdx': 'empty',
  '.mp4': 'empty',
  '.webm': 'empty',
  '.mov': 'empty',
}

// Which exported component (if any) does a resolved file path look like the
// source module of? Matches `<...>/Button/Button.tsx`, `<...>/Button/index.ts`,
// and bare `<...>/Button.tsx`; returns the export name or null. A helper
// coincidentally named like an export (`utils/Text.ts`) would false-positive —
// that's what cfg.storyImports.bundle is for; over-shimming surfaces
// immediately as undefined-component cell errors, never as silent wrong
// renders.
// @reapit/elements source dirs/files are kebab-case ("button", "text-input")
// while exports are PascalCase ("Button", "TextInput") — the upstream
// heuristic assumes matching case and never fires here, so every component's
// own source (styles.ts etc., which use runtime-guarded Linaria css/styled
// tags) got bundled from source instead of shimmed to the shipped global.
// Try the exact segment first (repos that DO PascalCase their dirs), then
// its kebab-case→PascalCase conversion.
const toPascal = (s) =>
  s
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('')

function exportedComponentFor(p, exported) {
  const segs = p.replace(/\\/g, '/').split('/')
  const file = (segs[segs.length - 1] ?? '').replace(/\.[cm]?[jt]sx?$/, '')
  const dir = segs[segs.length - 2] ?? ''
  if (exported.has(file)) return file
  const fileP = toPascal(file)
  if (exported.has(fileP)) return fileP
  // src/icons/<kebab>.tsx exports <Pascal>Icon, not <Pascal> — icons don't
  // live under their own directory (file === dir never holds for them), so
  // this check runs unconditionally alongside the dir-based one below.
  if (exported.has(fileP + 'Icon')) return fileP + 'Icon'
  if (file === 'index' || file === dir || fileP === toPascal(dir)) {
    if (exported.has(dir)) return dir
    const dirP = toPascal(dir)
    if (exported.has(dirP)) return dirP
  }
  // Some exports are prefixed with an ancestor dir's name
  // (focused-layout/product-logo/product-logo.tsx → FocusedLayoutProductLogo).
  // Try concatenating up to 2 ancestor segments' Pascal forms with the
  // dir/file Pascal form, innermost-ancestor-first.
  const base = toPascal(dir) || fileP
  for (let i = 3; i <= 4; i++) {
    const ancestor = segs[segs.length - i]
    if (!ancestor) break
    const combined = toPascal(ancestor) + base
    if (exported.has(combined)) return combined
  }
  return null
}

// CSF v4 "factories" functional stub — repo's stories call
// `preview.meta({...})` / `meta.story({...})` / `story.extend({...})`
// (no `export default meta`, so the generic composeStories-equivalent's
// `S.default` fallback is empty). Each produced story object carries its
// OWN fully-merged args/argTypes/decorators/render/component so compose()'s
// `S[key]` path alone is sufficient — no default export needed.
const CSF4_FACTORY_STUB = `
function mergeArr(a, b) { return [].concat(a || []).concat(b || []); }
function mergeArgTypes(parentAt, configAt) {
  // Per-SUB-KEY merge (not per-argType-name whole-object): a story overriding
  // one field of an argType (typically {control: false}, to hide the control)
  // must not drop that key's inherited 'mapping' — a whole-object
  // Object.assign per name does exactly that, and the loss happens here,
  // before compose() ever runs (compose()'s own per-key merge can't recover
  // a mapping that's already gone from the story object it's given).
  var out = {};
  var keys = Object.assign({}, parentAt || {}, configAt || {});
  Object.keys(keys).forEach(function (k) {
    out[k] = Object.assign({}, (parentAt || {})[k], (configAt || {})[k]);
  });
  return out;
}
function makeStory(parent, config) {
  config = config || {};
  var args = Object.assign({}, parent.args || {}, config.args || {});
  var argTypes = mergeArgTypes(parent.argTypes, config.argTypes);
  var decorators = mergeArr(parent.decorators, config.decorators);
  var story = Object.assign({}, parent, config, {
    args: args, argTypes: argTypes, decorators: decorators,
    component: config.component || parent.component,
    render: config.render || parent.render,
    parameters: Object.assign({}, parent.parameters || {}, config.parameters || {}),
    input: config,
  });
  story.extend = function (extConfig) { return makeStory(story, extConfig); };
  // Real Storybook's .composed is the fully-resolved story (composeStory
  // semantics) -- our story objects are already fully merged, so it's a
  // self-reference. Stories reference OtherStory.composed.args to compose
  // one story's resolved args into another (e.g. SideBar's MenuGroup/Submenu
  // stories building demo items from SubmenuItem's stories).
  story.composed = story;
  return story;
}
function definePreview(previewConfig) {
  previewConfig = previewConfig || {};
  var api = {
    meta: function (metaConfig) {
      metaConfig = metaConfig || {};
      var meta = Object.assign({}, metaConfig, {
        args: Object.assign({}, previewConfig.args || {}, metaConfig.args || {}),
        decorators: mergeArr(previewConfig.decorators, metaConfig.decorators),
        input: metaConfig,
      });
      meta.story = function (storyConfig) { return makeStory(meta, storyConfig); };
      return meta;
    },
    // preview.type<T>() is a pure TS type-hint (generic inference helper) —
    // no runtime behavior, so it just returns the same preview object.
    type: function () { return api; },
  };
  return api;
}
module.exports = { definePreview: definePreview };
`

// The @storybook/* stub plugin alone — also used by the decorator bundler.
export function storybookStubPlugin() {
  return {
    name: 'sb-stub',
    setup(b) {
      b.onResolve({ filter: /^(@storybook\/|storybook(\/|$)|msw(\/|$)|@mswjs\/)/ }, (a) => ({
        path: a.path,
        namespace: 'sb-stub',
      }))
      b.onLoad({ filter: /.*/, namespace: 'sb-stub' }, (a) => ({
        contents: /(^|\/)(manager|preview|client)-api$/.test(a.path) ? MANAGER_API_STUB : INERT_STUB,
        loader: 'js',
      }))
    },
  }
}

// Build the esbuild plugin set for compiling preview .tsx files (generated
// story-module wrappers AND hand-authored previews — same rules for both).
// IMPORTANT for callers: any tsconfig-paths plugin must be registered AFTER
// these (buildPreviews does this) — the policy plugin resolves aliases via
// b.resolve, so a paths plugin registered first would bypass rule 2.
export function storyImportPlugins({ PKG, GLOBAL, extraEntries = [], exported, cfg, pkgDir }) {
  // Path-form entries (./, ../, absolute) are repo files bundled by path —
  // they must never enter import-SPECIFIER matching below, where a story's
  // relative import could coincidentally equal the config string and get
  // wrongly shimmed to the global. Bare package specifiers only.
  extraEntries = extraEntries.filter((e) => !/^(\.\.?\/|\/|[A-Za-z]:[\\/])/.test(e))
  const escRx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pkgRx = new RegExp(`^(?:${[PKG, ...extraEntries].map(escRx).join('|')})(?:/.*)?$`)
  const force = cfg?.storyImports ?? {}
  const matches = (p, pats) => Array.isArray(pats) && pats.some((s) => typeof s === 'string' && p.includes(s))
  // ESM facade shim, NOT CJS: in a `"type":"module"` repo esbuild applies
  // node's ESM-CJS interop to the importing file — `default` becomes the
  // whole exports object and `__esModule` is ignored — which breaks every
  // `import Button from '<pkg>/Button'` (the style most docs examples use).
  // An ESM module binds `default` explicitly under BOTH interop modes; the
  // star re-export of the raw CJS global keeps dynamic named access working
  // (hooks, constants — anything on the global beyond the component list).
  const shimFor = (name) =>
    `export * from "__ds_raw__";var g=window.${GLOBAL};export default ${
      name ? `g[${JSON.stringify(name)}]!==void 0?g[${JSON.stringify(name)}]:g` : `"default" in g?g.default:g`
    };`
  const shimResult = (name) => ({ path: name ? `ds:${name}` : 'ds', namespace: 'ds-shim' })

  const dsShim = {
    name: 'ds-global',
    setup(b) {
      const entryNames = new Set([PKG, ...extraEntries])
      b.onResolve({ filter: pkgRx }, (a) => {
        if (matches(a.path, force.bundle)) return null // explicit bundle wins
        if (!entryNames.has(a.path)) {
          // Subpath import: a named component shims default-aware; anything
          // else bundles normally — a wrong root-namespace shim is silent
          // (undefined members), a missing module is loud, and the loud
          // path's fix is named (cfg.extraEntries / node_modules symlink in
          // the package's own source repo).
          const name = (a.path.split('/').pop() ?? '').replace(/\.[cm]?[jt]sx?$/, '')
          return exported.has(name) ? shimResult(name) : null
        }
        return shimResult(null)
      })
      b.onLoad({ filter: /.*/, namespace: 'ds-shim' }, (a) => ({
        contents: shimFor(a.path.startsWith('ds:') ? a.path.slice(3) : null),
        loader: 'js',
      }))
      // Location-independent story imports emitted by the preview generator:
      // `@ds-stories/<repo-root-relative path>` resolves against cwd, so the
      // same wrapper compiles from the generated cache or from
      // .design-sync/previews/ after a promote. Extensionless — esbuild
      // appends its resolve extensions.
      b.onResolve({ filter: /^@ds-stories\// }, (a) => {
        const base = resolve(process.cwd(), a.path.slice('@ds-stories/'.length))
        for (const ext of ['', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs', '.mdx']) {
          if (existsSync(base + ext)) return { path: base + ext }
        }
        return { errors: [{ text: `@ds-stories path not found: ${a.path} (resolved against ${process.cwd()})` }] }
      })
      // The raw CJS module the ESM facade star-re-exports — dynamic names
      // (everything on the global) without a static export list.
      b.onResolve({ filter: /^__ds_raw__$/ }, () => ({ path: '__ds_raw__', namespace: 'ds-raw' }))
      b.onLoad({ filter: /.*/, namespace: 'ds-raw' }, () => ({
        contents: `module.exports=window.${GLOBAL};`,
        loader: 'js',
      }))
    },
  }

  // Rule 2: resolve every remaining import and shim the ones that land on an
  // exported component's module — regardless of how the import was spelled.
  // Returning the b.resolve result (instead of null) keeps resolution single-pass.
  // The package's own source BARREL (src/index.* under the build cwd OR under
  // the package dir — monorepos build from the repo root while the barrel
  // lives at packages/<x>/src/) shims to the root namespace: `import { X }
  // from "../src"` would otherwise bundle a second copy of the whole library
  // with its own React contexts.
  const CWD = process.cwd().replace(/\\/g, '/')
  // realpath both roots — esbuild's resolver returns symlink-resolved paths,
  // and a merely-resolve()'d root (symlinked tmpdir, symlinked package dir)
  // would never prefix-match them.
  const real = (p) => {
    try {
      return realpathSync(p).replace(/\\/g, '/')
    } catch {
      return null
    }
  }
  const barrelRoots = [
    ...new Set(
      [CWD, real(process.cwd()), pkgDir && resolve(pkgDir).replace(/\\/g, '/'), pkgDir && real(pkgDir)].filter(Boolean),
    ),
  ]
  const policyRedirect = {
    name: 'ds-import-policy',
    setup(b) {
      b.onResolve({ filter: /.*/ }, async (a) => {
        if (a.pluginData === 'ds-resolving') return null // our own re-entry
        if (a.kind === 'entry-point' || (a.namespace && a.namespace !== 'file')) return null
        const hashResolved = pkgDir ? resolveHashImport(a.path, pkgDir) : null
        const r = await b.resolve(hashResolved ?? a.path, {
          kind: a.kind,
          resolveDir: a.resolveDir,
          importer: a.importer,
          pluginData: 'ds-resolving',
        })
        if (r.errors.length > 0 || !r.path) return null
        if (r.namespace && r.namespace !== 'file') return r // claimed by another plugin
        const p = r.path.replace(/\\/g, '/')
        if (STORY_FILE_RE.test(p)) return r // never the story itself
        if (matches(p, force.bundle)) return r // explicit bundle wins
        if (matches(p, force.shim)) return shimResult(exportedComponentFor(p, exported))
        if (p.includes('/node_modules/')) return r // third-party stays put
        // relative() instead of a startsWith prefix — case-insensitive on
        // win32, where the pkgDir roots carry user-typed casing (a lowercase
        // d:\ drive from --node-modules) while p carries cwd casing, and JS
        // realpathSync never canonicalizes case. Outside-root ('../') and
        // cross-drive (absolute) remainders can never match the anchor.
        // Known limit: darwin's default case-insensitive APFS still compares
        // case-sensitively here (path.posix.relative) — a blanket lowercase
        // compare would be wrong on case-SENSITIVE volumes, so mis-cased
        // --node-modules on mac remains the user's to fix.
        if (barrelRoots.some((root) => /^src\/index\.[cm]?[jt]sx?$/.test(relative(root, p).replace(/\\/g, '/')))) {
          return shimResult(null) // package source barrel
        }
        const name = exportedComponentFor(p, exported)
        return name ? shimResult(name) : r
      })
    },
  }

  // Bare `import console from "console"` (and node:console) appears in real
  // story files; node builtins can't bundle for the browser, but this one has
  // an exact page-global equivalent.
  const consoleStub = {
    name: 'node-console-stub',
    setup(b) {
      b.onResolve({ filter: /^(node:)?console$/ }, () => ({ path: 'console', namespace: 'node-console' }))
      b.onLoad({ filter: /.*/, namespace: 'node-console' }, () => ({
        contents: 'module.exports=console;',
        loader: 'js',
      }))
    },
  }

  // Registered before the generic sb-stub so it wins the resolve race for
  // this exact specifier (esbuild tries onResolve callbacks in registration
  // order across all plugins, stopping at the first non-null result).
  const csf4Stub = {
    name: 'sb-csf4-factories-stub',
    setup(b) {
      b.onResolve({ filter: /^@storybook\/react-vite$/ }, (a) => ({ path: a.path, namespace: 'sb-csf4-stub' }))
      b.onLoad({ filter: /.*/, namespace: 'sb-csf4-stub' }, () => ({ contents: CSF4_FACTORY_STUB, loader: 'js' }))
    },
  }

  const linariaStub = {
    name: 'linaria-runtime-stub',
    setup(b) {
      b.onResolve({ filter: /^@linaria\/(core|react)$/ }, (a) => ({ path: a.path, namespace: 'linaria-stub' }))
      b.onLoad({ filter: /.*/, namespace: 'linaria-stub' }, () => ({ contents: LINARIA_RUNTIME, loader: 'js' }))
    },
  }

  // 214+ files import icons as `./foo.svg?react` (vite-plugin-svgr's convention
  // — a real React component), not a URL. The default STORY_LOADERS '.svg':
  // 'dataurl' treats every .svg as a plain string, so components rendering
  // one as `<Icon/>` crash with "createElement(dataUrlString) is not a valid
  // name". esbuild passes the `?react` query through as `args.suffix`; parse
  // the raw SVG and emit a real functional component instead, falling
  // through to the default dataurl loader for plain (no-suffix) imports.
  const svgrPlugin = {
    name: 'svgr-react-svg',
    setup(b) {
      b.onLoad({ filter: /\.svg$/ }, (a) => {
        if (a.suffix !== '?react') return null
        let raw
        try {
          raw = readFileSync(a.path, 'utf8')
        } catch {
          return null
        }
        const m = /<svg([^>]*)>([\s\S]*)<\/svg>/.exec(raw)
        if (!m) return null
        const attrs = {}
        const attrRe = /([\w:-]+)="([^"]*)"/g
        let am
        while ((am = attrRe.exec(m[1]))) attrs[am[1]] = am[2]
        const inner = m[2].replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
        return {
          loader: 'js',
          contents:
            `var __attrs = ${JSON.stringify(attrs)};\n` +
            `function SvgIcon(props) {\n` +
            `  return window.React.createElement('svg', Object.assign({}, __attrs, props, { dangerouslySetInnerHTML: { __html: \`${inner}\` } }));\n` +
            `}\n` +
            `module.exports = { __esModule: true, default: SvgIcon, ReactComponent: SvgIcon };\n`,
        }
      })
    },
  }

  return {
    plugins: [dsShim, csf4Stub, linariaStub, svgrPlugin, storybookStubPlugin(), consoleStub, policyRedirect],
    loaders: { ...STORY_LOADERS, ...(force.loaders ?? {}) },
  }
}
