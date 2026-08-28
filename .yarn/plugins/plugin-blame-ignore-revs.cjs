/**
 * Yarn plugin to set `blame.ignoreRevsFile` in the local git config after every
 * `yarn install`, so `git blame` skips mass-reformatting commits (see
 * `.git-blame-ignore-revs`) without every contributor having to run the
 * `git config` command by hand.
 *
 * Uses the same `afterAllInstalled` hook as plugin-husky: it only fires for the
 * root workspace during a local `yarn install`, never when this package is
 * installed as a dependency by a consumer.
 */
module.exports = {
  name: "plugin-blame-ignore-revs",
  factory: () => ({
    hooks: {
      afterAllInstalled(project) {
        const { execSync } = require("child_process");
        try {
          execSync("git config blame.ignoreRevsFile .git-blame-ignore-revs", {
            cwd: project.cwd,
            stdio: "ignore",
          });
        } catch (error) {
          // not a git checkout (e.g. installed from a tarball): warn and continue
          console.warn(
            "[plugin-blame-ignore-revs] Failed to set git config:",
            error && error.message ? error.message : error,
          );
        }
      },
    },
  }),
};
