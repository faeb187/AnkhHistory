import { carousel } from "uis";
import type { AnkhUiCarouselOptions } from "types/ui.type";

describe("🎠 Carousel", () => {
  const options: AnkhUiCarouselOptions = {
    id: "carouselTest",
    items: [],
    ui: "carousel",
  };

  it("[init] returns correct HTMLElement", () => {
    const $ui = carousel.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("carouselTest");
    expect($ui.querySelector("footer")).toBeNull();
  });
});
