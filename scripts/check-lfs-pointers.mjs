#!/usr/bin/env node
/**
 * Verifies that visual regression baselines are stored as Git LFS pointers rather than raw PNGs.
 *
 * This is the guard that does not depend on anyone's local setup. With the LFS filter declared in
 * `.gitattributes` but not wired into a clone's git config, `git add` succeeds and commits the raw
 * bytes; `git check-attr` still reports `filter: lfs`, so attribute configuration alone proves
 * nothing. The only reliable test is to read the committed blob and look at its first bytes.
 *
 * Two modes, because the guards run at different points in the lifecycle:
 *
 *   check-lfs-pointers.mjs <path>...     the staged blob at each path, for `lint-staged`
 *   check-lfs-pointers.mjs --rev <ref>   every baseline in a committed tree, for CI
 *
 * Both read through `git cat-file`, so neither needs the `git-lfs` binary. That matters for the CI
 * mode in particular: the check has to hold on a runner that never installs LFS.
 */
import { execFileSync } from "node:child_process";
import path from "node:path";

/** First bytes of a Git LFS pointer file, per the v1 pointer spec. */
const POINTER_PREFIX = "version https://git-lfs.github.com/spec/v1";

/** Must stay in step with the pattern in `.gitattributes`. */
const BASELINE_PATTERN = /(^|\/)__screenshots__\/.*\.png$/;

// Every git call below runs from here, so that `ls-tree` walks the whole repository rather than
// whichever subdirectory the caller happened to be in, and returns repo-relative paths.
const REPO_ROOT = execFileSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
}).trim();

function main(argv) {
  const revIndex = argv.indexOf("--rev");
  const paths = revIndex === -1 ? argv : [];
  const rev = revIndex === -1 ? null : argv[revIndex + 1];

  if (revIndex !== -1 && !rev) {
    fail("--rev needs a git ref, for example: check-lfs-pointers.mjs --rev HEAD");
  }

  const baselines = rev ? listBaselines(rev) : toRepoRelative(paths).filter(isBaseline);

  if (baselines.length === 0) return;

  const raw = baselines.filter((file) => !isPointer(rev ? `${rev}:${file}` : `:${file}`));

  if (raw.length === 0) return;

  fail(
    [
      raw.length === 1
        ? "1 screenshot baseline committed as a raw PNG instead of a Git LFS pointer:"
        : `${raw.length} screenshot baselines committed as raw PNGs instead of Git LFS pointers:`,
      "",
      ...raw.map((file) => `  ${file}`),
      "",
      "Git cannot delta PNGs, so raw baselines grow the pack permanently for every clone.",
      "",
      "Set up LFS for this clone and re-stage them:",
      "",
      "  git lfs install --local",
      `  git rm --cached ${raw.join(" ")}`,
      `  git add ${raw.join(" ")}`,
      "",
      "If 'git lfs' is not a command, install git-lfs first ('brew install git-lfs' on macOS).",
    ].join("\n"),
  );
}

function listBaselines(rev) {
  return git(["ls-tree", "-r", "--name-only", rev])
    .split("\n")
    .filter((file) => isBaseline(file));
}

function isBaseline(file) {
  return BASELINE_PATTERN.test(file);
}

/**
 * `lint-staged` hands over absolute paths, and it runs from the repo root, but git object
 * specifiers such as `:path/to/file` are always repo-relative.
 */
function toRepoRelative(paths) {
  return paths.map((file) => path.relative(REPO_ROOT, path.resolve(file)));
}

/** A v1 pointer is three short lines, so anything of any real size is a raw PNG. */
const MAX_POINTER_BYTES = 1024;

function isPointer(specifier) {
  let size;

  try {
    size = Number(git(["cat-file", "-s", specifier]).trim());
  } catch {
    // Not in the tree or index at all, which in the staged mode means a deletion. Nothing to
    // check, and nothing to complain about.
    return true;
  }

  // Checking the size first keeps a multi-megabyte PNG out of the buffer, and is decisive on its
  // own: no pointer is this big.
  if (size > MAX_POINTER_BYTES) return false;

  const contents = execFileSync("git", ["cat-file", "blob", specifier], {
    cwd: REPO_ROOT,
    encoding: "latin1",
  });

  return contents.startsWith(POINTER_PREFIX);
}

function git(args) {
  return execFileSync("git", args, { cwd: REPO_ROOT, encoding: "utf8" });
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

// Last, not first: the `const` declarations above are not hoisted, so calling `main` before them
// would fail on whichever one it reaches first.
main(process.argv.slice(2));
