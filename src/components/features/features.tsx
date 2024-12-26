import { FC, HTMLAttributes, ReactNode } from 'react'
import { FeaturesItem } from './features.atoms'
import { ElFeatures } from './styles'

export interface FeaturesProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

type FeaturesFC = FC<FeaturesProps> & {
  Item: typeof FeaturesItem
}

const Features: FeaturesFC = (props) => {
  return <ElFeatures {...props} />
}

Features.Item = FeaturesItem

export { Features }
