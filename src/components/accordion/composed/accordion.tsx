import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react'
import { cx } from '@linaria/core'
import {
  ElAccordionContainer,
  ElAccordionContent,
  ElAccordionItem,
  ElAccordionTitle,
  ElAccordionTitleContent,
  ElAccordionTitleContentWrapper,
} from '../__styles__'
import { elIsActive } from '../../../styles/states'
import { Icon } from '../../icon'
import { handleKeyboardEvent } from '../../../storybook/handle-keyboard-event'
import { useId } from '../../../storybook/random-id'
import { AccordionProps } from '../types'

export const handleSetOpenItem =
  (openItem: number, setOpenItem: Dispatch<SetStateAction<number | null>>, onClick?: () => void) => () => {
    setOpenItem((currentItem) => {
      if (onClick) {
        onClick()
      }

      if (currentItem === openItem) {
        return null
      }
      return openItem
    })
  }

export const Accordion: FC<AccordionProps> = ({ items, className, ...rest }) => {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const itemContentId = useId()
  const itemButtonId = useId()

  return (
    <ElAccordionContainer className={className} {...rest}>
      {items.map((item, index) => (
        <Fragment key={index}>
          <ElAccordionItem
            id={[itemButtonId, index].join('-')}
            aria-controls={[itemContentId, index].join('-')}
            aria-label="Accordion item, hit return to expand content"
            role="button"
            tabIndex={0}
            onClick={handleSetOpenItem(index, setOpenItem, item.onClick)}
            onKeyDown={handleKeyboardEvent('Enter', handleSetOpenItem(index, setOpenItem, item.onClick))}
          >
            <ElAccordionTitle>{item.title}</ElAccordionTitle>
            <ElAccordionTitleContentWrapper>
              {item.titleItems &&
                item.titleItems.map((titleItem, innerIndex) => (
                  <ElAccordionTitleContent key={innerIndex}>{titleItem}</ElAccordionTitleContent>
                ))}
              <ElAccordionTitleContent>
                <Icon fontSize="1.25rem" intent="default" icon={openItem === index ? 'chevronUp' : 'chevronDown'} />
              </ElAccordionTitleContent>
            </ElAccordionTitleContentWrapper>
          </ElAccordionItem>
          <ElAccordionContent
            role="region"
            aria-labelledby={[itemButtonId, index].join('-')}
            id={[itemContentId, index].join('-')}
            aria-expanded={openItem === index}
            className={cx(openItem === index && elIsActive)}
          >
            {item.content}
          </ElAccordionContent>
        </Fragment>
      ))}
    </ElAccordionContainer>
  )
}
