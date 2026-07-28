import type { MutableRefObject } from "react";

import { createIntersectionCallback } from "../create-intersection-callback";

afterEach(() => {
  document.body.innerHTML = "";
});

function createContainer(...ids: string[]): HTMLElement {
  const container = document.createElement("div");
  for (const id of ids) {
    const item = document.createElement("div");
    item.id = id;
    container.appendChild(item);
  }
  document.body.appendChild(container);
  return container;
}

function makeEntry(
  target: Element,
  intersectionRatio: number,
  isIntersecting = true,
): IntersectionObserverEntry {
  return { target, isIntersecting, intersectionRatio } as unknown as IntersectionObserverEntry;
}

function makeRefs(overrides?: { activeItemId?: string }) {
  const activeItemRef: MutableRefObject<string | undefined> = { current: overrides?.activeItemId };
  return { activeItemRef };
}

test("removes inert from the item that enters view", () => {
  const container = createContainer("item-1", "item-2");
  const [item1, item2] = Array.from(container.children) as HTMLElement[];
  item1.inert = true;
  item2.inert = true;

  const { activeItemRef } = makeRefs();
  const callback = createIntersectionCallback({ container, activeItemRef });

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver);

  expect(item2).not.toHaveAttribute("inert");
});

test("adds inert to all items not in view", () => {
  const container = createContainer("item-1", "item-2", "item-3");
  const [item1, , item3] = Array.from(container.children) as HTMLElement[];
  const item2 = container.children[1] as HTMLElement;

  const { activeItemRef } = makeRefs();
  const callback = createIntersectionCallback({ container, activeItemRef });

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver);

  expect(item1).toHaveAttribute("inert");
  expect(item3).toHaveAttribute("inert");
});

test("does not update activeItemRef when intersectionRatio is below 0.5", () => {
  const container = createContainer("item-1");
  const [item1] = Array.from(container.children) as HTMLElement[];

  const { activeItemRef } = makeRefs({ activeItemId: "item-1" });
  const callback = createIntersectionCallback({ container, activeItemRef });

  callback([makeEntry(item1, 0.4)], {} as IntersectionObserver);

  expect(activeItemRef.current).toBe("item-1");
});

test("updates activeItemRef to the newly visible item id", () => {
  const container = createContainer("item-1", "item-2");
  const item2 = container.children[1] as HTMLElement;

  const { activeItemRef } = makeRefs({ activeItemId: "item-1" });
  const callback = createIntersectionCallback({ container, activeItemRef });

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver);

  expect(activeItemRef.current).toBe("item-2");
});

test("sets activeItemRef on initial observation even when no previous item is known", () => {
  const container = createContainer("item-1");
  const [item1] = Array.from(container.children) as HTMLElement[];

  const { activeItemRef } = makeRefs();
  const callback = createIntersectionCallback({ container, activeItemRef });

  callback([makeEntry(item1, 0.6)], {} as IntersectionObserver);

  expect(activeItemRef.current).toBe("item-1");
});

test("updates activeItemRef for intermediate items during a scroll", () => {
  const container = createContainer("item-1", "item-2", "item-4");
  const item2 = container.children[1] as HTMLElement;

  const { activeItemRef } = makeRefs({ activeItemId: "item-1" });
  const callback = createIntersectionCallback({ container, activeItemRef });

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver);

  expect(activeItemRef.current).toBe("item-2");
});

test("manages inert correctly for intermediate items during a scroll", () => {
  const container = createContainer("item-1", "item-2", "item-3");
  const [item1, item2, item3] = Array.from(container.children) as HTMLElement[];

  const { activeItemRef } = makeRefs({ activeItemId: "item-1" });
  const callback = createIntersectionCallback({ container, activeItemRef });

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver);

  expect(item2).not.toHaveAttribute("inert");
  expect(item1).toHaveAttribute("inert");
  expect(item3).toHaveAttribute("inert");
});
