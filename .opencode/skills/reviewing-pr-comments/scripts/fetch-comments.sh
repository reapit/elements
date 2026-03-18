#!/usr/bin/env bash
# fetch-comments.sh <PR_NUMBER> [owner] [repo]
#
# Fetches unresolved, non-outdated review threads for a pull request and
# emits a slim JSON array to stdout. Each element contains just the fields
# needed to triage a thread: the comment body (including any suggestion
# blocks), file path, line numbers, author, and a direct URL.
#
# Noise filtering: only threads whose root comment was authored by a human
# user (authorType == "User") or by the Copilot reviewer bot
# (login == "copilot-pull-request-reviewer") are included. All other bots
# are silently dropped.
#
# Pagination: all thread pages are fetched automatically. For comments within
# each thread, the first comment and the latest 3 replies are fetched using
# two aliased fields (firstComment / lastComments). The filter script
# deduplicates by databaseId before returning the merged list.
#
# Requirements: gh CLI authenticated with repo read access, python3 on PATH.

set -euo pipefail

PR="${1:?Usage: fetch-comments.sh <PR_NUMBER> [owner] [repo]}"

# Use explicit owner/repo when both are provided; otherwise resolve from the
# git remote so that callers in non-git directories are still supported.
# Providing only one of owner/repo is an error — they must come as a pair.
if [[ -n "${2:-}" && -z "${3:-}" ]] || [[ -z "${2:-}" && -n "${3:-}" ]]; then
  echo "Error: owner and repo must be provided together." >&2
  echo "Usage: fetch-comments.sh <PR_NUMBER> [owner repo]" >&2
  exit 1
fi

if [[ -n "${2:-}" && -n "${3:-}" ]]; then
  OWNER="${2}"
  REPO="${3}"
else
  REMOTE_URL=$(git remote get-url origin 2>/dev/null || true)
  if [[ -z "${REMOTE_URL}" ]]; then
    echo "Error: could not determine git remote. Pass owner and repo explicitly." >&2
    exit 1
  fi

  # Support both SSH (git@github.com:owner/repo.git) and HTTPS remotes.
  if [[ "${REMOTE_URL}" =~ github\.com[:/]([^/]+)/([^/.]+)(\.git)?$ ]]; then
    OWNER="${2:-${BASH_REMATCH[1]}}"
    REPO="${3:-${BASH_REMATCH[2]}}"
  else
    echo "Error: remote URL does not look like a GitHub URL: ${REMOTE_URL}" >&2
    exit 1
  fi
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Fetch all pages of reviewThreads, accumulating nodes into a JSON array.
# Each page uses a cursor; the loop exits when hasNextPage is false.
ALL_NODES="[]"
CURSOR=""

while true; do
  # Pass the cursor as a nullable String — empty string means "no cursor" and
  # the filter script ignores it, but GraphQL requires the variable to be
  # declared. We use a sentinel approach: omit the `after` argument on the
  # first page by branching in the query itself.
  if [[ -z "${CURSOR}" ]]; then
    AFTER_ARG=""
  else
    AFTER_ARG=", after: \"${CURSOR}\""
  fi

  PAGE=$(gh api graphql \
    -f owner="${OWNER}" \
    -f repo="${REPO}" \
    -F pr="${PR}" \
    -f query="
query(\$owner: String!, \$repo: String!, \$pr: Int!) {
  repository(owner: \$owner, name: \$repo) {
    pullRequest(number: \$pr) {
      reviewThreads(first: 100${AFTER_ARG}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          isResolved
          isOutdated
          firstComment: comments(first: 1) {
            nodes {
              databaseId
              author {
                login
                __typename
              }
              body
              path
              line
              startLine
              url
            }
          }
          lastComments: comments(last: 3) {
            nodes {
              databaseId
              author {
                login
                __typename
              }
              body
              path
              line
              startLine
              url
            }
          }
        }
      }
    }
  }
}
")

  # Parse this page in one Python call: validates the response shape, exits on
  # GraphQL errors, and writes three lines to stdout — has_next, cursor, nodes.
  PAGE_PARSED=$(printf '%s' "${PAGE}" | python3 -c "
import json, sys

def extract_threads(page):
    if 'errors' in page:
        for err in page['errors']:
            print('GraphQL error: ' + str(err.get('message', err)), file=sys.stderr)
        sys.exit(1)
    data = page.get('data') or {}
    repo = data.get('repository') or {}
    pr = repo.get('pullRequest') or {}
    threads = pr.get('reviewThreads')
    if threads is None:
        print(
            'Error: unexpected GraphQL response shape'
            ' — data.repository.pullRequest.reviewThreads missing.',
            file=sys.stderr,
        )
        sys.exit(1)
    return threads

page = json.load(sys.stdin)
threads = extract_threads(page)
info = threads['pageInfo']
print('true' if info['hasNextPage'] else 'false')
print(info.get('endCursor') or '')
print(json.dumps(threads['nodes']))
")

  HAS_NEXT=$(printf '%s' "${PAGE_PARSED}" | sed -n '1p')
  CURSOR=$(printf '%s' "${PAGE_PARSED}" | sed -n '2p')
  PAGE_NODES=$(printf '%s' "${PAGE_PARSED}" | sed -n '3p')

  ALL_NODES=$(python3 -c "
import json, sys
existing = json.loads(sys.argv[1])
new = json.loads(sys.argv[2])
print(json.dumps(existing + new))
" "${ALL_NODES}" "${PAGE_NODES}")

  if [[ "${HAS_NEXT}" == "false" ]]; then
    break
  fi
done

# Wrap the accumulated nodes in the envelope the filter script expects, then
# pipe through the filter.
python3 -c "
import json, sys
nodes = json.loads(sys.argv[1])
envelope = {'data': {'repository': {'pullRequest': {'reviewThreads': {'nodes': nodes}}}}}
print(json.dumps(envelope))
" "${ALL_NODES}" | python3 "${SCRIPT_DIR}/filter-threads.py"
