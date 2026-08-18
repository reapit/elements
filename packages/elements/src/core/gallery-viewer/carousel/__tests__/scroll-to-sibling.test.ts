import { scrollToSibling } from "../scroll-to-sibling";

afterEach(() => {
  document.body.innerHTML = "";
});

/**
 * Builds a minimal track element with two child items and appends it to the
 * document body so that `querySelector` works as it does in the browser.
 */
function createTrack(itemIds: string[]): HTMLElement {
  const track = document.createElement("div");
  for (const id of itemIds) {
    const item = document.createElement("div");
    item.id = id;
    track.appendChild(item);
  }
  document.body.appendChild(track);
  return track;
}

test('scrolls to the next sibling when direction is "next"', () => {
  const track = createTrack(["item-1", "item-2", "item-3"]);
  const item2 = track.querySelector("#item-2") as HTMLElement;
  const scrollIntoView = vi.fn();
  item2.scrollIntoView = scrollIntoView;

  const result = scrollToSibling(track, "item-1", "next");

  expect(result).toBe(true);
  expect(scrollIntoView).toHaveBeenCalledOnce();
});

test('scrolls to the previous sibling when direction is "previous"', () => {
  const track = createTrack(["item-1", "item-2", "item-3"]);
  const item1 = track.querySelector("#item-1") as HTMLElement;
  const scrollIntoView = vi.fn();
  item1.scrollIntoView = scrollIntoView;

  const result = scrollToSibling(track, "item-2", "previous");

  expect(result).toBe(true);
  expect(scrollIntoView).toHaveBeenCalledOnce();
});

test('calls scrollIntoView with block="nearest" and inline="start"', () => {
  const track = createTrack(["item-1", "item-2"]);
  const item2 = track.querySelector("#item-2") as HTMLElement;
  const scrollIntoView = vi.fn();
  item2.scrollIntoView = scrollIntoView;

  scrollToSibling(track, "item-1", "next");

  expect(scrollIntoView).toHaveBeenCalledWith(
    expect.objectContaining({ block: "nearest", inline: "start" }),
  );
});

test("uses smooth scroll behavior by default", () => {
  const track = createTrack(["item-1", "item-2"]);
  const item2 = track.querySelector("#item-2") as HTMLElement;
  const scrollIntoView = vi.fn();
  item2.scrollIntoView = scrollIntoView;

  scrollToSibling(track, "item-1", "next");

  expect(scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ behavior: "smooth" }));
});

test("uses instant scroll behavior when prefers-reduced-motion is active", () => {
  vi.spyOn(window, "matchMedia").mockReturnValue({
    matches: true,
  } as MediaQueryList);

  const track = createTrack(["item-1", "item-2"]);
  const item2 = track.querySelector("#item-2") as HTMLElement;
  const scrollIntoView = vi.fn();
  item2.scrollIntoView = scrollIntoView;

  scrollToSibling(track, "item-1", "next");

  expect(scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ behavior: "instant" }));

  vi.restoreAllMocks();
});

test("returns false when there is no next sibling", () => {
  const track = createTrack(["item-1", "item-2"]);

  const result = scrollToSibling(track, "item-2", "next");

  expect(result).toBe(false);
});

test("returns false when there is no previous sibling", () => {
  const track = createTrack(["item-1", "item-2"]);

  const result = scrollToSibling(track, "item-1", "previous");

  expect(result).toBe(false);
});

test("returns false when the active item id is not found in the track", () => {
  const track = createTrack(["item-1", "item-2"]);

  const result = scrollToSibling(track, "item-99", "next");

  expect(result).toBe(false);
});

test("does not call scrollIntoView when there is no sibling to scroll to", () => {
  const track = createTrack(["item-1", "item-2"]);
  const item2 = track.querySelector("#item-2") as HTMLElement;
  const scrollIntoView = vi.fn();
  item2.scrollIntoView = scrollIntoView;

  scrollToSibling(track, "item-2", "next");

  expect(scrollIntoView).not.toHaveBeenCalled();
});
