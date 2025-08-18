import { render } from '@testing-library/react'
import RightWaveSvg from '../right-wave.svg?react'

test('right mask matches snapshot', () => {
  const { asFragment } = render(<RightWaveSvg />)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <svg
        fill="currentColor"
        height="72"
        viewBox="0 0 76 72"
        width="76"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M76.25 72c-43.7-7.8-14.804-72-76-72v72h76Z"
        />
      </svg>
    </DocumentFragment>
  `)
})
