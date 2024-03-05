import { styled } from "@linaria/react"

export const unstyledAnchor = styled.a`
  color: inherit;
  text-decoration: inherit;
  font-weight: inherit;

  &:active, &:hover, &:link, &:visited {
    color: inherit;
    text-decoration: inherit;
    font-weight: inherit;
  }
`
