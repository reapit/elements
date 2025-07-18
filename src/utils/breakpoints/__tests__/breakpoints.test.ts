import { BreakpointMinimumDimensions } from '../breakpoints'

test('breakpoints have not been changed', () => {
  expect(BreakpointMinimumDimensions).toMatchInlineSnapshot(`
    {
      "2XL": "2560px",
      "LG": "1440px",
      "MD": "1024px",
      "SM": "768px",
      "XL": "1920px",
      "XS": "0px",
    }
  `)
})
