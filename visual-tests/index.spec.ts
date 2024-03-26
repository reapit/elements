import { test, expect } from '@playwright/test'
import buildManifest from '../public/dist/index.json'
import { navigate } from './utils'
import { flakeyTestList } from './flakey-test-list'
/** Credit to https://jamesiv.es/blog/frontend/testing/2024/03/11/visual-testing-storybook-with-playwright for implementation */

const storyNames = Object.keys(buildManifest.entries).filter(
  (entry) => buildManifest.entries[entry].tags.includes('story') && !flakeyTestList.includes(entry),
)

test.beforeEach(async ({ page }, meta) => {
  /**
   * Set the viewport size and other global level browser settings here.
   * await page.setViewportSize({ width: 1920, height: 1080 })
   */

  await navigate(page, 'https://elements.reapit.cloud', meta.title)
  await page.screenshot({
    path: `tests/visual.spec.ts-snapshots/${meta.title}-upstream-${process.platform}.png`,
  })
})

storyNames.forEach((story) => {
  test(story, async ({ page }, meta) => {
    await navigate(page, 'https://elements.dev.paas.reapit.cloud', meta.title)
    const upstreamScreenshot = `${meta.title}-upstream-${process.platform}.png`

    const screenshot = await page.screenshot({
      path: `tests/${meta.title}-current-${process.platform}.png`,
    })

    expect(screenshot).toMatchSnapshot(upstreamScreenshot, { maxDiffPixels: 10 })
  })
})
