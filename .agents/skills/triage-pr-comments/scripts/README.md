# Scripts

Three cooperating scripts that fetch and filter GitHub pull request review threads.

## `fetch_comments.py`

Fetches all unresolved, non-outdated review threads for a PR via the GitHub
GraphQL API and emits a slim JSON array to stdout.

```
python3 fetch_comments.py <PR_NUMBER> [--filter everyone|humans|agents] [--reviewer <login>] [--owner <owner>] [--repo <repo>]
```

Imports `filter_threads` as a module to apply filtering before output.

External dependencies: `gh` (GitHub CLI), `python3` (3.9+).

## `filter_threads.py`

Reads a GitHub GraphQL `reviewThreads` response from stdin and emits a slim
JSON array of actionable threads. Useful standalone for debugging — the
response must include the `firstComment`/`lastComments` aliased fields produced
by `fetch_comments.py`'s query (a raw captured response without those aliases
will fail at runtime).

```
python3 filter_threads.py [--filter everyone|humans|agents] [--reviewer <login>] < raw-response.json
```

No external dependencies — pure Python stdlib.

## `graphql_utils.py`

Shared utility used by both scripts. Provides `raise_graphql_errors(errors)`,
which formats and raises a `RuntimeError` from a GraphQL `errors` value.
Not a standalone script.

## Design notes

The query fetches the first comment and the last 5 comments per thread using
two aliased fields (`firstComment`, `lastComments`). This captures the root
comment (needed for author filtering) and recent replies (to check if the
thread has been addressed), without fetching unbounded thread history. Comments
in the middle of threads longer than 6 are not retrieved. `filter_threads.py`
deduplicates the overlap on short threads.

`fetch_comments.py` re-wraps the fetched nodes in the full GraphQL envelope
shape before passing them to `filter_threads`. This is so `filter_threads` can
accept either a live call from `fetch_comments` or a raw captured API response
piped from stdin, without needing two different interfaces.

## Testing

`filter_threads.py` is the primary unit-test target: pure functions with no
external dependencies. Import `filter_threads` from it and call the functions
directly.

`fetch_comments.py` is best covered by integration tests against a live `gh`
session. The `resolve_repo` function is independently testable with mocked
subprocess output. The `fetch_page` and `fetch_all_threads` functions can be
tested by mocking `run_gh_graphql`.
