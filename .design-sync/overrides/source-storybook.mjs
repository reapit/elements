// Fork of lib/source-storybook.mjs — adds support for Storybook 10's new
// manifests/components.json format (replaces index.json). Storybook 10 moved
// from a flat entries map (index.json v4) to a component-grouped manifest
// (manifests/components.json v0). The component ID encodes the old title in
// lowercase kebab form (e.g. "containers-and-layout-dialog" for
// "Containers and layout/Dialog"), and stories are nested under their component
// rather than being flat entries. This fork reconstructs the old title string
// from (id, name) so the existing titleParts() machinery works unchanged.

import { createHash } from 'node:crypto'
import { existsSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { IIFE_IMPORT_META_DEFINE, titleParts } from '../../.ds-sync/lib/common.mjs'
import { findStorybookDirs } from '../../.ds-sync/lib/detect.mjs'
import { storybookStubPlugin } from '../../.ds-sync/lib/story-imports.mjs'

function pickStorybookDir({ INPUTS, PKG, SB_CONFIG_DIR }) {
  if (SB_CONFIG_DIR) return SB_CONFIG_DIR
  try {
    const scripts = JSON.parse(readFileSync(join(INPUTS, 'package.json'), 'utf8')).scripts ?? {}
    for (const s of Object.values(scripts)) {
      const m = typeof s === 'string' && s.match(/\bstorybook\s+(?:dev|build)\b[^;&|]*?(?:-c|--config-dir)[= ]+(\S+)/)
      if (m) return resolve(INPUTS, m[1])
    }
  } catch {}
  const found = findStorybookDirs(INPUTS)
  if (found.length > 1) {
    const pkgTail = PKG.split('/').pop()
    const ranked = found
      .map((d) => {
        const sib = join(dirname(d), 'package.json')
        let name = ''
        try {
          name = JSON.parse(readFileSync(sib, 'utf8')).name ?? ''
        } catch {}
        return { d, score: name === PKG ? 2 : d.includes(pkgTail) ? 1 : 0, depth: d.split(sep).length }
      })
      .sort((a, b) => b.score - a.score || a.depth - b.depth)
    console.error(
      `[MULTI_STORYBOOK] ${found.length} .storybook/ dirs under --inputs; picked ${ranked[0].d}. ` +
        `Override with --storybook-config <dir> if wrong. Found: ${found.join(', ')}`,
    )
    return ranked[0].d
  }
  return found[0] ?? (existsSync(join(INPUTS, '.storybook')) ? join(INPUTS, '.storybook') : undefined)
}

const squash = (s) =>
  String(s ?? '')
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase()

async function storyModuleExports(absPath) {
  const { build } = await import('esbuild')
  try {
    const r = await build({
      entryPoints: [absPath],
      bundle: false,
      write: false,
      metafile: true,
      format: 'esm',
      platform: 'neutral',
      logLevel: 'silent',
      jsx: 'preserve',
      loader: { '.js': 'jsx' },
    })
    const out = Object.values(r.metafile.outputs)[0]
    return (out?.exports ?? []).filter((e) => e !== 'default')
  } catch (e) {
    console.error(
      `  ! story parse failed: ${relative(process.cwd(), absPath)}: ${String(e?.errors?.[0]?.text ?? e?.message ?? e).split('\n')[0]}`,
    )
    return []
  }
}

async function resolveStorySources(csfComponents, sbDir, sbStatic) {
  const bases = [
    ...new Set([...(sbDir ? [dirname(sbDir)] : []), process.cwd(), ...(sbStatic ? [dirname(sbStatic)] : [])]),
  ]
  let paired = 0,
    total = 0
  for (const c of csfComponents) {
    const srcByIp = new Map()
    for (const ip of c.importPaths ?? []) {
      const abs = bases.map((b) => resolve(b, ip)).find(existsSync)
      if (abs) srcByIp.set(ip, abs)
    }
    const srcs = [...new Set(srcByIp.values())]
    if (!srcs.length) continue
    c.storySrc = srcs[0]
    const h = createHash('sha256')
    for (const f of srcs) h.update(readFileSync(f))
    c.srcSha = h.digest('hex').slice(0, 12)
    const keysByFile = new Map()
    for (const f of srcs) {
      keysByFile.set(f, new Map((await storyModuleExports(f)).map((k) => [squash(k), k])))
    }
    for (const s of c.storyIds ?? []) {
      total++
      const f = srcByIp.get(s.importPath) ?? srcs[0]
      const k =
        keysByFile.get(f)?.get(squash(s.name)) ??
        keysByFile.get(f)?.get(
          squash(
            String(s.id ?? '')
              .split('--')
              .pop() ?? '',
          ),
        )
      if (k) {
        s.exportKey = k
        s.storySrc = f
        paired++
      }
    }
  }
  console.error(`  story sources: ${paired}/${total} stories paired to module exports`)
}

// Reconstruct the old-format "Group/ComponentName" title string from Storybook
// 10's component id + name. Storybook 10 generates component IDs by lowercasing
// the old CSF title and joining all path segments with "-" (e.g. "Containers
// and layout/Dialog" → "containers-and-layout-dialog"). We strip the name slug
// from the ID tail to recover the group prefix, then re-capitalise the first
// word so titleParts() produces the correct kebab group.
function reconstructTitle(componentId, name) {
  // Most multi-word names squish together in the id (AppAvatar -> appavatar),
  // but some hyphenate at word boundaries (AvatarRectangle -> avatar-rectangle,
  // ComboboxButton -> combobox-button) depending on how the CSF title was
  // authored. Try the squished form first since it covers the majority, then
  // fall back to the hyphenated form.
  const squished = name.replace(/\s+/g, '').toLowerCase()
  const hyphenated = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  let prefix = componentId
  if (prefix.endsWith('-' + squished)) {
    prefix = prefix.slice(0, -(1 + squished.length))
  } else if (prefix === squished) {
    prefix = ''
  } else if (prefix.endsWith('-' + hyphenated)) {
    prefix = prefix.slice(0, -(1 + hyphenated.length))
  } else if (prefix === hyphenated) {
    prefix = ''
  }
  if (!prefix) return name
  // Convert "containers-and-layout" → "Containers and layout"
  const groupTitle = prefix
    .split('-')
    .map((p, i) => (i === 0 ? p.charAt(0).toUpperCase() + p.slice(1) : p))
    .join(' ')
  return `${groupTitle}/${name}`
}

export async function resolveStorybook(ctx) {
  const { INPUTS, SB_CONFIG_DIR, SB_STATIC, PKG, PKG_DIR, OUT, entry, titleMap, exportedSet } = ctx
  const sbDir = pickStorybookDir({ INPUTS, PKG, SB_CONFIG_DIR })
  let sbStatic = SB_STATIC ? resolve(SB_STATIC) : null

  // Validate the storybook-static dir: accept either old index.json (SB <10)
  // or new manifests/components.json (SB 10+), both require iframe.html.
  if (sbStatic) {
    const hasOldIndex = existsSync(join(sbStatic, 'index.json'))
    const hasNewManifest = existsSync(join(sbStatic, 'manifests', 'components.json'))
    const hasIframe = existsSync(join(sbStatic, 'iframe.html'))
    if (!hasIframe) {
      console.error(`--storybook-static ${sbStatic} has no iframe.html`)
      sbStatic = null
    } else if (!hasOldIndex && !hasNewManifest) {
      console.error(`--storybook-static ${sbStatic} has neither index.json nor manifests/components.json`)
      sbStatic = null
    }
  }

  if (!sbStatic && sbDir) {
    sbStatic = resolve(OUT, '.sb-static')
    console.error(`  running: yarn storybook build -c ${sbDir} -o ${sbStatic}`)
    const { spawnSync } = await import('node:child_process')
    // Use yarn to invoke storybook (Yarn Berry PnP — no node_modules/.bin/)
    const r = spawnSync('yarn', ['storybook', 'build', '-c', sbDir, '-o', sbStatic, '--quiet'], {
      cwd: dirname(sbDir),
      stdio: ['ignore', 'pipe', 'pipe'],
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      timeout: 600_000,
      shell: process.platform === 'win32',
    })
    const hasIframe = existsSync(join(sbStatic, 'iframe.html'))
    const hasOldIndex = existsSync(join(sbStatic, 'index.json'))
    const hasNewManifest = existsSync(join(sbStatic, 'manifests', 'components.json'))
    if (r.error || r.signal || r.status !== 0 || !hasIframe || (!hasOldIndex && !hasNewManifest)) {
      console.error(
        `[SB_BUILD_FAIL] storybook build exited ${r.status ?? r.signal ?? r.error?.code}:\n${(r.stderr || r.stdout || '').slice(-2000)}`,
      )
      sbStatic = null
    }
  }

  const csfComponents = []
  if (sbStatic) {
    const sbRoot = sbDir ? resolve(dirname(sbDir)) : null
    const realOf = (p) => {
      try {
        return realpathSync(p)
      } catch {
        return p
      }
    }
    const pkgReal = realOf(resolve(PKG_DIR))
    const ownCache = new Map()
    const isOwnPath = (importPath) => {
      if (!sbRoot || !importPath) return false
      if (!ownCache.has(importPath)) {
        const rel = relative(pkgReal, realOf(resolve(sbRoot, importPath)))
        ownCache.set(importPath, rel !== '' && !rel.startsWith('..') && !isAbsolute(rel))
      }
      return ownCache.get(importPath)
    }

    const oldIndexPath = join(sbStatic, 'index.json')
    const newManifestPath = join(sbStatic, 'manifests', 'components.json')

    if (existsSync(oldIndexPath)) {
      // Old format (Storybook < 10): flat entries map
      const idx = JSON.parse(readFileSync(oldIndexPath, 'utf8'))
      const idxEntries = Object.values(idx.entries ?? {}).sort(
        (a, b) => isOwnPath(b.importPath) - isOwnPath(a.importPath),
      )
      const byComp = new Map()
      for (const e of idxEntries) {
        if (e.type === 'docs') continue
        if ((e.tags ?? []).includes('!dev') || (e.tags ?? []).includes('deprecated')) continue
        if (/deprecated/i.test(e.importPath ?? '')) continue
        // This repo's titles are always `Category/Component` for a synced
        // parent, `Category/Parent/Child[/...]` for its subcomponents (e.g.
        // `Content display/AtAGlance/AnchorCard`). titleParts()'s
        // exportedSet backward-scan can't tell those apart from a genuine
        // unrelated top-level export sharing the leaf name (AtAGlance's
        // AnchorCard/ButtonCard subcomponents collided with the real,
        // separately-documented Card family AnchorCard/ButtonCard; same for
        // FocusedLayout.BottomBar/TopBar vs the standalone BottomBar/TopBar,
        // Breadcrumbs.Link vs Link, OfficeSwitcher.Select vs Select,
        // PageHeader.SupplementaryInfo vs SupplementaryInfo — the collision
        // silently dropped one of each pair from the synced set). Only the
        // parent gets a card; deeper title levels are documentation-only.
        if (e.title.split('/').length > 2) continue
        const { name: compName, group } = titleParts(e.title, titleMap, exportedSet)
        if (compName === null) continue
        if (!byComp.has(compName))
          byComp.set(compName, {
            name: compName,
            group,
            own: isOwnPath(e.importPath),
            storyIds: [],
            importPaths: new Set(),
          })
        const comp = byComp.get(compName)
        if (comp.own && !isOwnPath(e.importPath)) continue
        comp.storyIds.push({ id: e.id, name: e.name, importPath: e.importPath })
        if (e.importPath) comp.importPaths.add(e.importPath)
      }
      for (const c of byComp.values()) csfComponents.push(c)
      console.error(
        `  storybook-static (SB9 index.json): ${Object.keys(idx.entries ?? {}).length} entries → ${csfComponents.length} components`,
      )
    } else {
      // New format (Storybook 10+): manifests/components.json
      const manifest = JSON.parse(readFileSync(newManifestPath, 'utf8'))
      const allComponents = Object.values(manifest.components ?? {})
      // Sort own-package components first, same as old format does for entries
      allComponents.sort((a, b) => isOwnPath(b.path) - isOwnPath(a.path))
      const byComp = new Map()
      for (const comp of allComponents) {
        const importPath = comp.path // same as old importPath field
        if (/deprecated/i.test(importPath ?? '')) continue
        // Reconstruct the old-style "Group/Name" title for titleParts()
        const title = reconstructTitle(comp.id, comp.name)
        const { name: compName, group } = titleParts(title, titleMap, exportedSet)
        if (compName === null) continue
        const own = isOwnPath(importPath)
        if (!byComp.has(compName))
          byComp.set(compName, { name: compName, group, own, storyIds: [], importPaths: new Set() })
        const c = byComp.get(compName)
        if (c.own && !own) continue // own-package stories win the name
        // In SB10, all stories of a component share one importPath
        for (const story of comp.stories ?? []) {
          c.storyIds.push({ id: story.id, name: story.name, importPath })
        }
        if (importPath) c.importPaths.add(importPath)
      }
      for (const c of byComp.values()) csfComponents.push(c)
      console.error(
        `  storybook-static (SB10 manifests/components.json): ${allComponents.length} components → ${csfComponents.length} synced`,
      )
    }

    await resolveStorySources(csfComponents, sbDir, sbStatic)
  } else {
    console.error(
      `[SB_BUILD_FAIL] no storybook-static and no .storybook/ dir found — pass --storybook-static <dir> or run from a repo with .storybook/.`,
    )
  }
  return { shape: 'storybook', entry, components: csfComponents, sbStatic, sbDir }
}

export async function bundlePreviewDecorators({ sbDir, OUT, NODE_MODULES, PKG, PKG_DIR, GLOBAL }) {
  if (!sbDir) return false
  const sbPreview = ['tsx', 'ts', 'jsx', 'js'].map((e) => join(sbDir, `preview.${e}`)).find(existsSync)
  if (!sbPreview) {
    console.error(
      `  (preview decorators: no preview.{tsx,ts,jsx,js} in ${sbDir} — nothing to bundle; cfg.provider is the manual path)`,
    )
    return false
  }
  if (!/\bdecorators\b/.test(readFileSync(sbPreview, 'utf8'))) {
    console.error(
      `  (preview decorators: ${sbPreview} never mentions decorators — nothing to bundle; if providers live elsewhere, set cfg.provider)`,
    )
    return false
  }
  const { build } = await import('esbuild')
  const entry = join(OUT, '.preview-decorators-entry.mjs')
  writeFileSync(
    entry,
    `import * as pv from ${JSON.stringify(sbPreview)};
var ds = [].concat((pv.default && pv.default.decorators) || pv.decorators || []).filter(function(d){return typeof d==="function"});
if (!ds.length) console.warn("[ds] preview decorators: the preview module mentions decorators but exposed none at runtime (indirect export?) — previews render without the provider chain; set cfg.provider if components need one");
var GT = (pv.default && pv.default.globalTypes) || pv.globalTypes || {};
var G = {};
for (var k in GT) { if (GT[k] && GT[k].defaultValue !== undefined) G[k] = GT[k].defaultValue; }
var IG = (pv.default && pv.default.initialGlobals) || pv.initialGlobals || {};
for (var k2 in IG) { G[k2] = IG[k2]; }
var ctx = {args:{},argTypes:{},globals:G,parameters:{},viewMode:"story",loaded:{},id:"",name:"",title:"",kind:"",componentId:""};
window.__dsDecorate = !ds.length ? null : function(el){
  return window.React.createElement(function(){
    return ds.reduce(function(inner,d){
      var out = d(function(){return inner}, ctx);
      if (out === undefined) {
        if (!window.__dsDecoratorWarned) { window.__dsDecoratorWarned = 1; console.warn("[ds] a preview decorator returned undefined — skipped (addon stub?)"); }
        return inner;
      }
      return out;
    }, el);
  });
};`,
  )
  const pkgRoot = resolve(PKG_DIR)
  const dsShim = {
    name: 'ds-global',
    setup(b) {
      const escPkg = PKG.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      b.onResolve({ filter: new RegExp(`^${escPkg}$`) }, () => ({ path: 'ds', namespace: 'ds-shim' }))
      b.onResolve({ filter: /^\.\.?\// }, (a) => {
        const abs = resolve(a.resolveDir, a.path)
        if (abs === pkgRoot || abs === join(pkgRoot, 'src') || abs === join(pkgRoot, 'src', 'index')) {
          return { path: 'ds', namespace: 'ds-shim' }
        }
        return undefined
      })
      b.onLoad({ filter: /^ds$/, namespace: 'ds-shim' }, () => ({
        contents: `module.exports=window.${GLOBAL};`,
        loader: 'js',
      }))
    },
  }
  const stubEmpty = storybookStubPlugin()
  // @storybook/react-vite's definePreview must return its config object
  // as-is (bundlePreviewDecorators reads .decorators/.globalTypes off the
  // result) — the generic storybookStubPlugin() below stubs it as an inert
  // proxy instead, silently swallowing decorators and dropping globalTypes.
  const reactViteStub = {
    name: 'sb-react-vite-stub',
    setup(b) {
      b.onResolve({ filter: /^@storybook\/react-vite$/ }, (a) => ({ path: a.path, namespace: 'sb-react-vite-stub' }))
      b.onLoad({ filter: /.*/, namespace: 'sb-react-vite-stub' }, () => ({
        contents: 'module.exports = { definePreview: function (config) { return config; } };',
        loader: 'js',
      }))
    },
  }
  const reactGlobal = {
    name: 'react-global',
    setup(b) {
      b.onResolve({ filter: /^react(-dom)?($|\/)/ }, (a) => ({
        path: a.path.startsWith('react-dom') ? 'rd' : 'r',
        namespace: 'rg',
      }))
      const proxy = (g, extra) => `new Proxy(${extra},{
  get:function(o,k){return k in o?o[k]:(${g}||{})[k]},
  ownKeys:function(o){return Array.from(new Set(Object.keys(o).concat(Object.keys(${g}||{}))))},
  getOwnPropertyDescriptor:function(o,k){return{enumerable:true,configurable:true,get:function(){return k in o?o[k]:(${g}||{})[k]}}}
})`
      b.onLoad({ filter: /^r$/, namespace: 'rg' }, () => ({
        loader: 'js',
        contents: `function jsx(t,p,k){return window.React.createElement(t,k===void 0?p:Object.assign({key:k},p))}
module.exports=${proxy('window.React', '{jsx:jsx,jsxs:jsx,jsxDEV:jsx}')};`,
      }))
      b.onLoad({ filter: /^rd$/, namespace: 'rg' }, () => ({
        loader: 'js',
        contents: `module.exports=${proxy('window.ReactDOM', '{}')};`,
      }))
    },
  }
  try {
    await build({
      entryPoints: [entry],
      outfile: join(OUT, '_vendor', 'preview-decorators.js'),
      bundle: true,
      format: 'iife',
      platform: 'browser',
      target: 'es2020',
      jsx: 'automatic',
      loader: { '.js': 'jsx', '.json': 'json' },
      nodePaths: [NODE_MODULES],
      plugins: [reactGlobal, dsShim, reactViteStub, stubEmpty],
      define: {
        'process.env.NODE_ENV': '"development"',
        __DEV__: 'true',
        ...IIFE_IMPORT_META_DEFINE,
      },
      logLevel: 'silent',
    })
    console.error(`  preview-decorators.js: bundled from ${relative(pkgRoot, sbPreview)}`)
    return true
  } catch (e) {
    {
      const err = e?.errors?.[0]
      const firstLine = String(err?.text ?? e?.message ?? String(e)).split('\n')[0]
      console.error(`  ! preview decorator bundle failed: ${firstLine}`)
      console.error('    decorators will not wrap previews — set cfg.provider to supply the context they provided')
    }
    return false
  } finally {
    rmSync(entry, { force: true })
  }
}
