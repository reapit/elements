import { Text2XL, Text2XS, Text3XL, TextBase, TextL, TextSM, TextXL, TextXS } from './typography'

export default {
  title: 'Typography',
  component: TextBase,
}

export const BaseScale = {
  render: ({}) => (
    <>
      <Text3XL>I am a Text3XL</Text3XL>
      <Text2XL>I am a Text2XL</Text2XL>
      <TextXL>I am a TextXL</TextXL>
      <TextL>I am a TextL</TextL>
      <TextBase>I am a TextBase</TextBase>
      <TextSM>I am a TextSM</TextSM>
      <TextXS>I am a TextXS</TextXS>
      <Text2XS>I am a Text2XS</Text2XS>
    </>
  ),
}

export const TaggedTypography = {
  render: ({}) => (
    <>
      <Text3XL tag="h1">I am a Text3XL with an h1 tag</Text3XL>
      <Text2XL tag="h2">I am a Text2XL with an h2 tag</Text2XL>
      <TextXL tag="h4">I am a TextXL with an h4 tag</TextXL>
      <TextL tag="h6">I am a TextL with an h6 tag</TextL>
      <TextBase tag="p">I am a TextBase with a p tag</TextBase>
      <TextSM tag="small">I am a TextSM with a small tag</TextSM>
      <TextXS tag="div">I am a TextXS with a div tag</TextXS>
      <Text2XS tag="span">I am a Text2XS with a span tag</Text2XS>
    </>
  ),
}

export const TypographyModifiers = {
  render: ({}) => (
    <>
      <TextBase hasGreyText>I am a TextBase with the hasGreyText modifier</TextBase>
      <TextBase hasItalicText>I am a TextBase with the hasItalicText modifier</TextBase>
      <TextBase hasRegularText>I am a TextBase with the hasRegularText modifier</TextBase>
      <TextBase hasMediumText>I am a TextBase with the hasMediumText modifier</TextBase>
      <TextBase hasBoldText>I am a TextBase with the hasBoldText modifier</TextBase>
      <TextBase hasCenteredText>I am a TextBase with the hasCenteredText modifier</TextBase>
      <TextBase hasNoMargin>I am a TextBase with the hasNoMargin modifier</TextBase>
      <TextBase hasMargin>I am a TextBase with the hasMargin modifier</TextBase>
      <TextBase hasSectionMargin>I am a TextBase with the hasSectionMargin modifier</TextBase>
      <TextBase hasDisabledText>I am a TextBase with the hasDisabledText modifier</TextBase>
      <TextBase hasCapitalisedText>i am a bodytext with hasCapitalisedText modifier</TextBase>
      <TextBase hasUpperCasedText>i am a bodytext with hasUpperCasedText modifier</TextBase>
    </>
  ),
}

export const Intent = {
  render: ({}) => (
    <>
      <TextBase intent="primary">I am a TextBase primary</TextBase>
      <TextBase intent="neutral">I am a TextBase neutral</TextBase>
      <TextBase intent="success">I am a TextBase success</TextBase>
      <TextBase intent="pending">I am a TextBase pending</TextBase>
      <TextBase intent="warning">I am a TextBase warning</TextBase>
      <TextBase intent="danger">I am a TextBase danger</TextBase>
      <TextBase intent="default">I am a TextBase default</TextBase>
    </>
  ),
}
