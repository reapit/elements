import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Source, SourceProps } from '@storybook/blocks'
import prettier from 'prettier'
import htmlParser from 'prettier/plugins/html'
import { Args, Renderer, StoryContextForLoaders } from '@storybook/types'
import { Accordion } from '../components/accordion'
import { Tile } from '../components/tile'
import { cx } from '@linaria/core'
import { elMb6, elMt6 } from '..'
import { flushSync, render } from 'react-dom'

const handleGetRawHTML =
  (storyContext: StoryContextForLoaders<Renderer, Args> | null, setRaw: Dispatch<SetStateAction<string>>) => () => {
    if (storyContext) {
      const component = storyContext.originalStoryFn(storyContext.args as any, storyContext as any) as JSX.Element
      const div = document.createElement('div')

      flushSync(() => {
        render(component, div)
      })
      setRaw(div.innerHTML)
    }
  }

const handleFormatHTML = (raw: string | null, setHtml: Dispatch<SetStateAction<string>>) => () => {
  const format = async () => {
    if (!raw) return

    const formatted = await prettier.format(raw, {
      parser: 'html',
      plugins: [htmlParser],
    })

    setHtml(formatted)
  }

  format()
}

export const handleTransform =
  (
    setStoryContext: Dispatch<SetStateAction<StoryContextForLoaders<Renderer, Args> | null>>,
    storyContext: StoryContextForLoaders<Renderer, Args> | null,
    html: string,
  ) =>
  (code: string, context: StoryContextForLoaders<Renderer, Args>) => {
    if (!storyContext) {
      setTimeout(() => {
        setStoryContext(context)
      }, 100)
    }

    return html || code
  }

export const RenderHtmlMarkup: FC<SourceProps> = (props) => {
  const [storyContext, setStoryContext] = useState<StoryContextForLoaders<Renderer, Args> | null>(null)
  const [html, setHtml] = useState<string>('')
  const [raw, setRaw] = useState<string>('')

  useEffect(handleFormatHTML(raw, setHtml), [raw])

  return (
    <Tile className={cx(elMb6, elMt6)}>
      <Accordion
        items={[
          {
            content: (
              <Source
                transform={handleTransform(setStoryContext, storyContext, html)}
                dark={true}
                language="html"
                {...props}
              />
            ),
            onClick: handleGetRawHTML(storyContext, setRaw),
            title: `Html of ${storyContext?.name || '...'}`,
          },
        ]}
      />
    </Tile>
  )
}
