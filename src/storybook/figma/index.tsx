import { FC } from 'react'
import * as guidelinesImages from './guidelines-images'

export interface GuidelinesImageProps {
  name: string
}

export const GuidelinesImage: FC<GuidelinesImageProps> = ({ name }) => (
  <img src={guidelinesImages[name]} alt={`${name} guidelines`} />
)

export const figmaDesignUrls = {
  appBar:
    'https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=428-7209&node-type=frame&t=RHaBJeesRCccFe53-0',
  accordion: 'https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=141-4180&t=k8kHuB2wp3KZoKMw-4',
  buttonGroup: 'https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=428-7408&t=8GcgX59FmafMRAda-4',
}
