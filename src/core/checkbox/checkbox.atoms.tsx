import { FC, SVGProps } from 'react'
import { ElCheckboxSvgIcon, ElCheckboxSelectedSvgIcon, ElCheckboxIndeterminateSvgIcon } from './styles'

// Interface for the ElCheckboxIcon component props.
interface ElCheckboxIconProps extends SVGProps<SVGSVGElement> {}

// ElCheckboxIcon component: A basic checkbox icon (unchecked state).
export const ElCheckboxIcon: FC<ElCheckboxIconProps> = (props) => {
  return (
    <ElCheckboxSvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20,2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2Zm0,18H4V4H20Z"
      />
    </ElCheckboxSvgIcon>
  )
}

// ElCheckboxSelectedIcon component: A checkbox icon for the checked state.
export const ElCheckboxSelectedIcon: FC<ElCheckboxIconProps> = (props) => {
  return (
    <ElCheckboxSelectedSvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20,2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2ZM18,9.17l-7.07,7.07a1,1,0,0,1-.71.3,1,1,0,0,1-.7-.3L6,12.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0l2.83,2.83L16.6,7.76A1,1,0,0,1,18,9.17Z"
      />
    </ElCheckboxSelectedSvgIcon>
  )
}

// ElCheckboxIndeterminateIcon component: A checkbox icon for the indeterminate state.
export const ElCheckboxIndeterminateIcon: FC<ElCheckboxIconProps> = (props) => {
  return (
    <ElCheckboxIndeterminateSvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20,2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2Zm0,18H4V4H20Z"
      />
      <path fill="currentColor" d="M8,13h8a1,1,0,0,0,0-2H8a1,1,0,0,0,0,2Z" />
    </ElCheckboxIndeterminateSvgIcon>
  )
}
