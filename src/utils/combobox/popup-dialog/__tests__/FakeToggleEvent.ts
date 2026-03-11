/**
 * Fake ToggleEvent class mimicking the native popover ToggleEvent API.
 */
export class FakeToggleEvent extends Event {
  newState: string

  constructor(type: string, { newState }: { newState: string }) {
    super(type)
    this.newState = newState
  }
}
