import * as icons from "../all-icons";
import { ICON_KEBAB_NAMES } from "../all-icons";
import synonyms from "../icon-synonyms.json";

const synonymEntries = Object.entries(synonyms as Record<string, string[]>);
const iconExportNames = new Set(Object.keys(icons));

describe("icon-synonyms.json", () => {
  test.each(synonymEntries)("%s is a real exported icon", (iconName) => {
    expect(iconExportNames.has(iconName)).toBe(true);
  });

  test.each(synonymEntries)("%s has at least one synonym", (_, list) => {
    expect(list.length).toBeGreaterThan(0);
  });

  test.each(synonymEntries)(
    "%s synonyms are non-empty, unique, and not redundant",
    (iconName, list) => {
      const lowered = list.map((entry) => entry.toLowerCase());

      // No empty strings
      for (const entry of lowered) {
        expect(entry).not.toBe("");
      }

      // No duplicates within the list
      expect(new Set(lowered).size).toBe(lowered.length);

      // No synonym matches the icon's own name (substring of the name is fine —
      // e.g. `bedroom` for `BedIcon` is useful — but the full name itself is redundant
      // because the name is already part of the search haystack).
      const loweredName = iconName.toLowerCase();
      const loweredKebab = (ICON_KEBAB_NAMES[iconName] ?? "").toLowerCase();
      for (const entry of lowered) {
        expect(entry).not.toBe(loweredName);
        expect(entry).not.toBe(loweredKebab);
      }
    },
  );
});
