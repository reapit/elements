import { Dispatch, FC, Fragment, SetStateAction, useState, useId } from 'react'
import { cx } from '@linaria/core'
import { elIsActive } from '../../styles/states'
import { DeprecatedIcon } from '../deprecated-icon'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'
import { DeprecatedAccordionProps } from './types'
import {
  DeprecatedAccordionContainer,
  DeprecatedAccordionContent,
  DeprecatedAccordionItem,
  DeprecatedAccordionTitle,
  DeprecatedAccordionTitleContent,
  DeprecatedAccordionTitleContentWrapper,
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

/** @deprecated */
export const DeprecatedAccordion: FC<DeprecatedAccordionProps> = ({ items, className, ...rest }) => {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const itemContentId = useId()
  const itemButtonId = useId()

  return (
    <DeprecatedAccordionContainer className={className} {...rest}>
      {items.map((item, index) => (
        <Fragment key={index}>
          <DeprecatedAccordionItem
            id={[itemButtonId, index].join('-')}
            aria-controls={[itemContentId, index].join('-')}
            aria-label="Accordion item, hit return to expand content"
            role="button"
            tabIndex={0}
            onClick={handleSetOpenItem(index, setOpenItem, item.onClick)}
            onKeyDown={handleKeyboardEvent('Enter', handleSetOpenItem(index, setOpenItem, item.onClick))}
          >
            <DeprecatedAccordionTitle>{item.title}</DeprecatedAccordionTitle>
            <DeprecatedAccordionTitleContentWrapper>
              {item.titleItems &&
                item.titleItems.map((titleItem, innerIndex) => (
                  <DeprecatedAccordionTitleContent key={innerIndex}>{titleItem}</DeprecatedAccordionTitleContent>
                ))}
              <DeprecatedAccordionTitleContent>
                <DeprecatedIcon
                  fontSize="1.25rem"
                  intent="default"
                  icon={openItem === index ? 'chevronUp' : 'chevronDown'}
                />
              </DeprecatedAccordionTitleContent>
            </DeprecatedAccordionTitleContentWrapper>
          </DeprecatedAccordionItem>
          <DeprecatedAccordionContent
            role="region"
            aria-labelledby={[itemButtonId, index].join('-')}
            id={[itemContentId, index].join('-')}
            aria-expanded={openItem === index}
            className={cx(openItem === index && elIsActive)}
          >
            {item.content}
          </DeprecatedAccordionContent>
        </Fragment>
      ))}
    </DeprecatedAccordionContainer>
  )
}
