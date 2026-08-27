---
name: code-review
description: Review-specific guidance for @reapit/elements pull requests, covering what to flag, what to skip, and how to avoid false positives. Use this skill whenever reviewing a pull request or diff in this repository, whether as the primary check or a second opinion alongside other automated review.
---

# Code Review

This skill covers judgement calls specific to _reviewing_ changes in `@reapit/elements`, as distinct from the authoring conventions covered by the repo's other skills (`barrel-exports`, `component-interface-pattern`, `react-context-pattern`, `cascade-layering`, `z-index-layering`, `writing-changesets`, `writing-storybook-docs`, `writing-unit-tests`). Check those skills for the specific pattern in question; use this one to decide what's worth raising and how to say it.

## What to flag

- **Correctness bugs** in the changed lines: logic errors, incorrect state handling, accessibility regressions, broken keyboard/focus behaviour.
- **Convention violations** covered by another skill in this repo: cite the skill or rule by name (e.g. "barrel export ordering", "namespace interface pattern") rather than describing it generically.
- **Missing changeset** for a user-facing change (new component, prop, behaviour change, deprecation, removal): see `writing-changesets`.
- **Missing Storybook story** for new component behaviour.
- **Missing screenshot/video** on a PR with visible UI changes.
- **z-index or cascade-layer violations**: new stacking contexts or styles that bypass the layering conventions.

## What to skip

Do not raise these, because they create noise and erode trust in the review:

- **Anything a linter, formatter, or type checker would catch.** `oxlint` and `oxfmt` run on commit and in CI; assume they will catch import/formatting/type issues. Don't repeat their job.
- **Pre-existing issues** outside the diff, even if noticed while reading surrounding code.
- **Stylistic nitpicks** not backed by a documented convention (a skill, CLAUDE.md, or an explicit repo pattern). If you can't point to where the rule comes from, don't raise it as a blocking comment; mention it as an optional suggestion at most.
- **Issues on lines the PR didn't modify**, even if real.
- **Convention violations explicitly suppressed in code** (e.g. a lint-disable comment with a reason): assume the suppression was deliberate unless the reason given is wrong.
- **General code-quality asks** (more tests, more docs, broader refactor) beyond what the specific convention requires, unless the change clearly breaks an existing guarantee.

## Use the design system MCP servers when available

If an Elements design system MCP server (documentation/Storybook lookup, design tokens) is available to you, consult it when reviewing changes to component props, exports, or documented behaviour: verify the change matches (or correctly updates) the documented spec rather than relying on the diff alone. This is especially useful for catching prop/API drift that the diff doesn't make obvious in isolation.

## Resolving conflicts

- **Most specific guidance wins.** A convention in a skill or a directory-local `CLAUDE.md` overrides general guidance elsewhere.
- **Lab components (`src/lab/`) are exempt from stability guarantees** but not from the lab contribution process: check `src/lab/README.md` before flagging an unstable API as a problem.
- **`src/deprecated/`** should not be modified except for critical fixes: don't ask for modernisation of deprecated code.

## Confidence and tone

- Only raise an issue if you're confident it's real and would matter in practice, not merely plausible.
- State the issue, why it matters, and where (file + line). Link to the specific convention or prior discussion if one exists.
- Keep comments brief. No emojis.
- If a PR has no real issues, say so plainly rather than inventing minor points to justify the review.
