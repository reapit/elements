#!/usr/bin/env bash
#
# Runs the visual regression suite inside the pinned Playwright container.
#
# Pixel baselines are Linux-only: a screenshot taken on macOS differs from the same screenshot
# taken on a CI runner in font rasterisation alone, which is enough to fail every comparison. The
# container is what makes a local run and a CI run agree, so it is the only supported way in.
#
# Arguments are forwarded to Vitest, so the usual filters work:
#
#   yarn test:visual                          every visual test
#   yarn test:visual src/core/button          one component
#   yarn test:visual --update                 accept the current rendering as the new baseline
#   yarn test:visual --update src/core/button both at once
#
set -euo pipefail

# Must match `playwright` in packages/elements/package.json exactly, and the `container:` image in
# .github/workflows/test-pr.yml and release.yml. Playwright refuses to drive a browser build it was
# not compiled against, and the image is what supplies the browsers.
IMAGE="mcr.microsoft.com/playwright:v1.62.1-noble"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Docker does not pick an architecture for you: an image published for both runs whichever variant
# the local cache happens to hold. That has to match the host here, because the container reuses
# the host's node_modules instead of installing its own, and the native optional dependencies in it
# were built for the host's architecture. A mismatch does not change the screenshots; it just stops
# the run before it starts.
case "$(uname -m)" in
  arm64 | aarch64) PLATFORM="linux/arm64" ;;
  x86_64 | amd64) PLATFORM="linux/amd64" ;;
  *)
    echo "error: unsupported architecture $(uname -m); the Playwright image has no build for it." >&2
    exit 1
    ;;
esac

if ! docker info > /dev/null 2>&1; then
  echo "error: cannot reach the Docker daemon. Start Docker Desktop and try again." >&2
  exit 1
fi

# The container reuses the host's node_modules rather than installing its own. `.yarnrc.yml` sets
# `supportedArchitectures` so an ordinary `yarn install` materialises the Linux builds of the
# platform-specific optional dependencies alongside the host's own, which is what makes that work.
if [ ! -d "${REPO_ROOT}/node_modules" ]; then
  echo "error: no node_modules found. Run 'yarn install' first." >&2
  exit 1
fi

# Invoke the bundled Yarn release directly rather than a `yarn` on the image's PATH, which may be
# Yarn Classic or absent. Read the path from `.yarnrc.yml` so a Yarn upgrade needs no edit here.
YARN_PATH="$(sed -n 's/^yarnPath:[[:space:]]*\(.*\)$/\1/p' "${REPO_ROOT}/.yarnrc.yml" | head -n1)"

if [ -z "${YARN_PATH}" ]; then
  echo "error: could not read yarnPath from .yarnrc.yml." >&2
  exit 1
fi

# Vitest declares `--update` with an optional argument, so `--update src/core/button` reads the path
# as the update mode and leaves nothing filtering the run: every baseline in the suite is rewritten,
# and nothing says so. Pinning the value here keeps a following path a path.
ARGS=()
for arg in "$@"; do
  case "${arg}" in
    --update | -u) ARGS+=("--update=true") ;;
    *) ARGS+=("${arg}") ;;
  esac
done

# --ipc=host: Chromium exhausts Docker's default 64 MB /dev/shm and crashes mid-run. Playwright's
#             own Docker guidance recommends this over raising --shm-size.
# --user:     without it the container writes new baselines as root, leaving files the developer
#             who generated them cannot amend.
# --env HOME: the image's own HOME belongs to a different uid, and both Vite and Yarn want
#             somewhere writable to cache.
# --volume:   mounted at its own host path rather than something tidier like /repo. Yarn's pnpm
#             linker records absolute locations in its install state, so a repo that appears at a
#             different path inside the container cannot resolve a single binary from it.
#
# ARGS expands through `${ARGS[@]+...}` because `set -u` treats an empty array as unset on the Bash
# 3.2 that ships with macOS, which is what a no-argument `yarn test:visual` would hit.
exec docker run --rm --init \
  --platform "${PLATFORM}" \
  --ipc=host \
  --user "$(id -u):$(id -g)" \
  --env HOME=/tmp \
  --env CI \
  --volume "${REPO_ROOT}:${REPO_ROOT}" \
  --workdir "${REPO_ROOT}" \
  "${IMAGE}" \
  node "${YARN_PATH}" workspace @reapit/elements run test:visual ${ARGS[@]+"${ARGS[@]}"}
