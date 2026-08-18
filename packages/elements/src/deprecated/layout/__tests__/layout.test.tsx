import { cx } from "@linaria/core";
import { render } from "@testing-library/react";

import {
  DeprecatedMainContainer,
  PageContainer,
  SecondaryNavContainer,
  FlexContainer,
  TaggedElement,
  elDeprecatedMainContainer,
} from "../index";

describe("MainContainer", () => {
  it("should match a snapshot and render children", () => {
    const wrapper = render(
      <DeprecatedMainContainer hasGreyBackground>
        <p>I am child</p>
      </DeprecatedMainContainer>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

describe("PageContainer", () => {
  it("should match a snapshot and render children", () => {
    const wrapper = render(
      <PageContainer hasGreyBackground>
        <p>I am child</p>
      </PageContainer>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

describe("SecondaryNavContainer", () => {
  it("should match a snapshot and render children", () => {
    const wrapper = render(
      <SecondaryNavContainer>
        <p>I am child</p>
      </SecondaryNavContainer>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

describe("FlexContainer", () => {
  it("should match a snapshot and render children", () => {
    const wrapper = render(
      <FlexContainer>
        <p>I am child</p>
      </FlexContainer>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it("should match a snapshot and render children with all props applied", () => {
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
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  describe("TaggedElements", () => {
    describe("TaggedElement", () => {
      ["div", "main", "aside", "section"].forEach((tag) => {
        it(`Can return element with tag [${tag}]`, () => {
          const component = render(
            <TaggedElement
              baseClass={cx(elDeprecatedMainContainer)}
              tag={tag as any}
            ></TaggedElement>,
          );
          expect(component.baseElement.querySelector(tag)?.tagName.toLowerCase()).toBe(tag);
        });
      });
    });

    describe("Layout elements can use tag", () => {
      ["div", "main", "aside", "section"].forEach((tag) => {
        Object.entries({
          main: <DeprecatedMainContainer tag={tag as any}></DeprecatedMainContainer>,
          page: <PageContainer tag={tag as any}></PageContainer>,
          secondaryNav: <SecondaryNavContainer tag={tag as any}></SecondaryNavContainer>,
        }).forEach(([name, element]) => {
          it(`${tag} can be used for element ${name}`, () => {
            const component = render(element);
            expect(component.baseElement.querySelector(tag)?.tagName.toLowerCase()).toBe(tag);
          });
        });
      });
    });
  });
});
