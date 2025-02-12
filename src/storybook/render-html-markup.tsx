import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Source, SourceProps } from '@storybook/blocks'
import prettier from 'prettier'
import htmlParser from 'prettier/plugins/html'
import { Args, Renderer, StoryContext } from '@storybook/types'
import { Accordion } from '../components/accordion'
import { Tile } from '../components/tile'
import { cx } from '@linaria/core'
import { elMb6, elMt6 } from '..'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'

const handleGetRawHTML =
  (storyContext: StoryContext<Renderer, Args> | null, setRaw: Dispatch<SetStateAction<string>>) => () => {
    if (storyContext) {
      const component = storyContext.originalStoryFn(storyContext.args as any, storyContext as any) as JSX.Element
      const div = document.createElement('div')
      const root = createRoot(div)
      flushSync(() => {
        root.render(component)
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
    setStoryContext: Dispatch<SetStateAction<StoryContext<Renderer, Args> | null>>,
    storyContext: StoryContext<Renderer, Args> | null,
    html: string,
  ) =>
  (code: string, context: Omit<StoryContext<Renderer, Args>, 'step' | 'canvasElement' | 'abortSignal' | 'context'>) => {
    if (!storyContext) {
      setTimeout(() => {
        setStoryContext(context as StoryContext<Renderer, Args>)
      }, 100)
    }

    return html || code
  }

export const RenderHtmlMarkup: FC<SourceProps> = (props) => {
  const [storyContext, setStoryContext] = useState<StoryContext<Renderer, Args> | null>(null)
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
