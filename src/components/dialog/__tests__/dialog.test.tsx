import { render } from '@testing-library/react'
import { Dialog } from '../dialog'

jest.mock('../use-dialog-appearance')

describe('Dialog', () => {
  it('should match a snapshot when have a title', () => {
    expect(
      render(
        <Dialog
          isOpen={true}
          handleCloseDialog={jest.fn()}
          title="dialog title"
          footerItems={() => <p>dialog footer</p>}
        />,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when have no title', () => {
    expect(
      render(
        <Dialog isOpen={true} handleCloseDialog={jest.fn()} footerItems={() => <p>dialog footer</p>} />,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should render the dialog when isOpen is false', () => {
    expect(
      render(
        <Dialog isOpen={false} handleCloseDialog={jest.fn()} footerItems={() => <p>dialog footer</p>} />,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
