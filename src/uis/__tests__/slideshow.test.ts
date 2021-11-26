import { slideshow } from "uis";
import type { AnkhUiSlideshowOptions } from "types/ui.type";

describe("UI Slideshow", () => {
  const options: AnkhUiSlideshowOptions = {
    id: "slideshowTest",
    items: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(() => ({
      alt: "Kitten",
      src: "https://placekitten.com/180/105",
      text: "txt-kitten",
      title: "kitten",
    })),
    parentId: "compounds-slideshow",
    ui: "slideshow",
  };

  it("[init] returns correct HTMLElement", () => {
    const $ui = slideshow.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(() => isHTMLElement($ui)).not.toThrow();
    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("slideshowTest");
  });
});
