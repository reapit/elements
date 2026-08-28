import fs from "node:fs";

/** First bytes of a Git LFS pointer file, per the v1 pointer spec. */
const LFS_POINTER_PREFIX = "version https://git-lfs.github.com/spec/v1";

/**
 * Two ways a visual run goes wrong before a single test executes, both of which produce failures
 * that look like real regressions. Catching them here turns each into one clear sentence.
 */
export function setup(): void {
  assertLinux();
  assertBaselinesPulled();
}

/**
 * Pixel baselines are Linux-only, generated inside the pinned Playwright container. Vitest names
 * screenshots `<story>-<browser>-<platform>.png`, so running on macOS does not corrupt the
 * committed set, but every test reports a missing baseline and `--update` would commit a parallel
 * darwin set nobody else can reproduce.
 */
function assertLinux(): void {
  if (process.platform === "linux") return;

  throw new Error(
    `Visual tests must run on Linux, not ${process.platform}, so that screenshots match the ` +
      `baselines committed from CI.\n\nRun them through the container instead, from the repo ` +
      `root:\n\n  yarn test:visual\n`,
  );
}

/**
 * Baselines are stored in Git LFS. A clone whose LFS objects were never fetched has pointer text
 * where the PNGs should be, which surfaces as an image decoding error per test.
 */
function assertBaselinesPulled(): void {
  const baselines = fs.globSync("src/**/__screenshots__/*.png");
  const pointer = baselines.find(isLfsPointer);

  if (!pointer) return;

  throw new Error(
    `Screenshot baselines are Git LFS pointers, not images (for example ${pointer}).\n\n` +
      `Fetch them and try again:\n\n  git lfs pull\n`,
  );
}

function isLfsPointer(file: string): boolean {
  const handle = fs.openSync(file, "r");

  try {
    const header = Buffer.alloc(LFS_POINTER_PREFIX.length);
    const bytesRead = fs.readSync(handle, header, 0, header.length, 0);

    return header.subarray(0, bytesRead).toString("utf8") === LFS_POINTER_PREFIX;
  } finally {
    fs.closeSync(handle);
  }
}
