import { AnchorPositioning } from '#src/utils/anchor-positioning'
import { Button } from '#src/core/button'
import { elLineClampText, elLineClampDisclosureButton } from './styles'
import { useId, useState } from 'react'
import { useIsHeightTruncated } from './use-is-truncated'

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'

export namespace LineClamp {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** The element to render as. Defaults to `<p>` */
    as?: ElementType
    /** The textual content to clamp. */
    children: ReactNode
    /** The number of lines that should be visible */
    clampTo: number | 'none'
  }
}

/**
 * A utility component that allows limiting the contents of a block to a specified number of lines.
 * It provides a "show more" button to visually disclose the truncated text. When disclosed, a
 * "show less" button is available to visually hide the text again. The truncation is only visual,
 * meaning screen readers will still read the full text.
 *
 * If the contents of a block should be clamped, but does not need to be visually disclosed,
 * use the [line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-clamp)
 * CSS property instead of this component.
 */
export function LineClamp({ as: Element = 'p', children, clampTo, ...rest }: LineClamp.Props) {
  const disclosureButtonId = useId()
  const truncationTargetId = useId()

  const hasClamp = clampTo !== 'none'
  const isTruncated = useIsHeightTruncated(truncationTargetId, [children, clampTo])
  const [showAll, setShowAll] = useState(false)

  const appliedLineClamp = showAll ? undefined : clampTo

  return (
    <Element {...rest}>
      <AnchorPositioning
        anchorElementId={truncationTargetId}
        right="anchor(right)"
        bottom="anchor(bottom)"
        positionedElementId={disclosureButtonId}
      />
      <span
        className={elLineClampText}
        data-is-clamped={isTruncated && !showAll}
        id={truncationTargetId}
        style={{ '--line-clamp': appliedLineClamp } as CSSProperties}
      >
        {children}
      </span>
      <Button
        key={disclosureButtonId}
        // Hide the disclosure button as screen readers will be able to read the full
        // text because the truncation is only visual.
        aria-hidden
        className={elLineClampDisclosureButton}
        hasNoPadding
        // Visually hide the disclosure button when there's no truncation:
        // - When no clamping is applied; and,
        // - When showAll is false and no truncation is applied.
        hidden={!hasClamp || (!showAll && !isTruncated)}
        // Remove ID when showing all to prevent button being anchored to text
        id={showAll ? undefined : disclosureButtonId}
        onClick={() => setShowAll(!showAll)}
        size="medium"
        variant="tertiary"
      >
        {showAll ? 'Show less' : 'Show more'}
      </Button>
    </Element>
  )
}
