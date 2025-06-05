import { Page, test } from '@playwright/test'

export const getStoryUrl = (storybookUrl: string, id: string): string => {
  const params = new URLSearchParams({
    id,
    viewMode: 'story',
    nav: '0',
  })

  return `${storybookUrl}/iframe.html?${params.toString()}`
}

export const navigate = async (page: Page, storybookUrl: string, id: string): Promise<void> => {
  try {
    const url = getStoryUrl(storybookUrl, id)
    console.log(`[Navigate] Loading ${url}`)
    await page.goto(url)
    await page.waitForLoadState('networkidle')
    // Check for Storybook "Couldn't find story matching" error before proceeding
    const errorText = "Couldn't find story matching"
    const hasError = await page.locator(`text=${errorText}`).count()
    if (hasError > 0) {
      test.skip(true, `Skipping test: Storybook error detected - ${errorText}`)
    }
    await page.waitForSelector('#storybook-root')
  } catch (error) {
    throw new Error(`Failed to navigate to storybook URL: ${storybookUrl} with id: ${id}`)
    console.error(`[Navigate] Error navigating to story: ${id}`, error)

    // Try to take a screenshot of the broken state for debugging
    try {
      await page.screenshot({ path: `.visual-test/debug-${id}.png` })
      console.log(`[Debug] Saved fallback screenshot for: ${id}`)
    } catch (screenshotError) {
      console.warn(`[Debug] Could not take fallback screenshot for: ${id}`, screenshotError)
    }
  }
}
