import { test, expect } from '@playwright/test'
// Use require for JSON import to avoid import attributes syntax error
import buildManifest from '../public/dist/index.json'
import { navigate } from './utils'
import { flakeyTestList } from './flakey-test-list'
/** Credit to
 * https://jamesiv.es/blog/frontend/testing/2024/03/11/visual-testing-storybook-with-playwright and
 * https://www.browsercat.com/post/ultimate-guide-visual-testing-playwright#visual-testing-in-cicd
 * for implementation
 */

const storyNames = Object.keys(buildManifest.entries).filter(
  (entry) => buildManifest.entries[entry].tags.includes('story') && !flakeyTestList.includes(entry),
)

storyNames.forEach((story) => {
  test(story, async ({ page }, meta) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await navigate(page, 'https://elements-beta.dev.paas.reapit.cloud', meta.title)

    const screenshot = await page.screenshot()

    expect(screenshot).toMatchSnapshot(`${meta.title}.png`, { maxDiffPixels: 10 })
  })
})
