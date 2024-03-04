import { CSSProperties } from 'react'
import { Button } from '../components/button'

export default {
  title: 'Theming',
}

export const BasicExample = {
  render: ({}) => (
    <div style={{ '--intent-primary': '#a0c862' } as CSSProperties}>
      <Button intent="primary">Button Text</Button>
    </div>
  ),
}
