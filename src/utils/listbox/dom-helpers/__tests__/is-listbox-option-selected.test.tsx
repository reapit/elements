import { render, screen } from "@testing-library/react";

import { isListboxOptionSelected } from "../is-listbox-option-selected";

test('returns true when ariaChecked is "true"', () => {
  render(<button>Option</button>);
  const button = screen.getByRole("button") as HTMLButtonElement;
  // NOTE: We have to manually set this property because HappyDOM doesn't
  // automatically assign it based on the aria-checked attribute
  button.ariaChecked = "true";

  expect(isListboxOptionSelected(button)).toBe(true);
});

test('returns true when ariaSelected is "true"', () => {
  render(<button>Option</button>);
  const button = screen.getByRole("button") as HTMLButtonElement;
  // NOTE: We have to manually set this property because HappyDOM doesn't
  // automatically assign it based on the aria-checked attribute
  button.ariaSelected = "true";

  expect(isListboxOptionSelected(button)).toBe(true);
});

test('returns false when ariaChecked is "false"', () => {
  render(<button>Option</button>);

  const button = screen.getByRole("button") as HTMLButtonElement;
  // NOTE: We have to manually set this property because HappyDOM doesn't
  // automatically assign it based on the aria-checked attribute
  button.ariaChecked = "false";

  expect(isListboxOptionSelected(button)).toBe(false);
});

test('returns false when ariaSelected is "false"', () => {
  render(<button>Option</button>);

  const button = screen.getByRole("button") as HTMLButtonElement;
  // NOTE: We have to manually set this property because HappyDOM doesn't
  // automatically assign it based on the aria-selected attribute
  button.ariaSelected = "false";

  expect(isListboxOptionSelected(button)).toBe(false);
});

test('returns false when both ariaChecked and ariaSelected are "false"', () => {
  render(<button>Option</button>);
  const button = screen.getByRole("button") as HTMLButtonElement;
  // NOTE: We have to manually set these properties because HappyDOM doesn't
  // automatically assign them based on the aria-checked and aria-selected attributes
  button.ariaChecked = "false";
  button.ariaSelected = "false";

  expect(isListboxOptionSelected(button)).toBe(false);
});

test("returns false when neither ariaChecked nor ariaSelected are set", () => {
  render(<button>Option</button>);
  const button = screen.getByRole("button") as HTMLButtonElement;
  expect(isListboxOptionSelected(button)).toBe(false);
});

test('returns false when ariaChecked is "mixed"', () => {
  render(<button>Option</button>);
  const button = screen.getByRole("button") as HTMLButtonElement;
  // NOTE: We have to manually set this property because HappyDOM doesn't
  // automatically assign it based on the aria-checked attribute
  button.ariaChecked = "mixed";

  expect(isListboxOptionSelected(button)).toBe(false);
});

test('returns true when ariaChecked is "true" and ariaSelected is "false"', () => {
  render(<button>Option</button>);

  const button = screen.getByRole("button") as HTMLButtonElement;
  // NOTE: We have to manually set these properties because HappyDOM doesn't
  // automatically assign them based on the aria-checked attribute
  button.ariaChecked = "true";
  button.ariaSelected = "false";

  expect(isListboxOptionSelected(button)).toBe(true);
});

test('returns true when ariaChecked is "false" and ariaSelected is "true"', () => {
  render(<button>Option</button>);

  const button = screen.getByRole("button") as HTMLButtonElement;
  // NOTE: We have to manually set these properties because HappyDOM doesn't
  // automatically assign them based on the aria-checked attribute
  button.ariaChecked = "false";
  button.ariaSelected = "true";

  expect(isListboxOptionSelected(button)).toBe(true);
});
