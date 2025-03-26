## Explain how Playwright Detects Legit Visual Test Failures

### 1. Baseline Snapshot (Golden Image)

When a visual test runs, Playwright:

- Loads all components in the browser (via Storybook).
- Takes a screenshot.
- Compares that screenshot to the existing one saved in:

```
.visual-test/spec/snaps/<story-id>.png
```

---

### 2. Pixel-by-Pixel Comparison

Playwright checks:

- Are the new screenshot and the saved one **identical**?
- Or are they **different beyond the allowed threshold**?

This is defined in the test configuration:

```ts
expect(screenshot).toMatchSnapshot(`${meta.title}.png`, {
  maxDiffPixels: 10, // If more than 10 pixels differ, the test will fail.
})
```

---

### 💥 When Does a Test Fail?
#### Legit Failure Example:
- You change the component’s layout, font, or colors.
- The resulting screenshot is **visibly different**.
- More than 10 pixels changed → ❌ Test fails.
- You review the report and confirm the changes were intentional.
- Then you run the following command to update the baseline:

```bash
yarn playwright test --update-snapshots
```

---

### ❌ Not a Legit Failure: It may be Flaky or False Positives

Sometimes a test fails for non-critical or random reasons. Common causes and fixes:

| Cause                          | Fix                                                                      |
|--------------------------------|--------------------------------------------------------------------------|
| Random images (e.g. avatars)   | Add to `flakey-test-list.ts` or maybe we use static mock images          |
| Date/time rendering            | Stub or replace with fixed test data                                     |
| Animations                     | Disable animations or use `page.waitForTimeout(...)`                     |
| Portals (e.g. modals/tooltips) | Add to `flakey-test-list.tst`, or test with an adjusted rendering method |
