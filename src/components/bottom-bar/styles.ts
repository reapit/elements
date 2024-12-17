import { styled } from '@linaria/react'

export const ElBottomBar = styled.div`
  display: flex;
  padding: var(--spacing-2, 8px);
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-top: var(--border-default, 1px) solid var(--outline-default, #e5e9ed);
  background: var(--fill-white, #fff);

  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  overflow: visible;
  margin-top: auto;
  width: 100%;

  transition:
    transform 0.3s ease-in-out,
    visibility 0.3s ease-in-out;

  &[data-is-open='true'] {
    transform: translateY(0);
    visibility: visible;
  }

  &[data-is-open='false'] {
    transform: translateY(100%);
    visibility: hidden;
  }
`
