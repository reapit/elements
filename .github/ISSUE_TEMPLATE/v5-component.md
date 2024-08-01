---
name: v5 Component
about: Create or refactor component for Elements v5 release
title: 'v5 component refactor: '
labels: v5, feature
assignees: ''

---

**Abstract**

_As part of the v5 Elements release, each component will be reviewed and refactored to ensure best practice and design system alignment_

**Specification**

- Is new component or existing?
- Is the component being re-named?
- Is the component design signed off by product and design?
- [Guide to component structure & documentation in storybook](https://github.com/reapit/elements/wiki/Developer-Contribution-Guide)
- [Link to DS in Figma]()
- [Link to Elements Audit in Figma]()
- [Additional behavioural specification]()
- [Accessibility requirements]()
- [Link to Design Guidelines]()

**Developer Checklist**

- [ ] Styles alignment between Design System and Elements
- [ ] Check design tokens in Figma and implement CSS variable tokens if available for relevant component
- [ ] Align with accessibility standards / spec as per above
- [ ] If relevant, break down component into `Styles Only` and `React` component structures
- [ ] Ensure all variants of components are documented as appropriate 
- [ ] Ensure unit test coverage is adequate for component
- [ ] Update documentation in MDX file as per guidelines
- [ ] Changelog updated to reflect a single beta version per component ideally

**Release Checklist**

- [ ] Approved PR merged to main
- [ ] Design & product review and feedback addressed by developer
- [ ] Beta release by product / engineering lead to next beta version

**Additional Context or Information**

