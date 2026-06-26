# audit-skills

Composite action that runs [NVIDIA SkillSpector](https://github.com/NVIDIA/SkillSpector) static analysis against Claude Code skills in this repository.

## Usage

```yaml
- uses: ./actions/audit-skills
  with:
    path: .agents/skills # directory containing skill subdirectories
    changed-only: 'true' # scan only skills changed in this PR
    base-ref: ${{ github.base_ref }}
```

## Inputs

| Input          | Default          | Description                                                                                                                  |
| -------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `path`         | `.agents/skills` | Directory whose immediate subdirectories are scanned. Each must contain a `SKILL.md`.                                        |
| `changed-only` | `false`          | When `true`, scan only skills changed relative to `base-ref`. Requires `base-ref` and `fetch-depth: 0` on the checkout step. |
| `base-ref`     | _(empty)_        | Base branch to diff against. Pass `github.base_ref` in pull-request workflows. Ignored when `changed-only` is `false`.       |

## How it works

Each skill directory is scanned independently. If a skill contains a `.skillspector-baseline.yaml` file, the action passes it to the scanner via `--baseline` so that known false positives are excluded from the risk score. Suppressed findings remain visible in the output via `--show-suppressed`.

The action fails if any skill produces findings not covered by its baseline.

## Suppressing false positives

Generate a baseline for a skill after reviewing its findings:

```bash
skillspector baseline .agents/skills/my-skill --no-llm -o .agents/skills/my-skill/.skillspector-baseline.yaml
```

Edit the `reason` field for each suppressed fingerprint to explain why it is a false positive. Commit the baseline file alongside the skill.
