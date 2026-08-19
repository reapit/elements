import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: ["packages/elements/codemods/transforms.ts", ".changeset/pre.json"],
  printWidth: 100,
  semi: true,
  singleQuote: false,
  sortImports: {
    groups: [
      "builtin",
      "external",
      ["internal", "subpath"],
      ["parent", "sibling", "index"],
      "style",
      "unknown",
    ],
    internalPattern: ["#"],
  },
  sortPackageJson: true,
  tabWidth: 2,
  trailingComma: "all",
});
