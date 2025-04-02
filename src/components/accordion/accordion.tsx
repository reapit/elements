import { Dispatch, FC, Fragment, SetStateAction, useState, useId } from 'react'
import { cx } from '@linaria/core'
import { elIsActive } from '../../styles/states'
import { Icon } from '../icon'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'
import { AccordionProps } from './types'
import {
  AccordionContainer,
  AccordionContent,
  AccordionItem,
  AccordionTitle,
  AccordionTitleContent,
  AccordionTitleContentWrapper,
} from './accordion.atoms'

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
    <AccordionContainer className={className} {...rest}>
      {items.map((item, index) => (
        <Fragment key={index}>
          <AccordionItem
            id={[itemButtonId, index].join('-')}
            aria-controls={[itemContentId, index].join('-')}
            aria-label="Accordion item, hit return to expand content"
            role="button"
            tabIndex={0}
            onClick={handleSetOpenItem(index, setOpenItem, item.onClick)}
            onKeyDown={handleKeyboardEvent('Enter', handleSetOpenItem(index, setOpenItem, item.onClick))}
          >
            <AccordionTitle>{item.title}</AccordionTitle>
            <AccordionTitleContentWrapper>
              {item.titleItems &&
                item.titleItems.map((titleItem, innerIndex) => (
                  <AccordionTitleContent key={innerIndex}>{titleItem}</AccordionTitleContent>
                ))}
              <AccordionTitleContent>
                <Icon fontSize="1.25rem" intent="default" icon={openItem === index ? 'chevronUp' : 'chevronDown'} />
              </AccordionTitleContent>
            </AccordionTitleContentWrapper>
          </AccordionItem>
          <AccordionContent
            role="region"
            aria-labelledby={[itemButtonId, index].join('-')}
            id={[itemContentId, index].join('-')}
            aria-expanded={openItem === index}
            className={cx(openItem === index && elIsActive)}
          >
            {item.content}
          </AccordionContent>
        </Fragment>
      ))}
    </AccordionContainer>
  )
}
