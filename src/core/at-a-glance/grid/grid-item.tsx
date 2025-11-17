import { AtAGlanceCard } from '../card'
import { ElAtAGlanceGridItem } from './styles'

export namespace AtAGlanceGridItem {
  export interface Props extends AtAGlanceCard.Props {}
}

export function AtAGlanceGridItem(props: AtAGlanceGridItem.Props) {
  return (
    <ElAtAGlanceGridItem>
      <AtAGlanceCard {...props} />
    </ElAtAGlanceGridItem>
  )
}

AtAGlanceGridItem.displayName = 'AtAGlance.GridItem'
