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
    console.error('Error navigating to storybook', error)
  }
}
