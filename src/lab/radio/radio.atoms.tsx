import { FC, SVGProps } from 'react'
import { ElRadioSvgIcon, ElRadioSelectedSvgIcon } from './styles'

// Interface for the ElRadioIcon component props.
interface ElRadioIconProps extends SVGProps<SVGSVGElement> {}

// ElRadioIcon component: A basic radio icon (unchecked state).
export const ElRadioIcon: FC<ElRadioIconProps> = (props) => {
  return (
    <ElRadioSvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
      />
    </ElRadioSvgIcon>
  )
}

// ElRadioSelectedIcon component: A radio icon for the checked state.
export const ElRadioSelectedIcon: FC<ElRadioIconProps> = (props) => {
  return (
    <ElRadioSelectedSvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
      />
      <path
        fill="currentColor"
        d="M2 12C2 6.47715 6.47715 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM4 12C4 16.4183 7.58172 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
      />
    </ElRadioSelectedSvgIcon>
  )
}
