import preview from '#.storybook/preview'
import { styled } from '@linaria/react'
import { Text } from '#src/utils/text'
import { useCSSCustomHighlights } from './use-css-custom-highlights'
import { useRef } from 'react'

const Container = styled.div`
  /* NOTE: highlight name must match the name passed to useCSSCustomHighlights */
  &::highlight(lorem-ipsum-highlights) {
    background-color: var(--colour-fill-action-light);
  }
`

const meta = preview.meta({
  title: 'Utils/useCSSCustomHighlights',
  argTypes: {
    query: {
      control: 'text',
    },
  },
})

export const Example = meta.story({
  args: {
    query: 'ipsum',
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
  render: function Example(args) {
    const highlightZoneRef = useRef<HTMLDivElement>(null)
    useCSSCustomHighlights('lorem-ipsum-highlights', args.query as string, highlightZoneRef)
    return (
      <Container ref={highlightZoneRef}>
        <Text as="p">Lorem ipsum dolor sit amet.</Text>
      </Container>
    )
  },
})
