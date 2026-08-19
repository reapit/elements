---
name: component-interface-pattern
description: Enforce the namespace interface pattern for components and utilities. Use when creating new components, migrating existing components, or reviewing component type definitions.
---

# Component Interface Pattern

## When to Use This Skill

Invoke this skill when:

- Creating a new React component
- Creating a new utility function with input/output types
- Migrating a component to use the namespace pattern
- Reviewing PRs that add or modify component interfaces
- Reviewing PRs with compound components (e.g., `Table.Row`, `Menu.Item`)

## Required Pattern

All components and utilities **MUST** follow the namespace interface pattern:

```typescript
export function ComponentName({ prop }: ComponentName.Props) {
  // implementation
}

export namespace ComponentName {
  export interface Props {
    /** JSDoc for each prop */
    prop: string;
  }
}
```

Every prop gets JSDoc, every API-related type (props, data types) lives inside the namespace, and
boolean props follow the [naming convention](reference.md#boolean-prop-naming): `is`/`has` for
state, a bare verb for behaviour, and unchanged names for native HTML attributes.

Utility functions use the same shape with `Input`/`Output` instead of `Props` — see
[reference.md](reference.md#utility-functions).

For migrations, compound components (`Table.Row`, `Menu.Item`), shared base interfaces, and the
full set of common mistakes to catch in review, see [reference.md](reference.md).

## Directories to Check

**Apply this pattern in:**

- `src/core/` - All core components
- `src/utils/` - All utility components
- `src/lab/` - Lab components (must follow pattern)

**Skip:**

- `src/deprecated/` - Legacy components (leave unchanged)
- `src/icons/` - Generated components
- `src/tokens/` - Generated tokens

## Review Checklist

- [ ] Namespace name matches component/function name exactly
- [ ] `Props` (or `Input`/`Output` for utilities) interface is inside the namespace
- [ ] All props/fields have JSDoc documentation
- [ ] Function signature uses `ComponentName.Props`
- [ ] No standalone interfaces that should be in the namespace
- [ ] Boolean props follow the naming convention
- [ ] Migrations keep a deprecated type alias; compound components re-export child props on the parent namespace

## Reference

See [reference.md](reference.md) for full examples of migrations, compound components, utility
functions, data types in namespaces, common mistakes, and the shared-base-interface exception.

See `guidelines/interface-pattern.md` for additional examples, complete edge case coverage, and
historical context.
