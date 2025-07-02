import { DeprecatedButton } from '../deprecated-button'
import { useSnack } from '../../hooks/use-snack'
import { elM1 } from '../../styles/spacing'

export const UseSnackHookStory = () => {
  const { info, success, error, warning, custom } = useSnack()

  return (
    <>
      <DeprecatedButton className={elM1} onClick={() => info('This is infomation')}>
        Trigger an info snack
      </DeprecatedButton>
      <DeprecatedButton className={elM1} onClick={() => success('Something great happened')}>
        Trigger a success snack
      </DeprecatedButton>
      <DeprecatedButton className={elM1} onClick={() => error('Something went wrong')}>
        Trigger an error snack
      </DeprecatedButton>
      <DeprecatedButton className={elM1} onClick={() => warning('Something could be bad')}>
        Trigger a warning snack
      </DeprecatedButton>
      <DeprecatedButton className={elM1} onClick={() => info("I'm here for a while...", 10000)}>
        Trigger a long snack (10 seconds)
      </DeprecatedButton>
      <DeprecatedButton className={elM1} onClick={() => info("I'm very short!", 1000)}>
        Trigger a short snack (1 second)
      </DeprecatedButton>
      <DeprecatedButton
        className={elM1}
        onClick={() =>
          custom({
            text: 'I can have anything in the interface ISnack applied as a parameter here',
            icon: 'property',
            intent: 'success',
          })
        }
      >
        Trigger a custom snack
      </DeprecatedButton>
      <DeprecatedButton className={elM1} onClick={() => info("This message won't disappear on it's own", 0)}>
        Trigger a non-dissapearing snack
      </DeprecatedButton>
    </>
  )
}
