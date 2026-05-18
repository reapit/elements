/**
 * Yarn plugin to initialise Husky after every `yarn install`.
 *
 * Why a plugin instead of a `postinstall` script?
 *
 * This package is published to npm as `@reapit/elements`. If we used a
 * `postinstall` script, npm would run it for every consumer that installs the
 * package — attempting to run `husky` in their projects, which is both
 * unexpected and almost certainly going to fail.
 *
 * The conventional workaround is to pair `postinstall` with `pinst`, which
 * disables the script when the package is installed as a dependency rather than
 * at the root. That works, but it requires an extra devDependency and
 * `prepack`/`postpack` scripts to toggle pinst around `npm publish`.
 *
 * Yarn Berry's `afterAllInstalled` hook is a cleaner alternative: it only ever
 * fires for the root workspace during a local `yarn install`. It is never
 * invoked when the package is installed as a dependency by a consumer, so there
 * is no leakage and no need for pinst.
 */
module.exports = {
  name: 'plugin-husky',
  factory: () => ({
    hooks: {
      afterAllInstalled(project) {
        const { execSync } = require('child_process')
        try {
          execSync('yarn husky', { cwd: project.cwd, stdio: 'ignore' })
        } catch (error) {
          // husky not available (e.g. CI production install) — warn and continue
          console.warn('[plugin-husky] Failed to run husky:', error && error.message ? error.message : error)
        }
      },
    },
  }),
}
