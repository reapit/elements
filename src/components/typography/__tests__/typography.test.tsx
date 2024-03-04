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

  describe('Use semantic property', () => {
    it('Can use p tag', () => {
      const element = render(<BodyText semantic={true}>anything</BodyText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('p')).not.toBe(null)
    })

    it('Can use small tag', () => {
      const element = render(<SmallText semantic={true}>anything</SmallText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('small')).not.toBe(null)
    })

    it('Can use h1 tag', () => {
      const element = render(<Text3XL semantic={true}>anything</Text3XL>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('h1')).not.toBe(null)
    })

    it('Can use h2 tag', () => {
      const element = render(<Text2XL semantic={true}>anything</Text2XL>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('h2')).not.toBe(null)
    })
  })

  describe('Can set tag property', () => {
    it('Can set p tag', () => {
      const element = render(<BodyText tag="p">anything</BodyText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('p')).not.toBe(null)
    })

    it('Can set h1 tag', () => {
      const element = render(<BodyText tag="h1">anything</BodyText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('h1')).not.toBe(null)
    })

    it('Can set small tag', () => {
      const element = render(<BodyText tag="small">anything</BodyText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('small')).not.toBe(null)
    })

    it('Can set h2 tag', () => {
      const element = render(<BodyText tag="h2">anything</BodyText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('h2')).not.toBe(null)
    })

    it('Can set h3 tag', () => {
      const element = render(<BodyText tag="h3">anything</BodyText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('h3')).not.toBe(null)
    })

    it('Can set h4 tag', () => {
      const element = render(<BodyText tag="h4">anything</BodyText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('h4')).not.toBe(null)
    })

    it('Can set h5 tag', () => {
      const element = render(<BodyText tag="h5">anything</BodyText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('h5')).not.toBe(null)
    })

    it('Can set h6 tag', () => {
      const element = render(<BodyText tag="h6">anything</BodyText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('h6')).not.toBe(null)
    })

    it('Can set a tag', () => {
      const element = render(<BodyText tag="a">anything</BodyText>)

      expect(element).toMatchSnapshot()
      expect(element.container.querySelector('a')).not.toBe(null)
    })
  })
})
