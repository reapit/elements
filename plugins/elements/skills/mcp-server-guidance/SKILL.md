---
name: mcp-server-guidance
description: Determine which Reapit Design System MCP server to use when integrating Elements components. Use when choosing between similar components, implementing component APIs, or verifying if a component exists and what it does.
---

# MCP Server Guidance

## When to Use This Skill

Invoke this skill when choosing between similar components, implementing a component for the first time, or verifying a component's current API or existence.

## Identifying the Servers

This skill refers to the two servers as `reapit-elements-design-system` and `reapit-elements` for readability. Your MCP client may have them configured under different local names — that name is assigned locally by whoever connects the server, not by the server itself, so it can differ per consumer.

To confirm you're talking to the right one regardless of local naming, check the connection's endpoint:

| Server (as named in this skill) | Endpoint                      | Backed by  |
| ------------------------------- | ----------------------------- | ---------- |
| `reapit-elements-design-system` | `mcp.zeroheight.com/mcp/<id>` | ZeroHeight |
| `reapit-elements`               | `elements.reapit.cloud/mcp`   | Storybook  |

Tool names (e.g. `search-pages`, `get-documentation`) are defined by the server itself, so they stay the same regardless of local configuration — only the server's name/alias does. For that reason, this skill refers to tools by their bare name rather than prefixing them with a server namespace.

## The Two MCP Servers

### 1. `reapit-elements-design-system` (ZeroHeight-backed)

**Purpose:** Usage guidance — when to use a component, why, and how.

This server answers the question: "Which component should I use?" Its tools cover browsing and searching usage documentation, reading full guidance for a component (when to use it, comparisons to similar components, composition rules, accessibility notes), and checking recent releases or changelog entries.

**Example scenarios:**

- "Should I use Badge or Chip for this status display?"
- "What's the spacing rule between components in a card?"

### 2. `reapit-elements` (Storybook-backed)

**Purpose:** API reference — the exact component implementation and code examples.

This server answers the question: "How do I use this component?" Its tools cover browsing available components, reading the full API reference (TypeScript prop definitions, import path, common usage examples), and viewing detailed code for a specific variant or story, as well as recent releases or changelog entries.

**Example scenarios:**

- "What are all the props for Button?"
- "How do I import and use Card?"

## Decision Checklist

Use this tree to pick the right MCP server:

1. **Are you choosing between components?** (unsure which component solves your problem)
   - Yes → Start with `reapit-elements-design-system`
   - No → Go to step 2

2. **Do you need the exact component API or props?** (ready to implement, need TypeScript types or import path)
   - Yes → Use `reapit-elements`
   - No → Continue with `reapit-elements-design-system` for more usage guidance

3. **Is this about a recent change or release?**
   - Yes → Check the changelog/release notes via either MCP server
   - No → Proceed with the server chosen above

## When Neither MCP Is Connected

If you don't have either MCP server connected in your current session, do not guess. Say explicitly which server(s) are unavailable and what you cannot verify as a result.

## Reference

For more detail on how to integrate Elements components in your codebase:

- **Import paths and conventions** — see the `reapit-elements` MCP's import guidance
- **Component composition and spacing rules** — from `reapit-elements-design-system` usage pages
- **Consumer-specific integration patterns** — raised with the Reapit Design System team

When you've confirmed the right component and its API, the next step is writing code. Use the `design-tokens` skill in this plugin for styling conventions and token references once you're implementing.
