import { render } from '@testing-library/react'
import {
  MainContainer,
  PageContainer,
  SecondaryNavContainer,
  Molecule,
  FlexContainer,
  TaggedElement,
  elMainContainer,
} from '../index'
import { cx } from '@linaria/core'

describe('MainContainer', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MainContainer hasGreyBackground>
        <p>I am child</p>
      </MainContainer>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('PageContainer', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <PageContainer hasGreyBackground>
        <p>I am child</p>
      </PageContainer>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('SecondaryNavContainer', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <SecondaryNavContainer>
        <p>I am child</p>
      </SecondaryNavContainer>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Molecule', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <Molecule>
        <p>I am child</p>
      </Molecule>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('FlexContainer', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <FlexContainer>
        <p>I am child</p>
      </FlexContainer>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot and render children with all props applied', () => {
    const wrapper = render(
      <FlexContainer
        isFlexRow
        isFlexRowReverse
        isFlexColumn
        isFlexColumnReverse
        isFlexWrap
        isFlexNoWrap
        isFlexWrapReverse
        isFlexAuto
        isFlexInitial
        isFlexGrow0
        isFlexGrow1
        isFlexShrink0
        isFlexShrink
        isFlexJustifyCenter
        isFlexJustifyEnd
        isFlexJustifyBetween
        isFlexJustifyAround
        isFlexJustifyEvenly
        isFlexAlignCenter
        isFlexAlignStart
        isFlexAlignEnd
        hasGreyBackground
      >
        <p>I am child</p>
      </FlexContainer>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('TaggedElements', () => {
    describe('TaggedElement', () => {
      ;['div', 'main', 'aside', 'section'].forEach((tag) => {
        it(`Can return element with tag [${tag}]`, () => {
          const component = render(<TaggedElement baseClass={cx(elMainContainer)} tag={tag as any}></TaggedElement>)
          expect(component.baseElement.querySelector(tag)?.tagName.toLowerCase()).toBe(tag)
        })
      })
    })

    describe('Layout elements can use tag', () => {
      ;['div', 'main', 'aside', 'section'].forEach((tag) => {
        Object.entries({
          main: <MainContainer tag={tag as any}></MainContainer>,
          page: <PageContainer tag={tag as any}></PageContainer>,
          secondaryNav: <SecondaryNavContainer tag={tag as any}></SecondaryNavContainer>,
        }).forEach(([name, element]) => {
          it(`${tag} can be used for element ${name}`, () => {
            const component = render(element)
            expect(component.baseElement.querySelector(tag)?.tagName.toLowerCase()).toBe(tag)
          })
        })
      })
    })
  })
})
