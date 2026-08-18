import { render } from "@testing-library/react";

import { ColResponsive, GridResponsive } from "../grid-responsive";

describe("GridResponsive", () => {
  it("should match a snapshot and render children with no props", () => {
    const wrapper = render(
      <GridResponsive>
        <p>I am child</p>
      </GridResponsive>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it("hould render with the correct classNames when supplied all props", () => {
    const wrapper = render(
      <GridResponsive
        colGapMobile={1}
        colGapTablet={2}
        colGapDesktop={3}
        colGapWideScreen={4}
        colGapSuperWideScreen={6}
        colGap4KScreen={8}
        rowGapMobile={1}
        rowGapTablet={2}
        rowGapDesktop={3}
        rowGapWideScreen={4}
        rowGapSuperWideScreen={6}
        rowGap4KScreen={8}
      >
        <p>I am child</p>
      </GridResponsive>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

describe("ColResponsive", () => {
  it("should match a snapshot and render children with no props", () => {
    const wrapper = render(
      <ColResponsive>
        <p>I am child</p>
      </ColResponsive>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it("should render with the correct classNames when supplied all props", () => {
    const wrapper = render(
      <ColResponsive
        spanMobile={1}
        spanTablet={1}
        spanDesktop={1}
        spanWideScreen={1}
        spanSuperWideScreen={1}
        span4KScreen={1}
        offsetMobile={1}
        offsetTablet={1}
        offsetDesktop={1}
        offsetWideScreen={1}
        offsetSuperWideScreen={1}
        offset4KScreen={1}
      >
        <p>I am child</p>
      </ColResponsive>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
