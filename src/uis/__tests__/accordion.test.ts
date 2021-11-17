import "jest-canvas-mock";

import { accordion } from "uis/accordion";
import type { AnkhUiAccordionOptions } from "types/ui.type";

describe("🪗 UI accordion", () => {
  const options: AnkhUiAccordionOptions = {
    ui: "accordion",
    id: "accordionTest",
  };

  it("[init] returns correct HTMLElement", () => {
    const $ui = accordion.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("accordionTest");
  });
});
