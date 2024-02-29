import { FC, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Source, SourceProps } from '@storybook/blocks'
import prettier from 'prettier'
import htmlParser from 'prettier/parser-html'
import { Args, Renderer, StoryContextForLoaders } from '@storybook/types'
import { Accordion } from '../components/accordion'
import { Tile } from '../components/tile'
import { cx } from '@linaria/core'
import { elMb6, elMt6 } from '..'

export const RenderHtmlMarkup: FC<SourceProps> = (props) => {
  const [storyContext, setStoryContext] = useState<StoryContextForLoaders<Renderer, Args> | undefined>()

  return (
    <Tile className={cx(elMb6, elMt6)}>
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
