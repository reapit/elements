import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Source, SourceProps } from '@storybook/addon-docs/blocks'
import prettier from 'prettier'
import htmlParser from 'prettier/plugins/html'
import type { Args, StoryContext } from '@storybook/react-vite'
import { Accordion } from '../components/accordion'
import { Tile } from '../components/tile'
import { cx } from '@linaria/core'
import { elMb6, elMt6 } from '..'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'

const handleGetRawHTML = (storyContext: StoryContext<Args> | null, setRaw: Dispatch<SetStateAction<string>>) => () => {
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
    setStoryContext: Dispatch<SetStateAction<StoryContext<Args> | null>>,
    storyContext: StoryContext<Args> | null,
    html: string,
  ) =>
  (code: string, context: any) => {
    if (!storyContext) {
      setTimeout(() => {
        setStoryContext(context)
      }, 100)
    }

    return html || code
  }

export const RenderHtmlMarkup: FC<SourceProps> = (props) => {
  const [storyContext, setStoryContext] = useState<StoryContext<Args> | null>(null)
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
