import { FC, useEffect, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Source, SourceProps } from '@storybook/blocks'
import prettier from 'prettier'
import htmlParser from 'prettier/plugins/html'
import { Args, Renderer, StoryContextForLoaders } from '@storybook/types'
import { Accordion } from '../components/accordion'
import { Tile } from '../components/tile'
import { cx } from '@linaria/core'
import { elMb6, elMt6 } from '..'

export const RenderHtmlMarkup: FC<SourceProps> = (props) => {
  const [storyContext, setStoryContext] = useState<StoryContextForLoaders<Renderer, Args> | undefined>()
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    const format = async () => {
      if (!storyContext) return
      const formatted = await prettier.format(
        renderToStaticMarkup(storyContext.originalStoryFn(storyContext.args as any, storyContext as any) as any),
        {
          parser: 'html',
          plugins: [htmlParser],
        },
      )

      setHtml(formatted)
    }

    format()
  }, [storyContext])

  return (
    <Tile className={cx(elMb6, elMt6)}>
      <Accordion
        items={[
          {
            content: (
              <Source
                transform={(code, context) => {
                  if (storyContext === undefined) setStoryContext(context)

                  return html || code
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
