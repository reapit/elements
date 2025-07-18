import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync } from 'node:fs'
import { render } from '@testing-library/react'

const logosDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const svgFiles = readdirSync(logosDir).filter((file) => file.endsWith('.svg'))

test.each(svgFiles)('%s is an SVG with a height of 24px', async (svgFile) => {
  const { default: Logo } = await import(join(logosDir, `${svgFile}?react`))
  const { container } = render(<Logo />)
  const svg = container.querySelector('svg')
  expect(svg).toHaveAttribute('height', '24')
})
