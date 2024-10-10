import React from 'react'

import { render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

import { useDialog, UseDialog } from '..'

jest.mock('../../../components/dialog/use-dialog-appearance')

describe('useDialog', () => {
  it('should able to toggle the internal state', async () => {
    const { result } = renderHook<{}, UseDialog>(() => useDialog())

    const [Dialog, openDialog, closeDialog] = result.current ?? []
    const getIsDialogState = () => result.current?.[3]

    expect(render(<Dialog footerItems={() => <p>dialog footer</p>} />).asFragment()).toMatchSnapshot()

    act(() => {
      openDialog()
    })

    expect(getIsDialogState()).toBeTruthy()

    act(() => {
      closeDialog()
    })

    expect(getIsDialogState()).toBeFalsy()
  })
})
