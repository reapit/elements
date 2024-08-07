import { styled } from '@linaria/react'

export const GridDemoBlock = styled.div`
  width: 100%;
  min-height: 3rem;
  background-color: var(--purple-500);
`

export const GridDemoBlockFeatured = styled.div`
  width: 100%;
  height: 3rem;
  background: var(--purple-500);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
`

export const GridDemoBlockWithMargin = styled.div`
  height: 3rem;
  background-color: var(--purple-500);
  margin: 0.5rem;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

export const GridDemoBlockSizing = styled.div`
  background-color: var(--purple-500);
  color: var(--white);
  text-align: center;
  display: flex;
  align-items: center;
  padding: 1rem;
  overflow: visible;
  white-space: nowrap;
`

export const GridDemoBorders = styled.div`
  background-color: var(--neutral-100);
  color: var(--black);
  padding: 1rem;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  overflow: visible;
  margin-bottom: 1rem;
`
