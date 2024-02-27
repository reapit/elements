import React, { FC, useEffect, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Source, SourceProps } from '@storybook/blocks'
import prettier from "prettier"
import htmlPraser from 'prettier/plugins/html'
import { Args, Renderer, StoryContextForLoaders } from '@storybook/types'

export const RenderHtmlMarkup: FC<SourceProps> = (props) => {
  const [storyContext, setStoryContext] = useState<StoryContextForLoaders<Renderer, Args> | undefined>()
  const [html, setHtml] = useState<string | undefined>('Loading...')

  useEffect(() => {
    const resolveHtml = async () => {
      if (!storyContext) return
      const html = await prettier.format(renderToStaticMarkup(storyContext.originalStoryFn(storyContext.args as any, storyContext as any) as any), {
        parser: 'html',
        plugins: [htmlPraser],
      })

      setHtml(html)
    }

    resolveHtml()
  }, [storyContext])

  return (
    <>
      <h4>Html of {storyContext?.name || '...'}</h4>
      <Source

        transform={(code, context) => {
          if (storyContext === undefined) setStoryContext(context)

          return html || code
        }}
        dark={true}
        language='html'
        {...props}
      />
    </>
  )
}
