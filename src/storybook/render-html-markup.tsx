import { FC, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Source, SourceProps } from '@storybook/blocks'
import prettier from 'prettier'
import htmlParser from 'prettier/parser-html'
import { Args, Renderer, StoryContextForLoaders } from '@storybook/types'
import { Accordion } from '../components/accordion'
import { Tile } from '../components/tile'

export const RenderHtmlMarkup: FC<SourceProps> = (props) => {
  const [storyContext, setStoryContext] = useState<StoryContextForLoaders<Renderer, Args> | undefined>()

  return (
    <Tile>
      <Accordion
        items={[
          {
            content: (
              <Source
                transform={(code, context) => {
                  if (storyContext === undefined) setStoryContext(context)

                  return prettier.format(
                    renderToStaticMarkup(context.originalStoryFn(context.args as any, context as any) as any),
                    {
                      parser: 'html',
                      plugins: [htmlParser],
                    },
                  )
                }}
                dark={true}
                language="html"
                {...props}
              />
            ),
            title: `Html of ${storyContext?.name || '...'}`,
          },
        ]}
      />
    </Tile>
  )
}
