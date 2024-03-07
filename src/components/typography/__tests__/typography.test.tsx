import { render } from '@testing-library/react'
import {
  Title,
  Subtitle,
  BodyText,
  SmallText,
  Text2XS,
  TextXS,
  Text2XL,
  Text3XL,
  TextBase,
  TextL,
  TextSM,
  TextXL,
  TaggedTypography,
  TypeographyTag,
} from '..'

describe('Typography Base', () => {
  it('Text3XL should match a snapshot', () => {
    const wrapper = render(<Text3XL>I am a Text3XL</Text3XL>)
    expect(wrapper).toMatchSnapshot()
  })

  it('Text3XL should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <Text3XL
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am a Text3XL
      </Text3XL>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('Text2XL should match a snapshot', () => {
    const wrapper = render(<Text2XL>I am a Text2XL</Text2XL>)
    expect(wrapper).toMatchSnapshot()
  })

  it('Text2XL should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <Text2XL
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am a Text2XL
      </Text2XL>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('TextXL should match a snapshot', () => {
    const wrapper = render(<TextXL>I am a TextXL</TextXL>)
    expect(wrapper).toMatchSnapshot()
  })

  it('TextXL should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <TextXL
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am a TextXL
      </TextXL>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('TextL should match a snapshot', () => {
    const wrapper = render(<TextL>I am a TextL</TextL>)
    expect(wrapper).toMatchSnapshot()
  })

  it('TextL should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <TextL
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am a TextL
      </TextL>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('TextBase should match a snapshot', () => {
    const wrapper = render(<TextBase>I am a TextBase</TextBase>)
    expect(wrapper).toMatchSnapshot()
  })

  it('TextBase should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <TextBase
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am a TextBase
      </TextBase>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('TextSM should match a snapshot', () => {
    const wrapper = render(<TextSM>I am a TextSM</TextSM>)
    expect(wrapper).toMatchSnapshot()
  })

  it('TextSM should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <TextSM
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am a TextSM
      </TextSM>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('TextXS should match a snapshot', () => {
    const wrapper = render(<TextXS>I am a TextXS</TextXS>)
    expect(wrapper).toMatchSnapshot()
  })

  it('TextXS should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <TextXS
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am a TextXS
      </TextXS>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('Text2XS should match a snapshot', () => {
    const wrapper = render(<Text2XS>I am a Text2XS</Text2XS>)
    expect(wrapper).toMatchSnapshot()
  })

  it('Text2XS should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <Text2XS
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am a Text2XS
      </Text2XS>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Typography Helpers', () => {
  it('Title should match a snapshot', () => {
    const wrapper = render(<Title>I am a title</Title>)
    expect(wrapper).toMatchSnapshot()
  })

  it('SubTitle should match a snapshot', () => {
    const wrapper = render(<Subtitle>I am a subtitle</Subtitle>)
    expect(wrapper).toMatchSnapshot()
  })

  it('BodyText should match a snapshot', () => {
    const wrapper = render(<BodyText>I am body text</BodyText>)
    expect(wrapper).toMatchSnapshot()
  })

  it('SmallText should match a snapshot', () => {
    const wrapper = render(<SmallText>I am small text</SmallText>)
    expect(wrapper).toMatchSnapshot()
  })

  it('SmallText should match a snapshot', () => {
    const wrapper = render(<SmallText>I am small text</SmallText>)
    expect(wrapper).toMatchSnapshot()
  })

  it('Title should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <Title
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am a title
      </Title>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('SubTitle should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <Subtitle
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am a subtitle
      </Subtitle>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('BodyText should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <BodyText
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am body text
      </BodyText>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('SmallText should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <SmallText
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am small text
      </SmallText>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('SmallText should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <SmallText
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        I am small text
      </SmallText>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('SmallText should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <SmallText
        hasGreyText
        hasRegularText
        hasBoldText
        hasMediumText
        hasItalicText
        hasNoMargin
        hasMargin
        hasDisabledText
        hasCenteredText
        hasSectionMargin
        hasCapitalisedText
        hasUpperCasedText
        intent="primary"
      >
        i am some text
      </SmallText>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('TaggedTypography', () => {
    ;[...Array.from({ length: 5 }, (_, i) => i + 1).map((index) => `h${index}`), 'p', 'small', 'span', 'div'].forEach(
      (tag) => {
        it(`${tag}`, () => {
          const component = render(<TaggedTypography tag={tag as TypeographyTag}></TaggedTypography>)
          expect(component.baseElement.querySelector(tag)?.tagName.toString().toLowerCase()).toBe(tag)
        })
      },
    )

    describe('Typography Components', () => {
      ;[...Array.from({ length: 5 }, (_, i) => i + 1).map((index) => `h${index}`), 'p', 'small', 'span', 'div'].forEach(
        (tag) => {
          Object.entries({
            text3xl: <Text3XL tag={tag as TypeographyTag}></Text3XL>,
            text2xl: <Text2XL tag={tag as TypeographyTag}></Text2XL>,
            textxl: <TextXL tag={tag as TypeographyTag}></TextXL>,
            textl: <TextL tag={tag as TypeographyTag}></TextL>,
            textBase: <TextBase tag={tag as TypeographyTag}></TextBase>,
            textSm: <TextSM tag={tag as TypeographyTag}></TextSM>,
            textXs: <TextXS tag={tag as TypeographyTag}></TextXS>,
            text2Xs: <Text2XS tag={tag as TypeographyTag}></Text2XS>,
          }).forEach(([name, element]) => {
            it(`Element ${name} can return ${tag}`, () => {
              const component = render(element)
              expect(component.baseElement.querySelector(tag)?.tagName.toString().toLowerCase()).toBe(tag)
            })
          })
        },
      )
    })
  })
})
