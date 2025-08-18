import LeftWaveSvg from '../left-wave.svg?react'
import { render } from '@testing-library/react'

test('left mask matches snapshot', () => {
  const { asFragment } = render(<LeftWaveSvg />)
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
          d="M0 72C43.7 64.2 14.804 0 76 0v72H0Z"
        />
      </svg>
    </DocumentFragment>
  `)
})
