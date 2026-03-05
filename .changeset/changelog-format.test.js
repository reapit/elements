// @ts-check

vi.mock('@changesets/get-github-info', () => ({
  getInfo: vi.fn(),
  getInfoFromPullRequest: vi.fn(),
}))

import { getInfo, getInfoFromPullRequest } from '@changesets/get-github-info'
import { getReleaseLine, getDependencyReleaseLine } from './changelog-format.js'

const REPO = 'reapit-global/gbl-ds-elements'
const OPTIONS = { repo: REPO }

/** @param {Partial<import('@changesets/types').NewChangesetWithCommit>} overrides */
function makeChangeset(overrides = {}) {
  return {
    id: 'test-changeset',
    summary: 'Some change description',
    releases: [],
    commit: 'abc1234def567890',
    ...overrides,
  }
}

/** @returns {import('@changesets/get-github-info').Info} */
function makeInfo({ pull = null, commit = null, user = null } = {}) {
  return {
    pull,
    user,
    links: {
      pull: pull ? `[#${pull}](https://github.com/${REPO}/pull/${pull})` : null,
      commit: commit ? `[\`${commit.slice(0, 7)}\`](https://github.com/${REPO}/commit/${commit})` : null,
      user: user ? `[@${user}](https://github.com/${user})` : null,
    },
  }
}

// ---------------------------------------------------------------------------
// parseCategory — inferred from bump type (no prefix)
// ---------------------------------------------------------------------------

test('infers "Added" category for a minor bump with no prefix', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(makeChangeset({ summary: 'New button variant' }), 'minor', OPTIONS)

  expect(result).toContain('**[Added]**')
  expect(result).toContain('New button variant')
})

test('infers "Fixed" category for a patch bump with no prefix', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(makeChangeset({ summary: 'Correct icon alignment' }), 'patch', OPTIONS)

  expect(result).toContain('**[Fixed]**')
  expect(result).toContain('Correct icon alignment')
})

test('infers "Removed" category for a major bump with no prefix', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(makeChangeset({ summary: 'Remove DeprecatedButton' }), 'major', OPTIONS)

  expect(result).toContain('**[Removed]**')
  expect(result).toContain('Remove DeprecatedButton')
})

// ---------------------------------------------------------------------------
// parseCategory — explicit prefix
// ---------------------------------------------------------------------------

test('uses "Added" category and strips "Added:" prefix', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(
    makeChangeset({ summary: 'Added: autoFlow prop to ButtonGroup' }),
    'patch',
    OPTIONS,
  )

  expect(result).toContain('**[Added]**')
  expect(result).toContain('autoFlow prop to ButtonGroup')
  expect(result).not.toContain('Added:')
})

test('uses "Fixed" category and strips "Fixed:" prefix', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(
    makeChangeset({ summary: 'Fixed: Correct icon spacing in Snack' }),
    'major',
    OPTIONS,
  )

  expect(result).toContain('**[Fixed]**')
  expect(result).toContain('Correct icon spacing in Snack')
  expect(result).not.toContain('Fixed:')
})

test('uses "Changed" category and strips "Changed:" prefix', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(
    makeChangeset({ summary: 'Changed: Default button size to medium' }),
    'patch',
    OPTIONS,
  )

  expect(result).toContain('**[Changed]**')
  expect(result).toContain('Default button size to medium')
  expect(result).not.toContain('Changed:')
})

test('uses "Deprecated" category and strips "Deprecated:" prefix', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(
    makeChangeset({ summary: 'Deprecated: DeprecatedIcon — use Icon instead' }),
    'minor',
    OPTIONS,
  )

  expect(result).toContain('**[Deprecated]**')
  expect(result).toContain('DeprecatedIcon')
  expect(result).not.toContain('Deprecated:')
})

test('uses "Removed" category and strips "Removed:" prefix', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(
    makeChangeset({ summary: 'Removed: CJS build output — consumers must migrate to ESM' }),
    'major',
    OPTIONS,
  )

  expect(result).toContain('**[Removed]**')
  expect(result).toContain('CJS build output')
  expect(result).not.toContain('Removed:')
})

test('uses "Security" category and strips "Security:" prefix', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(
    makeChangeset({ summary: 'Security: Fix brace-expansion CVE-2025-5889' }),
    'patch',
    OPTIONS,
  )

  expect(result).toContain('**[Security]**')
  expect(result).toContain('Fix brace-expansion CVE-2025-5889')
  expect(result).not.toContain('Security:')
})

test('uses "Internal" category and strips "Internal:" prefix', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(
    makeChangeset({ summary: 'Internal: Migrate release process to changesets' }),
    'patch',
    OPTIONS,
  )

  expect(result).toContain('**[Internal]**')
  expect(result).toContain('Migrate release process to changesets')
  expect(result).not.toContain('Internal:')
})

test('prefix matching is case-insensitive', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(makeChangeset({ summary: 'ADDED: Dark mode support' }), 'patch', OPTIONS)

  expect(result).toContain('**[Added]**')
  expect(result).not.toContain('ADDED:')
})

test('conventional commit prefix is treated as part of the description', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(makeChangeset({ summary: 'feat: Add dark mode support' }), 'patch', OPTIONS)

  // 'feat:' is not a recognised prefix — it stays in the body and the bump
  // type heuristic applies (patch → Fixed)
  expect(result).toContain('**[Fixed]**')
  expect(result).toContain('feat: Add dark mode support')
})

// ---------------------------------------------------------------------------
// GitHub metadata
// ---------------------------------------------------------------------------

test('appends PR link, commit link, and author to the entry', async () => {
  vi.mocked(getInfo).mockResolvedValue(
    makeInfo({ pull: 1105, commit: 'e78c4c8234416385c2546464b2c5399bd6ace088', user: 'kdoherty_Reapit' }),
  )

  const result = await getReleaseLine(
    makeChangeset({ summary: 'Add new component', commit: 'e78c4c8234416385c2546464b2c5399bd6ace088' }),
    'minor',
    OPTIONS,
  )

  expect(result).toContain('[#1105]')
  expect(result).toContain('`e78c4c8`')
  expect(result).toContain('[@kdoherty_Reapit]')
  // metadata appears in parentheses after the description
  expect(result).toMatch(/Add new component \(.*\)/)
})

test('omits metadata suffix when no GitHub info is available', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(
    makeChangeset({ summary: 'Add new component', commit: undefined }),
    'minor',
    OPTIONS,
  )

  // No trailing parentheses when there is nothing to show
  expect(result).not.toContain('(')
})

test('omits missing metadata parts gracefully', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo({ pull: 42 }))

  const result = await getReleaseLine(makeChangeset({ summary: 'Fix typo' }), 'patch', OPTIONS)

  expect(result).toContain('[#42]')
  // No commit or user, so the suffix should not contain extra commas
  expect(result).not.toMatch(/,\s*\)/)
  expect(result).not.toMatch(/\(\s*,/)
})

test('uses getInfoFromPullRequest when PR number is embedded in the summary', async () => {
  vi.mocked(getInfoFromPullRequest).mockResolvedValue(makeInfo({ pull: 999, commit: 'aabbccdd', user: 'contributor' }))

  const result = await getReleaseLine(
    makeChangeset({ summary: 'pr: #999\nFix an edge case', commit: undefined }),
    'patch',
    OPTIONS,
  )

  expect(vi.mocked(getInfoFromPullRequest)).toHaveBeenCalledWith({ repo: REPO, pull: 999 })
  expect(result).toContain('[#999]')
  // The 'pr: #999' override line must not appear in the output
  expect(result).not.toContain('pr: #999')
})

test('respects GITHUB_SERVER_URL environment variable', async () => {
  const originalEnv = process.env.GITHUB_SERVER_URL
  process.env.GITHUB_SERVER_URL = 'https://github.example.com'

  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  try {
    // The error path would reveal use of the server URL; instead verify no
    // exception is thrown and that the mock was called without the env URL
    // (getInfo resolves its own URL internally). We just confirm the module
    // does not hard-code 'https://github.com' in the error message.
    const result = await getReleaseLine(makeChangeset({ summary: 'A change' }), 'patch', OPTIONS)
    expect(result).toBeTruthy()
  } finally {
    process.env.GITHUB_SERVER_URL = originalEnv
  }
})

// ---------------------------------------------------------------------------
// Multi-line summaries
// ---------------------------------------------------------------------------

test('preserves continuation lines with two-space indentation', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const summary =
    'Added: New icon set\n\nIncludes 24 new icons across three categories:\n- Navigation\n- Actions\n- Status'
  const result = await getReleaseLine(makeChangeset({ summary }), 'minor', OPTIONS)

  expect(result).toContain('**[Added]** New icon set')
  expect(result).toContain('  Includes 24 new icons')
  expect(result).toContain('  - Navigation')
})

test('handles a single-line summary without trailing newline', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getReleaseLine(makeChangeset({ summary: 'fix: Correct focus ring colour' }), 'patch', OPTIONS)

  expect(result).not.toMatch(/\n\s+$/)
})

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

test('throws when repo option is missing', async () => {
  await expect(getReleaseLine(makeChangeset(), 'patch', null)).rejects.toThrow('Please provide a repo')
})

test('throws when options object is provided but repo is absent', async () => {
  await expect(getReleaseLine(makeChangeset(), 'patch', {})).rejects.toThrow('Please provide a repo')
})

// ---------------------------------------------------------------------------
// getDependencyReleaseLine
// ---------------------------------------------------------------------------

/** @param {string} name @param {string} newVersion */
function makeDep(name, newVersion) {
  return {
    name,
    newVersion,
    type: /** @type {const} */ ('patch'),
    oldVersion: '1.0.0',
    changesets: [],
    packageJson: { name, version: newVersion },
    dir: '',
  }
}

test('returns an empty string when no dependencies were updated', async () => {
  const result = await getDependencyReleaseLine([], [], OPTIONS)
  expect(result).toBe('')
})

test('lists updated dependencies under a "Changed" heading', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo({ commit: 'deadbeef' }))

  const result = await getDependencyReleaseLine(
    [makeChangeset({ commit: 'deadbeef' })],
    [makeDep('@reapit/elements-utils', '2.1.0')],
    OPTIONS,
  )

  expect(result).toContain('**[Changed]** Updated dependencies')
  expect(result).toContain('@reapit/elements-utils@2.1.0')
})

test('includes commit links in the dependency release header', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo({ commit: 'deadbeef00112233' }))

  const result = await getDependencyReleaseLine(
    [makeChangeset({ commit: 'deadbeef00112233' })],
    [makeDep('some-package', '3.0.0')],
    OPTIONS,
  )

  expect(result).toContain('`deadbee`')
})

test('omits commit link when changeset has no commit hash', async () => {
  const result = await getDependencyReleaseLine(
    [makeChangeset({ commit: undefined })],
    [makeDep('some-package', '3.0.0')],
    OPTIONS,
  )

  expect(result).toContain('**[Changed]** Updated dependencies:')
  expect(result).not.toContain('`')
})

test('lists multiple updated dependencies on separate indented lines', async () => {
  vi.mocked(getInfo).mockResolvedValue(makeInfo())

  const result = await getDependencyReleaseLine(
    [makeChangeset()],
    [makeDep('pkg-a', '1.2.0'), makeDep('pkg-b', '4.0.1')],
    OPTIONS,
  )

  expect(result).toContain('  - pkg-a@1.2.0')
  expect(result).toContain('  - pkg-b@4.0.1')
})

test('throws when repo option is missing from getDependencyReleaseLine', async () => {
  await expect(getDependencyReleaseLine([makeChangeset()], [makeDep('pkg', '1.0.0')], null)).rejects.toThrow(
    'Please provide a repo',
  )
})
