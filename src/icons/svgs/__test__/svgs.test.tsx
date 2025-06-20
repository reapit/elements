import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync } from 'node:fs'
import { render } from '@testing-library/react'

const iconsDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const svgFiles = readdirSync(iconsDir).filter((file) => file.endsWith('.svg'))

describe.each(svgFiles)('%s', (svgFile) => {
  test('uses kebab-case', () => {
    expect(svgFile).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*\.svg$/)
  })

  test('has fill set to `currentColor`', async () => {
    const { default: Icon } = await import(join(iconsDir, `${svgFile}?react`))
    const { container } = render(<Icon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('fill', 'currentColor')
  })

  test('has a width and height of 24px', async () => {
    const { default: Icon } = await import(join(iconsDir, `${svgFile}?react`))
    const { container } = render(<Icon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('height', '24')
    expect(svg).toHaveAttribute('width', '24')
  })
})
