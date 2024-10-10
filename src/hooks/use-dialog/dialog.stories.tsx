import { useDialog } from '.'
import { Button, ButtonGroup } from '../../components/button'
import { TextBase } from '../../components/typography'

export default {
  title: 'Hooks/useDialog',
}

export const BasicUsage = {
  render: ({}) => {
    const [DialogComponent, openDialog] = useDialog()

    return (
      <>
        <Button intent="primary" onClick={openDialog}>
          Open Dialog
        </Button>
        <DialogComponent
          title="Welcome to the demo dialog"
          footerItems={({ closeDialog }) => (
            <Button onClick={closeDialog} intent="primary">
              Close
            </Button>
          )}
        >
          <TextBase>Here&apos;s some nice content for the inside of the dialog.</TextBase>
        </DialogComponent>
      </>
    )
  },
}

export const MultipleDialogs = {
  render: ({}) => {
    const [DialogA, openDialogA] = useDialog()
    const [DialogB, openDialogB] = useDialog()

    return (
      <>
        <ButtonGroup>
          <Button intent="primary" onClick={openDialogA}>
            Open Dialog A
          </Button>
          <Button intent="primary" onClick={openDialogB}>
            Open Dialog B
          </Button>
        </ButtonGroup>
        <DialogA
          title="Dialog A"
          footerItems={({ closeDialog }) => (
            <ButtonGroup>
              <Button onClick={closeDialog} intent="primary">
                Close
              </Button>
            </ButtonGroup>
          )}
        >
          I&apos;m the dialog A&apos;s content
        </DialogA>
        <DialogB
          title="Dialog B"
          footerItems={({ closeDialog }) => (
            <ButtonGroup>
              <Button onClick={closeDialog} intent="primary">
                Close
              </Button>
            </ButtonGroup>
          )}
        >
          I&apos;m the dialog B&apos;s content
        </DialogB>
      </>
    )
  },
}
