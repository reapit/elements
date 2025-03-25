import { Page } from '@playwright/test'

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
    await page.waitForSelector('#storybook-root', { timeout: 10000 })
  } catch (error) {
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
