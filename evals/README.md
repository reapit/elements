# Documentation Quality Evals

Automated evaluations that measure how well an AI agent can use the design system's documentation to answer real UI development tasks.

## Why this exists

Design system documentation exists in two places with different purposes:

- **ZeroHeight** — design intent, component selection guidance, usage rules, and anti-patterns
- **Storybook** — component API surface, prop definitions, and code examples

An agent that reads only one source will miss information the other provides. These evals measure whether each documentation source is good enough to let an agent make correct decisions independently — and reveal where gaps exist.

## How it works

Each eval scenario runs the same set of tasks through an agent with access to a different documentation source:

| Scenario             | Documentation available | Scorer                     | What it measures                                                   |
| -------------------- | ----------------------- | -------------------------- | ------------------------------------------------------------------ |
| `storybook.eval.ts`  | Storybook MCP only      | Implementation Correctness | Correct imports, valid props, sound JSX patterns                   |
| `zeroheight.eval.ts` | ZeroHeight MCP only     | Component Selection        | Right component chosen, anti-patterns avoided, variants understood |

The agent is given a realistic UI development prompt and uses MCP tools to look up documentation before producing a response. A separate LLM-as-judge then scores the output against a list of expected criteria (score = proportion of criteria met, 0–1).

The agent and judge use different models to avoid self-evaluation bias.

### Task fixtures

Three tasks are included as the initial POC foundation. Each covers a distinct failure mode in documentation quality:

| Task                  | Key signal                                                           |
| --------------------- | -------------------------------------------------------------------- |
| `delete-confirmation` | Correct Dialog type selection, destructive Button variant            |
| `settings-toggles`    | Switch vs Toggle naming, Switch vs Checkbox distinction              |
| `form-validation`     | Error hierarchy: inline errors, Section message, Alert Banner, Toast |

More tasks can be added to `evals/fixtures/tasks/` as the eval suite matures.

## Running locally

Requires AWS credentials with access to Amazon Bedrock and a running Storybook instance.

```sh
# Interactive watch mode (development)
yarn eval:dev

# One-shot run (CI)
yarn eval:run
```

The evalite UI is available at `http://localhost:3006` during a watch run.

## Environment variables

| Variable             | Default                                        | Description                                   |
| -------------------- | ---------------------------------------------- | --------------------------------------------- |
| `EVAL_AGENT_MODEL`   | `au.anthropic.claude-sonnet-4-5-20250929-v1:0` | Bedrock model ID for the agent under test     |
| `EVAL_JUDGE_MODEL`   | `au.anthropic.claude-sonnet-4-5-20250929-v1:0` | Bedrock model ID for the LLM-as-judge scorers |
| `EVAL_AWS_REGION`    | `ap-southeast-2`                               | AWS region where the models are enabled       |
| `STORYBOOK_MCP_URL`  | `https://elements.reapit.cloud`                | Base URL of the Storybook MCP server          |
| `ZEROHEIGHT_MCP_URL` | _(ZeroHeight token URL)_                       | Full URL of the ZeroHeight MCP endpoint       |

AWS credentials are sourced from the standard AWS credential chain (environment variables, instance profile, etc.).

## Interpreting scores

Scores range from 0 to 1 and represent the proportion of expected criteria met.

| Score     | Interpretation                                        |
| --------- | ----------------------------------------------------- |
| 0.8 – 1.0 | Documentation is clear and sufficient for this task   |
| 0.5 – 0.8 | Documentation partially supports the task; gaps exist |
| 0.0 – 0.5 | Documentation is missing or misleading for this task  |

A consistently low score on a specific task points to a concrete documentation gap. A low score across all tasks on one scenario (e.g. ZeroHeight only) suggests a systemic problem with that documentation source.

## Directory structure

```
evals/
├── README.md               # This file
├── model.ts                # Agent and judge model configuration
├── storybook.eval.ts       # Storybook-only eval scenario
├── zeroheight.eval.ts      # ZeroHeight-only eval scenario
├── fixtures/
│   ├── types.ts            # EvalTask type definition
│   ├── tasks.ts            # Barrel export of active task fixtures
│   └── tasks/              # Individual task fixtures
├── scorers/
│   ├── implementation.ts   # LLM-as-judge: implementation correctness
│   └── selection.ts        # LLM-as-judge: component selection quality
└── tools/
    ├── storybook.ts        # MCP client for Storybook
    └── zeroheight.ts       # MCP client for ZeroHeight
```

## CI

Evals run on a manual `workflow_dispatch` workflow (`.github/workflows/eval-docs.yml`). Results are exported and uploaded as a GitHub Actions artefact, retained for 90 days.
