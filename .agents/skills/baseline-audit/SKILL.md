---
name: baseline-audit
description: Audit the codebase's effective Web Platform Baseline floor and compare it against vendor-supported browser versions. Use when evaluating browser support policy, reviewing Baseline target changes, or assessing whether a new feature raises the effective floor.
---

# Baseline Audit

## When to Use This Skill

Invoke this skill when:

- Evaluating or updating the project's browser support target (`.browserslistrc`)
- Assessing whether a new feature or PR raises the effective Baseline floor
- Checking which vendor-supported browsers fall below the current target
- Preparing a browser support policy recommendation for stakeholders
- Periodically reviewing whether time-bound exceptions (e.g. ESR EOLs) have expired

## Background

The project's browser support policy is: **support all browser versions actively receiving security patches from vendors.** The declared target is set in `.browserslistrc` using `browserslist-config-baseline`. This skill determines whether the declared target, the code's actual requirements, and the policy are aligned.

## Step 1 — Run the Feature Scan

Run the feature scan script to determine the codebase's effective Baseline floor:

```sh
node --experimental-strip-types .agents/skills/baseline-audit/scripts/scan-features.ts
```

This outputs a JSON report with:

- `declaredTarget` — the value in `.browserslistrc`
- `effectiveFloor` — the highest unguarded, non-polyfilled Baseline year found in the code, and which feature is the binding constraint
- `features` — every modern web feature detected, with Baseline year, guard status, polyfill status, match count, and sample file:line references

### Interpreting the Feature Scan

The scan uses grep-based pattern matching across `src/` (excluding `src/lab/` and `src/deprecated/`). Be aware of these limitations:

- **Guard detection is heuristic.** The script looks for `@supports` blocks in the 15 lines preceding a match. Some features may appear "unguarded" when they are actually safe because:
  - CSS declarations with unsupported values are silently ignored by browsers (e.g. `container-type: scroll-state` — the declaration is a no-op in non-supporting browsers, even without `@supports`).
  - A JS fallback exists elsewhere (e.g. `field-sizing` has both `@supports` guards AND a JS resize fallback in a sibling component).
- **Comment matches are excluded**, but JSDoc `@see` links containing feature names may still appear. Check the `text` field in matches.
- **The `excludedDirs` in the output confirms what was skipped.** If `src/lab/` features matter for a specific decision, re-run with modified exclude paths.

For each feature flagged as "beyond baseline" or "unguarded", review the matches and determine:

1. Is the feature genuinely required (functional), or is it progressive enhancement (cosmetic/graceful degradation)?
2. Is there a polyfill, `@supports` guard, or JS fallback not detected by the heuristic?
3. Does the feature affect the policy decision, or is it acceptable as a documented exception?

## Step 2 — Run the Vendor Support Check

Run the vendor support script to determine which browser versions are still receiving security patches:

```sh
node --experimental-strip-types .agents/skills/baseline-audit/scripts/check-vendor-support.ts
```

This outputs a JSON report with:

- `date` — today's date (the check is time-sensitive)
- `browsers` — every browser version still receiving vendor security patches, with its EOL date and the highest Baseline year it satisfies
- `policyFloor` — the lowest Baseline year across all supported browsers, and which browser is the binding constraint

### How the Script Works

- **Firefox**: Fetches all cycles from `endoflife.date/api/firefox.json`. Reports stable (only the latest) and ESR versions still within their support window.
- **Chrome (and Chromium-based Edge)**: Evergreen — only the latest stable version matters. Edge tracks Chrome's release cycle, so Chrome's version is used as a proxy. Fetched from `endoflife.date/api/chrome.json`.
- **Safari**: Derived from macOS support. Apple ships Safari security patches for the latest 3 macOS versions. The script fetches `endoflife.date/api/macos.json` and maps each supported macOS version to its bundled Safari version.

### Maintaining the Safari–macOS Mapping

The `macosSafariMap` in `check-vendor-support.ts` maps macOS major versions to Safari major versions. When Apple releases a new macOS version, add a new entry:

```ts
const macosSafariMap: Record<string, string> = {
  '26': '26', // macOS 26 Tahoe
  '15': '18', // macOS 15 Sequoia
  '14': '17', // macOS 14 Sonoma
  '13': '16', // macOS 13 Ventura
  '12': '15', // macOS 12 Monterey
}
```

Similarly, the `computeBaselineFloors` function contains hardcoded Baseline year → minimum browser version mappings. When a new Baseline year is defined, add a new row.

## Step 3 — Compare and Report

With both outputs, produce a gap analysis:

### 3a. Declared vs Effective

Compare `declaredTarget` (from Step 1) against `effectiveFloor`:

- If the effective floor is **higher** than the declared target, the codebase uses features beyond its declared support. Flag which features cause this and whether they are guarded/polyfilled.
- If the effective floor **matches** the declared target, the declaration is accurate.
- If the effective floor is **lower**, the codebase is conservative relative to its declaration.

### 3b. Declared vs Policy

Compare `declaredTarget` against `policyFloor` (from Step 2):

- If the declared target is **higher** than the policy floor, some vendor-supported browsers lack features the code requires. Identify which browsers and their EOL dates.
- If they **match**, the target is policy-compliant.

### 3c. Options

Present options appropriate to the gap:

1. **Lower the target** to match the policy floor — assess feasibility by listing which features would need removal or guarding.
2. **Keep the target with documented exceptions** — list each exception with its EOL date and note when it self-resolves.
3. **Defer target adoption** — specify the date when all exceptions expire.
4. **Raise the target** — if the codebase already exceeds the declared target, consider updating `.browserslistrc` to match reality.

## Step 4 — Maintain Feature Patterns

The feature scan is driven by `scripts/feature-patterns.json`. When new web platform features are adopted in the codebase, add entries:

```json
{
  "name": "Feature Name",
  "webFeaturesKey": "key-from-web-features-package",
  "category": "css|js|html",
  "patterns": ["grep-pattern-1", "grep-pattern-2"],
  "include": "*.{ts,tsx,css}",
  "knownPolyfill": "@package/name (optional)",
  "notes": "Optional context (optional)"
}
```

To find the correct `webFeaturesKey`, search the `web-features` package:

```sh
node --input-type=module -e "import { features } from 'web-features'; for (const k of Object.keys(features)) { if (k.includes('YOUR_SEARCH')) console.log(k, features[k].status.baseline, features[k].status.baseline_low_date) }"
```

## Report Template

Use this structure for the final report:

```markdown
# Baseline Audit Report — [DATE]

## Summary

|                              |                        |
| ---------------------------- | ---------------------- |
| **Declared target**          | [from .browserslistrc] |
| **Effective codebase floor** | [from scan]            |
| **Policy floor**             | [from vendor check]    |
| **Policy-compliant?**        | Yes / No — [details]   |

## Codebase Features

| Feature | Baseline | Guarded? | Polyfilled? | Matches | Notes |
| ------- | -------- | -------- | ----------- | ------- | ----- |
| ...     | ...      | ...      | ...         | ...     | ...   |

## Vendor-Supported Browsers

| Browser | Version | EOL | Baseline Floor |
| ------- | ------- | --- | -------------- |
| ...     | ...     | ... | ...            |

## Gap Analysis

[Compare declared vs effective vs policy. Identify binding constraints.]

## Options

[List feasible options with pros/cons.]

## Recommendation

[Specific recommendation with rationale.]
```
