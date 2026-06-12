"""Shared utilities for handling GitHub GraphQL responses."""

from typing import NoReturn


def raise_graphql_errors(errors: object) -> NoReturn:
    """Raise RuntimeError with formatted GraphQL error messages.

    Accepts the value of the top-level 'errors' key from a GraphQL response.
    Always raises — never returns.
    """
    if not isinstance(errors, list):
        raise RuntimeError(f"GraphQL errors: {errors}")
    messages = [
        err.get("message", str(err)) if isinstance(err, dict) else str(err)
        for err in errors
    ]
    raise RuntimeError("GraphQL errors:\n" + "\n".join(f"  {m}" for m in messages))
