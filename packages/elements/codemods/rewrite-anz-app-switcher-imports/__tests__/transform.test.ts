import { describe, test, expect } from "vitest";

import transform from "../transform";

const FROM = "@reapit/elements/core/app-switcher";
const TO = "@reapit/elements/core/app-switcher/anz";

describe("rewrite-anz-app-switcher-imports", () => {
  describe("no-op cases", () => {
    test("unchanged when no ANZ-specific symbols are present", () => {
      const source = `import { AppSwitcher } from '${FROM}'`;
      expect(transform(source)).toBe(source);
    });

    test("unchanged when import is already at the ANZ path", () => {
      const source = `import { AppSwitcher, SupportedProductId } from '${TO}'`;
      expect(transform(source)).toBe(source);
    });

    test("unchanged when source contains no app-switcher import", () => {
      const source = `const x: SupportedProductId = 'ireWeb'`;
      expect(transform(source)).toBe(source);
    });

    test("unchanged when AppSwitcher is imported but no ANZ member properties are used", () => {
      const source = [
        `import { AppSwitcher } from '${FROM}'`,
        `<AppSwitcher><AppSwitcher.MenuItem /></AppSwitcher>`,
      ].join("\n");
      expect(transform(source)).toBe(source);
    });
  });

  describe("SupportedProductId trigger", () => {
    test("rewrites specifier when SupportedProductId is imported", () => {
      const source = `import { AppSwitcher, SupportedProductId } from '${FROM}'`;
      const result = transform(source);
      expect(result).toContain(`from '${TO}'`);
      expect(result).not.toContain(`from '${FROM}'`);
    });

    test("preserves all import bindings when rewriting", () => {
      const source = `import { AppSwitcher, isProductAccessible, SupportedProductId } from '${FROM}'`;
      const result = transform(source);
      expect(result).toContain("AppSwitcher");
      expect(result).toContain("isProductAccessible");
      expect(result).toContain("SupportedProductId");
      expect(result).toContain(`from '${TO}'`);
    });

    test("rewrites type-only SupportedProductId import", () => {
      const source = `import type { SupportedProductId } from '${FROM}'`;
      const result = transform(source);
      expect(result).toContain(`from '${TO}'`);
      expect(result).not.toContain(`from '${FROM}'`);
    });

    test("rewrites specifier when ProductConfig is imported", () => {
      const source = `import type { ProductConfig } from '${FROM}'`;
      const result = transform(source);
      expect(result).toContain(`from '${TO}'`);
      expect(result).not.toContain(`from '${FROM}'`);
    });
  });

  describe("AppSwitcher member access trigger", () => {
    test("rewrites specifier when AppSwitcher.AppAvatar is used", () => {
      const source = [
        `import { AppSwitcher } from '${FROM}'`,
        `<AppSwitcher.AppAvatar productId="agentBox" hasAccess />`,
      ].join("\n");
      const result = transform(source);
      expect(result).toContain(`from '${TO}'`);
      expect(result).not.toContain(`from '${FROM}'`);
    });

    test("rewrites specifier when AppSwitcher.ProductMenuItem is used", () => {
      const source = [
        `import { AppSwitcher } from '${FROM}'`,
        `<AppSwitcher.ProductMenuItem productId="ireWeb" href="/lettings" />`,
      ].join("\n");
      const result = transform(source);
      expect(result).toContain(`from '${TO}'`);
      expect(result).not.toContain(`from '${FROM}'`);
    });

    test("resolves aliased AppSwitcher import for member access check", () => {
      const source = [
        `import { AppSwitcher as AS } from '${FROM}'`,
        `<AS.AppAvatar productId="agentBox" hasAccess />`,
      ].join("\n");
      const result = transform(source);
      expect(result).toContain(`from '${TO}'`);
    });

    test("no-op when AppSwitcher is aliased and the alias is not used with ANZ members", () => {
      const source = [
        `import { AppSwitcher as AS } from '${FROM}'`,
        `<AS.MenuItem appName="Foo" />`,
      ].join("\n");
      expect(transform(source)).toBe(source);
    });

    test("no-op when ANZ member access appears only in a comment", () => {
      const source = [
        `import { AppSwitcher } from '${FROM}'`,
        `// Use AppSwitcher.AppAvatar for product logos`,
        `<AppSwitcher.MenuItem appName="Foo" />`,
      ].join("\n");
      expect(transform(source)).toBe(source);
    });

    test("no-op when ANZ member access appears only in a string literal", () => {
      const source = [
        `import { AppSwitcher } from '${FROM}'`,
        `const msg = 'Use AppSwitcher.ProductMenuItem for ANZ products'`,
        `<AppSwitcher.MenuItem appName="Foo" />`,
      ].join("\n");
      expect(transform(source)).toBe(source);
    });

    test("rewrites specifier when AppSwitcher.getDisplayableProductsForYourAppsGroup is used", () => {
      const source = [
        `import { AppSwitcher } from '${FROM}'`,
        `const ids = AppSwitcher.getDisplayableProductsForYourAppsGroup(accessibleProductIds)`,
      ].join("\n");
      const result = transform(source);
      expect(result).toContain(`from '${TO}'`);
      expect(result).not.toContain(`from '${FROM}'`);
    });

    test("rewrites specifier when AppSwitcher.getDisplayableProductsForExploreGroup is used", () => {
      const source = [
        `import { AppSwitcher } from '${FROM}'`,
        `const ids = AppSwitcher.getDisplayableProductsForExploreGroup(accessibleProductIds)`,
      ].join("\n");
      const result = transform(source);
      expect(result).toContain(`from '${TO}'`);
      expect(result).not.toContain(`from '${FROM}'`);
    });
  });

  describe("other imports are unaffected", () => {
    test("does not rewrite non-app-switcher @reapit/elements imports", () => {
      const source = [
        `import { AppSwitcher, SupportedProductId } from '${FROM}'`,
        `import { Button } from '@reapit/elements/core/button'`,
      ].join("\n");
      const result = transform(source);
      expect(result).toContain(`from '${TO}'`);
      expect(result).toContain(`from '@reapit/elements/core/button'`);
    });
  });

  describe("facade package", () => {
    test("rewrites facade specifier when SupportedProductId is imported", () => {
      const source = `import { AppSwitcher, SupportedProductId } from '@company/ui/core/app-switcher'`;
      const result = transform(source, "file.tsx", { facadePackage: "@company/ui" });
      expect(result).toContain(`from '@company/ui/core/app-switcher/anz'`);
      expect(result).not.toContain(`from '@company/ui/core/app-switcher'`);
    });

    test("rewrites facade specifier when AppSwitcher.AppAvatar is used", () => {
      const source = [
        `import { AppSwitcher } from '@company/ui/core/app-switcher'`,
        `<AppSwitcher.AppAvatar productId="agentBox" hasAccess />`,
      ].join("\n");
      const result = transform(source, "file.tsx", { facadePackage: "@company/ui" });
      expect(result).toContain(`from '@company/ui/core/app-switcher/anz'`);
    });

    test("no-op for facade when no ANZ symbols present", () => {
      const source = `import { AppSwitcher } from '@company/ui/core/app-switcher'`;
      const result = transform(source, "file.tsx", { facadePackage: "@company/ui" });
      expect(result).toBe(source);
    });
  });
});
