# Plugin API survey scripts

Five read-only scripts covering the counted evidence a handoff review needs, in the
order [`SKILL.md`](SKILL.md) uses them. Each returns a tally rather than a node
tree, so a page of thousands of nodes answers in a few hundred characters.

One rule to know before running any of them: page context resets to the file's
first page on every call, so each script selects its own page; that line is not
dead code to remove.

Adapt them; they are a starting point, not a fixed harness. Every script writes
nothing, and adaptations must keep it that way.

## Prelude

Every script below starts with this. Set the two constants from your step 1 scope.

```js
const PAGE = "Details page"; // page name from the scope list
const SCOPE = []; // frame node IDs; [] means every top-level frame on the page

const page = figma.root.children.find((p) => p.name === PAGE);
if (!page) throw new Error("No page named " + PAGE);
await figma.setCurrentPageAsync(page);

const roots = SCOPE.length
  ? (await Promise.all(SCOPE.map((id) => figma.getNodeByIdAsync(id)))).filter(Boolean)
  : page.children;

// Every node in scope, roots included. findAll() with no callback returns all descendants.
const all = roots.flatMap((r) => (r.findAll ? [r, ...r.findAll()] : [r]));

// True where a node lives inside a library instance, so it is the component's own
// business rather than something the designer authored.
const inInstance = (n) => {
  for (let p = n.parent; p; p = p.parent) if (p.type === "INSTANCE") return true;
  return false;
};

const cap = (list, n = 40) => ({ total: list.length, shown: list.slice(0, n) });
```

If a script's return still overflows, lower the `cap` limits or put a single frame
ID in `SCOPE` and run it once per frame.

## 0. The file's page list

Step 1 needs every page in the file, not every page the editor has loaded. Figma loads
pages lazily and the metadata capability's page listing reports only what is loaded, so
it under-reports; a file opened on one page answers "one page". `figma.root.children`
is unaffected: it lists every page, and a page reporting zero children is unloaded
rather than empty.

```js
return figma.root.children.map((p) => ({
  id: p.id,
  name: p.name,
  loadedChildren: p.children.length,
}));
```

Do not read `loadedChildren` as a page's size. Nothing in this review needs to open the
out-of-scope pages; their names are the whole point, and they go into the artifact as
`scope.pagesInFile`.

## 1. Hygiene and component inventory

Answers step 2's record list and step 3's buckets in one pass. The inventory keys on
the resolved main component, so `getMainComponentAsync` is awaited once per instance,
in parallel across the whole scope. Keying on instance name instead is cheaper and
wrong: it splits one component across every override name a designer typed, and
collapses genuinely different components that happen to share a name.

```js
const DEFAULT_NAME =
  /^(Frame|Group|Rectangle|Ellipse|Line|Vector|Polygon|Star|Component|Instance|Slice|Section) \d+$/;

const byMain = new Map();
let unresolved = 0;

const instances = all.filter((n) => n.type === "INSTANCE");
const mains = await Promise.all(instances.map((n) => n.getMainComponentAsync()));

instances.forEach((n, i) => {
  const main = mains[i];
  if (!main) {
    unresolved++;
    return;
  }
  // A variant's own name is its property string ("Size=Small"), so report the set.
  const owner = main.parent && main.parent.type === "COMPONENT_SET" ? main.parent : main;
  const seen = byMain.get(owner.id);
  if (seen) seen.count++;
  else
    byMain.set(owner.id, {
      name: owner.name,
      count: 1,
      sample: n.id,
      // remote: true means it came from a subscribed library; cross-check which
      // library against the file's subscription list. false means local to the file.
      remote: owner.remote,
    });
});

const flag = (n) =>
  n.type + ' "' + n.name + '" ' + n.id + (inInstance(n) ? " [in instance]" : " [AUTHORED]");

return {
  nodesTraversed: all.length,
  frames: roots.map((r) => ({
    name: r.name,
    id: r.id,
    w: Math.round(r.width),
    h: Math.round(r.height),
  })),
  inventory: [...byMain.values()].sort((a, b) => b.count - a.count),
  unresolved,
  localComponents: [...byMain.values()].filter((e) => e.remote === false).map((e) => e.name),
  defaultNames: cap(all.filter((n) => DEFAULT_NAME.test(n.name)).map(flag)),
  hidden: cap(all.filter((n) => n.visible === false).map(flag)),
  zeroSize: cap(
    all.filter((n) => typeof n.width === "number" && (n.width === 0 || n.height === 0)).map(flag),
  ),
};
```

Only the `[AUTHORED]` hits in `defaultNames`, `hidden` and `zeroSize` are candidate
findings, per area 1 of [`HANDOFF-CHECKLIST.md`](HANDOFF-CHECKLIST.md). Library
components carry their own `Line 3` and `Frame 2` layers, and reporting those as the
designer's is the easiest false positive in the whole review.

## 2. Variant states

Counts every VARIANT property value per component. This is what turns "no hover
state anywhere" into a counted fact. Tallies key on the resolved main component's
owning component set, same as Script 1; keying on instance name instead splits one
component across every override name a designer typed.

```js
const instances = all.filter((n) => n.type === "INSTANCE");
const mains = await Promise.all(instances.map((n) => n.getMainComponentAsync()));

const tally = {};
instances.forEach((n, i) => {
  const main = mains[i];
  if (!main) return;
  const owner = main.parent && main.parent.type === "COMPONENT_SET" ? main.parent : main;
  const props = n.componentProperties || {};
  for (const key of Object.keys(props)) {
    if (props[key].type !== "VARIANT") continue;
    const value = String(props[key].value);
    if (!tally[owner.name]) tally[owner.name] = {};
    if (!tally[owner.name][key]) tally[owner.name][key] = {};
    tally[owner.name][key][value] = (tally[owner.name][key][value] || 0) + 1;
  }
});
return tally;
```

A property whose every value is `Default`, or a boolean-ish property stuck on one
side (`Expanded=False`, `Truncated=True`) is the finding. Read the component's
full variant set from the Design System documentation to name the states that
exist but were never drawn.

## 3. Annotations

```js
const categories = await figma.annotations.getAnnotationCategoriesAsync();
const annotated = all.filter((n) => Array.isArray(n.annotations) && n.annotations.length > 0);

return {
  categories: categories.map((c) => ({ id: c.id, label: c.label })),
  nodesAnnotated: annotated.length,
  nodesTraversed: all.length,
  annotations: annotated.slice(0, 60).map((n) => ({
    node: n.name + " " + n.id,
    items: n.annotations.map((a) => ({
      categoryId: a.categoryId,
      text: a.labelMarkdown || a.label,
      // Property pins carry no prose; a pin-only annotation restates a value
      // engineering can already read off the layer.
      pins: (a.properties || []).map((p) => p.type),
    })),
  })),
};
```

`categories` lists what the file offers, including any the designer added; the four
defaults are Development, Interaction, Accessibility, and Content. `nodesAnnotated: 0`
against a `nodesTraversed` in the thousands is the area 9 blocker, and both numbers
belong in the report.

## 4. Prototype

```js
const withReactions = all.filter((n) => Array.isArray(n.reactions) && n.reactions.length > 0);
const describe = (n) => ({
  node: n.name + " " + n.id,
  triggers: n.reactions.map((r) => (r.trigger ? r.trigger.type : "NONE")),
  actions: n.reactions.flatMap((r) => (r.actions || []).map((a) => a.type)),
});

// An instance inherits its main component's reactions, so these are not evidence
// of a prototype authored in this file.
const inherited = withReactions.filter((n) => n.type === "INSTANCE" || inInstance(n));
const authored = withReactions.filter((n) => !(n.type === "INSTANCE" || inInstance(n)));

return {
  flowStartingPoints: page.flowStartingPoints.map((f) => f.name + " " + f.nodeId),
  authored: cap(authored.map(describe), 30),
  inheritedCount: inherited.length,
};
```

Empty `flowStartingPoints` with an empty `authored` list is no prototype, whatever
`inheritedCount` reads. Where `authored` has entries, check each reaction's
`transition` for easing and duration before treating motion as specified.

## 5. Placeholder copy

A text sweep is cheaper than a screenshot and misses things a screenshot catches,
so run both; see `SKILL.md` step 4.

```js
const FILLER =
  /\b(lorem|ipsum|dolor|amet|consectetur|adipiscing|elit|eiusmod|tempor|incididunt|labore|aliqua|nostrud|exercitation|commodo|reprehenderit|voluptate|excepteur|cupidatat|proident|perspiciatis|voluptatem|accusantium|doloremque|accusamus|iusto|odio|placeholder|lipsum|tbd|xxx)\b/i;

const texts = all.filter((n) => n.type === "TEXT");
const filler = [];
const seen = new Map();

for (const n of texts) {
  const value = n.characters.trim();
  if (FILLER.test(value)) filler.push(value.slice(0, 60) + " — " + n.id);
  seen.set(value, (seen.get(value) || 0) + 1);
}

return {
  textNodes: texts.length,
  filler: cap(filler, 30),
  // Skim for a value that repeats its own field label, and for a value in the
  // wrong slot. Neither matches a pattern; both are obvious in a flat list.
  distinctValues: cap([...seen.keys()].sort(), 80),
};
```

The word list is a floor, not a definition; extend it for whatever the file
actually uses.
