import { image } from "uis";
import type { AnkhUiImageOptions } from "types/ui.type";

describe("UI image", () => {
  const options: AnkhUiImageOptions = {
    attributes: { src: "https://placekitten.com/100/150" },
    id: "imageTest",
    lang: "{altTextPlaceholder}",
    ui: "image",
  };

  it("[init] returns correct HTMLElement", () => {
    const $ui = image.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("imageTest");
  });
});
