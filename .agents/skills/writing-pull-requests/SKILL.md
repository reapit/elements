---
name: writing-pull-requests
description: Write pull request titles and descriptions for this repository. Use this skill whenever you create a PR, draft a title or description, or review whether an existing title follows the project conventions. Covers the title format (conventional commit syntax with optional ticket reference), the description template (concise summary, optional ticket link, optional breaking changes), choosing the right commit type, and common mistakes to avoid.
---

# Writing Pull Requests

## When to Use This Skill

Use this skill whenever you:

- Create or propose a pull request
- Draft or review a PR title or description
- Check whether a title will pass CI lint

## PR Title Format

PR titles follow a modified conventional commit syntax:

```
<type>[!]: [PROJ-123 ]<description>
```

- `<type>` — the commit type (see table below)
- `!` — optional, appended immediately after the type to signal a breaking change
- `PROJ-123` — optional ticket reference; any Jira-style key (`[A-Z]+-\d+`, e.g. `DS-102`, `PLAT-45`)
- `<description>` — sentence-case summary, active voice, no trailing full stop

**Rules:**

- Never include a scope — no parenthetical qualifier after the type
- Put the ticket reference before the description, never at the end
- If the branch is work-in-progress, prefix the whole title with `[WIP] `
- Keep the description short enough to read at a glance (roughly 50–72 characters total)

### Examples

| Situation                   | Correct                                           | Incorrect                                      |
| --------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| Feature with ticket         | `feat: DS-102 Add Combobox component`             | `feat(core): DS-102 Add Combobox component`    |
| Bug fix, no ticket          | `fix: Correct Drawer overflow on small viewports` | `fix: fixed drawer overflow`                   |
| Breaking change with ticket | `feat!: DS-450 Remove deprecated Badge exports`   | `feat: DS-450 Remove deprecated Badge exports` |
| Work in progress            | `[WIP] feat: DS-88 Scaffold Image component`      | `WIP feat: DS-88 Scaffold Image component`     |
| Chore, no ticket            | `chore: Update Storybook to v8`                   | `chore(deps): Update Storybook to v8`          |

### Allowed Commit Types

| Type       | When to use                                           |
| ---------- | ----------------------------------------------------- |
| `feat`     | New component, feature, or user-visible behaviour     |
| `fix`      | Bug fix                                               |
| `docs`     | Documentation only                                    |
| `style`    | Formatting, whitespace, punctuation — no logic change |
| `refactor` | Internal restructure with no user-facing change       |
| `perf`     | Performance improvement                               |
| `test`     | Adding or updating tests only                         |
| `build`    | Build system or tooling change                        |
| `ci`       | CI configuration change                               |
| `chore`    | Maintenance task (dependency bumps, housekeeping)     |
| `task`     | Tracked task not covered by the above types           |
| `revert`   | Reverts a previous commit                             |

## PR Description Format

Keep descriptions concise. Reviewers should understand the change and its context in seconds, not minutes.

### Template

```markdown
## Summary

- <What changed and why, one bullet per distinct point>
- <Second point if needed>
- <Third point if needed — omit if fewer points suffice>

## Ticket

[PROJ-123](ticket-url)

## Breaking changes

<Describe what breaks and how to migrate. Reference codemods where available.>

## Visual changes

<Screenshots or videos of the UI change. Drag and drop captured files here.>
```

Omit the **Ticket** section entirely when no ticket exists.
Omit the **Breaking changes** section entirely when the change is non-breaking.
Omit the **Visual changes** section entirely when the change has no UI impact. Use the `capturing-visual-changes` skill to capture assets.

### Summary rules

- Write 1–3 bullet points. One is often enough.
- Lead each bullet with a verb in the active voice: "Add", "Fix", "Remove", "Update".
- Name the specific component, prop, or file affected — avoid vague references.
- Use British English throughout.
- Omit needless words. Never write "This PR…" or "This commit…".
- End bullets without a trailing full stop.

### Breaking changes rules

- Name every export, prop, or behaviour that breaks.
- Describe both the old and new behaviour.
- Include the codemod command if one exists (see the `writing-changesets` skill for the codemod pattern).

### Examples

**Good — concise, specific, active voice:**

```markdown
## Summary

- Add `Combobox` component with keyboard navigation and ARIA listbox pattern
- Export `ComboboxOption` and `useComboboxContext` from the utils barrel

## Ticket

[DS-102](https://linear.app/reapit/issue/DS-102)
```

**Good — breaking change:**

````markdown
## Summary

- Remove deprecated `Badge` and `BadgeGroup` exports from `src/deprecated/badge`

## Ticket

[DS-450](https://linear.app/reapit/issue/DS-450)

## Breaking changes

`Badge` and `BadgeGroup` are removed. Run the `upgrade-deprecated-badge` codemod to migrate:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-badge src/
```
````

**Bad — vague, passive, verbose:**

```markdown
## Summary

This PR has been created to address some issues that were found with the Drawer
component. Changes have been made to fix the overflow behaviour.
```

## Common Mistakes

**Including a scope:**

```
❌ feat(core): DS-102 Add Combobox component
✅ feat: DS-102 Add Combobox component
```

**Ticket at the end:**

```
❌ feat: Add Combobox component DS-102
✅ feat: DS-102 Add Combobox component
```

**Lowercase ticket key:**

```
❌ feat: ds-102 Add Combobox component
✅ feat: DS-102 Add Combobox component
```

**Vague description:**

```
❌ fix: Fix stuff
✅ fix: Correct Drawer overflow clipping on viewports narrower than 375px
```

**Passive voice in summary:**

```
❌ - The Combobox component has been added
✅ - Add Combobox component with keyboard navigation
```

**"This PR…" opener:**

```
❌ - This PR adds the Combobox component requested in DS-102
✅ - Add Combobox component (DS-102)
```

## Creating PRs with `gh`

When running `gh pr create`, pass the body via `--body-file` rather than
`--body "$(cat <<'EOF'…)"`. Embedding multi-line Markdown (especially code
fences and backticks) directly in shell command substitutions is brittle and
easy to break with quoting/escaping mistakes, whereas `--body-file` keeps the
Markdown content intact.

```bash
tmp=$(mktemp)
cat > "$tmp" <<'EOF'
## Summary

- Add `Foo` component
EOF
gh pr create --title "feat: Add Foo" --body-file "$tmp"
rm "$tmp"
```

## Quick Checklist

Before opening the PR:

- [ ] Title starts with an allowed type (`feat`, `fix`, `chore`, etc.)
- [ ] No scope in the title — no parenthetical qualifier
- [ ] Ticket reference (if applicable) follows the type, before the description
- [ ] Ticket key is uppercase (e.g. `DS-102`, not `ds-102`)
- [ ] `!` suffix used when the change is breaking
- [ ] Description is sentence-case and active voice
- [ ] Summary has 1–3 bullets, each starting with a verb
- [ ] No "This PR…" or "This commit…" openers
- [ ] Ticket section omitted when no ticket exists
- [ ] Breaking changes section included for any breaking change, with migration notes
- [ ] Visual changes section included when the PR has UI impact, with captured assets listed
- [ ] British English throughout

## Reference

For prose style rules (active voice, omitting needless words, British English spelling), use the `writing-clear-prose` skill.

For writing the accompanying changeset, use the `writing-changesets` skill.

For capturing screenshots and videos of UI changes to embed in the description, use the `capturing-visual-changes` skill.
