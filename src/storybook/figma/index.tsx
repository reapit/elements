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
    'https://www.figma.com/design/XJ6qcAV8gHscsUodqJMNEF/Reapit-Elements-production-ready-components?node-id=16-4840&m=dev',
  sideBar:
    'https://www.figma.com/design/XJ6qcAV8gHscsUodqJMNEF/Reapit-Elements-production-ready-components?node-id=16-5093&m=dev',
  accordion: 'https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=141-4180&t=k8kHuB2wp3KZoKMw-4',
  buttonGroup: 'https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=428-7408&t=8GcgX59FmafMRAda-4',
}
