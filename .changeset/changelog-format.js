// @ts-check

import { getInfo, getInfoFromPullRequest } from '@changesets/get-github-info'

/**
 * Maps a Keep a Changelog category prefix to its category label.
 *
 * Prefixes are the category names themselves, making summaries self-documenting.
 * Recognised prefixes are stripped from the displayed summary. Any prefix not
 * listed here is treated as part of the description (i.e. left in place).
 *
 * @type {Record<string, string>}
 */
const PREFIX_TO_CATEGORY = {
  'added:': 'Added',
  'fixed:': 'Fixed',
  'changed:': 'Changed',
  'deprecated:': 'Deprecated',
  'removed:': 'Removed',
  'security:': 'Security',
  'internal:': 'Internal',
}

/**
 * Infers a Keep a Changelog category from the semver bump type when no
 * conventional-commit prefix is present in the summary.
 *
 * @type {Record<string, string>}
 */
const BUMP_TO_CATEGORY = {
  major: 'Removed',
  minor: 'Added',
  patch: 'Fixed',
  none: 'Changed',
}

/**
 * Parses the category from the beginning of a changeset summary.
 *
 * Returns the resolved category label and the summary with the prefix stripped.
 * When no prefix matches, the category is inferred from the bump type.
 *
 * @param {string} summary - The raw summary from the changeset file.
 * @param {string} type - The semver bump type.
 * @returns {{ category: string, body: string }}
 */
function parseCategory(summary, type) {
  const lower = summary.trimStart().toLowerCase()

  for (const [prefix, category] of Object.entries(PREFIX_TO_CATEGORY)) {
    if (lower.startsWith(prefix)) {
      const body = summary.trimStart().slice(prefix.length).trimStart()
      return { category, body }
    }
  }

  return { category: BUMP_TO_CATEGORY[type] ?? 'Changed', body: summary }
}

/**
 * Builds the metadata suffix appended to each changelog entry.
 *
 * The format is `(PR, commit, @author)`, with any missing pieces omitted.
 *
 * @param {{ pull: string | null, commit: string | null, user: string | null }} links
 * @returns {string}
 */
function buildMetaSuffix(links) {
  const parts = [links.pull, links.commit, links.user].filter(Boolean)
  return parts.length ? ` (${parts.join(', ')})` : ''
}

/**
 * Resolves GitHub links for a changeset from either an explicit PR number
 * embedded in the summary or the commit hash recorded by changesets.
 *
 * Mirrors the parsing done by \@changesets/changelog-github so that authors
 * can still embed `pr: #123`, `commit: abc`, and `author: username` overrides
 * in their summaries.
 *
 * @param {string} rawSummary - Summary before prefix stripping.
 * @param {string | undefined} changesetCommit - Commit hash from changesets.
 * @param {{ repo: string, serverUrl: string }} opts
 * @returns {Promise<{ links: { pull: string | null, commit: string | null, user: string | null }, cleanedSummary: string }>}
 */
async function resolveLinks(rawSummary, changesetCommit, opts) {
  const { repo, serverUrl } = opts

  /** @type {number | undefined} */
  let prFromSummary = undefined
  /** @type {string | undefined} */
  let commitFromSummary = undefined
  /** @type {string[]} */
  let usersFromSummary = []

  const cleanedSummary = rawSummary
    .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
      const num = Number(pr)
      if (!isNaN(num)) prFromSummary = num
      return ''
    })
    .replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
      commitFromSummary = commit
      return ''
    })
    .replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim, (_, user) => {
      usersFromSummary.push(user)
      return ''
    })
    .trim()

  let resolvedLinks

  if (prFromSummary !== undefined) {
    const { links } = await getInfoFromPullRequest({ repo, pull: prFromSummary })
    if (commitFromSummary) {
      const short = /** @type {string} */ (commitFromSummary).slice(0, 7)
      resolvedLinks = {
        ...links,
        commit: `[\`${short}\`](${serverUrl}/${repo}/commit/${commitFromSummary})`,
      }
    } else {
      resolvedLinks = links
    }
  } else {
    const commitToFetch = commitFromSummary ?? changesetCommit
    if (commitToFetch) {
      const { links } = await getInfo({ repo, commit: commitToFetch })
      resolvedLinks = links
    } else {
      resolvedLinks = { pull: null, commit: null, user: null }
    }
  }

  const user =
    usersFromSummary.length > 0
      ? usersFromSummary.map((u) => `[@${u}](${serverUrl}/${u})`).join(', ')
      : resolvedLinks.user

  return {
    links: { pull: resolvedLinks.pull, commit: resolvedLinks.commit, user },
    cleanedSummary,
  }
}

// ---------------------------------------------------------------------------
// Exported changelog functions
// ---------------------------------------------------------------------------

/**
 * Formats a single changeset entry for inclusion in CHANGELOG.md.
 *
 * Output format:
 *   - **[Category]** Description ([#PR](…) [`commit`](…) [@author](…))
 *
 * The category is determined by the prefix in the changeset summary (e.g. `fixed:`,
 * `internal:`). When no recognised prefix is present, the category is inferred from
 * the semver bump type via {@link BUMP_TO_CATEGORY}.
 *
 * @type {import('@changesets/types').GetReleaseLine}
 */
const getReleaseLine = async (changeset, type, options) => {
  if (!options?.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator:\n' +
        '"changelog": ["./changelog-format.js", { "repo": "org/repo" }]',
    )
  }

  const serverUrl = process.env.GITHUB_SERVER_URL ?? 'https://github.com'

  const { links, cleanedSummary } = await resolveLinks(changeset.summary, changeset.commit, {
    repo: options.repo,
    serverUrl,
  })

  const { category, body } = parseCategory(cleanedSummary, type)

  const [firstLine, ...remainingLines] = body.split('\n').map((l) => l.trimEnd())

  const meta = buildMetaSuffix(links)
  const categoryPrefix = category ? `**[${category}]** ` : ''

  const entry = `- ${categoryPrefix}${firstLine}${meta}`

  if (remainingLines.length === 0) {
    return `\n\n${entry}`
  }

  const continuation = remainingLines.map((l) => (l ? `  ${l}` : '')).join('\n')
  return `\n\n${entry}\n${continuation}`
}

/**
 * Formats the list of packages whose versions were bumped solely because a
 * dependency changed (i.e. they have no direct changeset of their own).
 *
 * Output format:
 *   - **[Changed]** Updated dependencies ([`commit`](…))
 *     - package-name@x.y.z
 *
 * @type {import('@changesets/types').GetDependencyReleaseLine}
 */
const getDependencyReleaseLine = async (changesets, dependenciesUpdated, options) => {
  if (dependenciesUpdated.length === 0) return ''

  if (!options?.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator:\n' +
        '"changelog": ["./changelog-format.js", { "repo": "org/repo" }]',
    )
  }

  const uniqueCommits = [...new Set(changesets.map((cs) => cs.commit).filter(Boolean))]

  const commitLinks = (
    await Promise.all(
      uniqueCommits.map(async (commit) => {
        const { links } = await getInfo({ repo: options.repo, commit })
        return links.commit
      }),
    )
  ).filter(Boolean)

  const meta = commitLinks.length ? ` (${commitLinks.join(', ')})` : ''
  const header = `- **[Changed]** Updated dependencies${meta}:`

  const depList = dependenciesUpdated.map((dep) => `  - ${dep.name}@${dep.newVersion}`)

  return [header, ...depList].join('\n')
}

export { getReleaseLine, getDependencyReleaseLine }
