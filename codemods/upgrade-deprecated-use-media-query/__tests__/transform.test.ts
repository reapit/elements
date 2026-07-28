import transform from "../transform";

describe("basic useMediaQuery destructuring", () => {
  test("single property isMobile → useMatchMedia(isWidthBelow)", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'

function App() {
  const { isMobile } = useMediaQuery()
  return isMobile ? <Mobile /> : <Desktop />
}
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("const isMobile = useMatchMedia(isWidthBelow('SM'))");
    expect(output).not.toContain("useMediaQuery");
  });

  test("multiple properties → multiple useMatchMedia calls", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'

function App() {
  const { isMobile, isDesktop } = useMediaQuery()
}
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("const isMobile = useMatchMedia(isWidthBelow('SM'))");
    expect(output).toContain("isWidthAtOrAbove('MD')");
    expect(output).toContain("isWidthBelow('LG')");
    expect(output).not.toContain("useMediaQuery");
  });

  test("isMobile → isWidthBelow(SM)", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("const isMobile = useMatchMedia(isWidthBelow('SM'))");
  });

  test("isTablet → isWidthAtOrAbove(SM) and isWidthBelow(MD)", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isTablet } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("isWidthAtOrAbove('SM')");
    expect(output).toContain("isWidthBelow('MD')");
    expect(output).toContain("isTablet");
  });

  test("isDesktop → isWidthAtOrAbove(MD) and isWidthBelow(LG)", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isDesktop } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("isWidthAtOrAbove('MD')");
    expect(output).toContain("isWidthBelow('LG')");
    expect(output).toContain("isDesktop");
  });

  test("isWideScreen → isWidthAtOrAbove(LG) and isWidthBelow(XL)", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isWideScreen } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("isWidthAtOrAbove('LG')");
    expect(output).toContain("isWidthBelow('XL')");
    expect(output).toContain("isWideScreen");
  });

  test("isSuperWideScreen → isWidthAtOrAbove(XL) and isWidthBelow(2XL)", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isSuperWideScreen } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("isWidthAtOrAbove('XL')");
    expect(output).toContain("isWidthBelow('2XL')");
    expect(output).toContain("isSuperWideScreen");
  });

  test("is4KScreen → isWidthAtOrAbove(2XL)", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { is4KScreen } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("const is4KScreen = useMatchMedia(isWidthAtOrAbove('2XL'))");
  });

  test("local alias used as variable name", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isMobile: mobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("const mobile = useMatchMedia(isWidthBelow('SM'))");
    expect(output).not.toContain("isMobile");
  });
});

describe("non-destructured useMediaQuery", () => {
  test("non-destructured → TODO comment, call site unchanged", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'

function App() {
  const media = useMediaQuery()
  return media.isMobile ? <Mobile /> : <Desktop />
}
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("// TODO: Migrate to useMatchMedia");
    expect(output).toContain("const media = useMediaQuery()");
  });
});

describe("MediaStateProvider removal", () => {
  test("wrapping a single child → unwrap", () => {
    const input = `
import { MediaStateProvider } from '@reapit/elements'

function App() {
  return (
    <MediaStateProvider>
      <App />
    </MediaStateProvider>
  )
}
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("<App />");
    expect(output).not.toContain("MediaStateProvider");
  });

  test("wrapping multiple children → wrapped in fragment", () => {
    const input = `
import { MediaStateProvider } from '@reapit/elements'

function Root() {
  return (
    <MediaStateProvider>
      <Header />
      <Main />
    </MediaStateProvider>
  )
}
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("<Header />");
    expect(output).toContain("<Main />");
    expect(output).not.toContain("MediaStateProvider");
  });

  test("nested children preserved after unwrap", () => {
    const input = `
import { MediaStateProvider } from '@reapit/elements'

function Root() {
  return (
    <MediaStateProvider>
      <div>
        <span>Hello</span>
      </div>
    </MediaStateProvider>
  )
}
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("<div>");
    expect(output).toContain("<span>Hello</span>");
    expect(output).not.toContain("MediaStateProvider");
  });
});

describe("breakpoint constant inlining", () => {
  test("MOBILE_BREAKPOINT → 768 with TODO comment", () => {
    const input = `
import { MOBILE_BREAKPOINT } from '@reapit/elements'

const isMobile = window.innerWidth < MOBILE_BREAKPOINT
`;
    const output = transform(input, "app.ts");
    expect(output).toContain("768");
    expect(output).toContain("TODO");
    expect(output).not.toContain("MOBILE_BREAKPOINT");
  });

  test("TABLET_BREAKPOINT → 1024 with TODO comment", () => {
    const input = `
import { TABLET_BREAKPOINT } from '@reapit/elements'
const x = TABLET_BREAKPOINT
`;
    const output = transform(input, "app.ts");
    expect(output).toContain("1024");
    expect(output).not.toContain("TABLET_BREAKPOINT");
  });

  test("DESKTOP_BREAKPOINT → 1440", () => {
    const input = `
import { DESKTOP_BREAKPOINT } from '@reapit/elements'
const x = DESKTOP_BREAKPOINT
`;
    const output = transform(input, "app.ts");
    expect(output).toContain("1440");
    expect(output).not.toContain("DESKTOP_BREAKPOINT");
  });

  test("WIDESCREEN_BREAKPOINT → 1920", () => {
    const input = `
import { WIDESCREEN_BREAKPOINT } from '@reapit/elements'
const x = WIDESCREEN_BREAKPOINT
`;
    const output = transform(input, "app.ts");
    expect(output).toContain("1920");
    expect(output).not.toContain("WIDESCREEN_BREAKPOINT");
  });

  test("SUPER_WIDESCREEN_BREAKPOINT → 2560", () => {
    const input = `
import { SUPER_WIDESCREEN_BREAKPOINT } from '@reapit/elements'
const x = SUPER_WIDESCREEN_BREAKPOINT
`;
    const output = transform(input, "app.ts");
    expect(output).toContain("2560");
    expect(output).not.toContain("SUPER_WIDESCREEN_BREAKPOINT");
  });
});

describe("MediaType type removal", () => {
  test("MediaType annotation replaced with TODO comment", () => {
    const input = `
import { MediaType } from '@reapit/elements'

const state: MediaType = { isMobile: true }
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("TODO");
    expect(output).not.toContain("import { MediaType }");
  });

  test("MediaType imported with alias — alias annotation replaced", () => {
    const input = `
import { MediaType as MT } from '@reapit/elements'

const state: MT = { isMobile: true }
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("TODO");
    expect(output).not.toContain("import { MediaType");
    expect(output).not.toContain(": MT");
  });
});

describe("MediaStateContext TODO", () => {
  test("MediaStateContext usage gets TODO comment", () => {
    const input = `
import { MediaStateContext } from '@reapit/elements'
import { useContext } from 'react'

const media = useContext(MediaStateContext)
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("TODO");
    expect(output).not.toContain("import { MediaStateContext }");
  });
});

describe("import management", () => {
  test("old import removed when fully consumed", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).not.toContain(`from '@reapit/elements'`);
  });

  test("old import partially cleaned when other exports remain", () => {
    const input = `
import { useMediaQuery, Button } from '@reapit/elements'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain(`import { Button } from '@reapit/elements'`);
    expect(output).not.toContain("useMediaQuery");
  });

  test("new useMatchMedia import added", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain(`from '@reapit/elements/utils/match-media'`);
    expect(output).toContain("useMatchMedia");
  });

  test("only isWidthBelow imported when only isMobile is used", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("isWidthBelow");
    expect(output).not.toContain("isWidthAtOrAbove");
  });

  test("only isWidthAtOrAbove imported when only is4KScreen is used", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { is4KScreen } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("isWidthAtOrAbove");
    expect(output).not.toContain("isWidthBelow");
  });

  test("both helpers imported for compound properties", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isTablet } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("isWidthAtOrAbove");
    expect(output).toContain("isWidthBelow");
  });

  test("useMatchMedia not imported when only non-destructured call (no transformation)", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const media = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).not.toContain(`from '@reapit/elements/utils/match-media'`);
  });
});

describe("alias handling", () => {
  test("useMediaQuery imported with alias — alias call site detected", () => {
    const input = `
import { useMediaQuery as useMedia } from '@reapit/elements'
const { isMobile } = useMedia()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("const isMobile = useMatchMedia(isWidthBelow('SM'))");
    expect(output).not.toContain("useMedia()");
  });
});

describe("no transformation cases", () => {
  test("file without any deprecated imports → unchanged", () => {
    const input = `
import { Button } from '@reapit/elements'

function App() {
  return <Button>Click</Button>
}
`;
    const output = transform(input, "app.tsx");
    expect(output).toBe(input);
  });

  test("useMediaQuery from a non-elements package → unchanged", () => {
    const input = `
import { useMediaQuery } from 'react-responsive'

const { isMobile } = useMediaQuery({ maxWidth: 768 })
`;
    const output = transform(input, "app.tsx");
    expect(output).toBe(input);
  });

  test("empty file → unchanged", () => {
    const input = ``;
    const output = transform(input, "app.tsx");
    expect(output).toBe(input);
  });
});

describe("facade package support", () => {
  test("imports from facade package → new imports use facade base", () => {
    const input = `
import { useMediaQuery } from '@company/ui-components'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx", { facadePackage: "@company/ui-components" });
    expect(output).toContain(`from '@company/ui-components/utils/match-media'`);
    expect(output).toContain(`from '@company/ui-components/utils/breakpoints'`);
    expect(output).not.toContain("@reapit/elements");
  });

  test("imports from facade subpath → base package extracted correctly", () => {
    const input = `
import { useMediaQuery } from '@company/design-system/deprecated/use-media-query'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx", { facadePackage: "@company/design-system" });
    expect(output).toContain(`from '@company/design-system/utils/match-media'`);
    expect(output).not.toContain("@reapit/elements");
  });

  test("no false positive on similar package name", () => {
    const input = `
import { useMediaQuery } from '@company/design-system-v2'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx", { facadePackage: "@company/design-system" });
    // @company/design-system-v2 should NOT match @company/design-system
    expect(output).toBe(input);
  });
});

describe("subpath import support", () => {
  test("@reapit/elements/deprecated/use-media-query → correctly detected and transformed", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements/deprecated/use-media-query'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("const isMobile = useMatchMedia(isWidthBelow('SM'))");
    expect(output).not.toContain("@reapit/elements/deprecated/use-media-query");
    expect(output).toContain(`from '@reapit/elements/utils/match-media'`);
  });

  test("@reapit/elements barrel import → correctly detected and transformed", () => {
    const input = `
import { useMediaQuery } from '@reapit/elements'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    expect(output).toContain("const isMobile = useMatchMedia(isWidthBelow('SM'))");
    expect(output).toContain(`from '@reapit/elements/utils/match-media'`);
  });
});

describe("generated imports use no trailing semicolons", () => {
  test("output imports do not end with semicolons when input had none", () => {
    const input = `import { useMediaQuery } from '@reapit/elements'
const { isMobile } = useMediaQuery()
`;
    const output = transform(input, "app.tsx");
    const importLines = output.split("\n").filter((line) => line.trimStart().startsWith("import "));
    for (const line of importLines) {
      expect(line.trimEnd()).not.toMatch(/;$/);
    }
  });
});
