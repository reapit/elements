/**
 * Yarn plugin to configure Git LFS for this clone after every `yarn install`.
 *
 * Visual regression baselines are tracked in LFS (see `.gitattributes`). The failure mode worth
 * guarding is silent: with the LFS filter declared in `.gitattributes` but not wired into git's
 * config, `git add` succeeds and commits the raw PNG, and `git check-attr` still reports
 * `filter: lfs`, so nothing looks wrong until the pack has grown.
 *
 * `git lfs install --local --manual` writes the filter config, including `filter.lfs.required`, into this
 * clone's `.git/config`. That key is the one that turns a silent bypass into a hard `git add`
 * failure. It is set here, per clone, rather than committed to tracked config, because it also
 * gates reads: with the key set and no `git-lfs` binary on PATH, `git status` and `git switch`
 * become fatal on an unmodified tree. Setting it only once the binary is known to be present is
 * what keeps that from happening.
 *
 * See the sibling `plugin-husky.cjs` for why this is a Yarn plugin and not a `postinstall` script.
 */
module.exports = {
  name: "plugin-git-lfs",
  factory: () => ({
    hooks: {
      afterAllInstalled(project) {
        const { execFileSync } = require("child_process");

        const run = (args) =>
          execFileSync("git", args, { cwd: project.cwd, stdio: "ignore", encoding: "utf8" });

        try {
          run(["lfs", "version"]);
        } catch {
          // Warn rather than install: picking a package manager for someone is not this hook's
          // job, and the pre-commit and CI guards catch a raw PNG whether or not this ran.
          console.warn(
            "[plugin-git-lfs] git-lfs is not installed. Visual regression baselines are stored in\n" +
              "                Git LFS, so without it you will check out pointer files instead of\n" +
              "                images, and committing a new baseline will fail lint-staged.\n" +
              "                Install it with 'brew install git-lfs' (or your platform's\n" +
              "                equivalent) and run 'yarn install' again.",
          );
          return;
        }

        try {
          // `--manual` because husky owns the hooks LFS wants to write. Without it the command
          // refuses outright, having found an existing pre-push hook, and this clone never gets
          // the filter config at all. The hook side is handled by the tracked hooks in `.husky/`,
          // which call `git lfs pre-push` and friends themselves; `--manual` only prints the lines
          // it would have written, and this hook discards them.
          run(["lfs", "install", "--local", "--manual"]);
        } catch (error) {
          console.warn(
            "[plugin-git-lfs] Failed to run 'git lfs install --local --manual':",
            error && error.message ? error.message : error,
          );
        }
      },
    },
  }),
};
