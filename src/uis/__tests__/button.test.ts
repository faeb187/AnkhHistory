import "jest-canvas-mock";

import { button } from "uis/button";
import type { AnkhUiButtonOptions } from "types/ui.type";

describe("UI button", () => {
  const options: AnkhUiButtonOptions = { ui: "button", id: "buttonTest" };

  it("[init] returns correct HTMLElement", () => {
    const $ui = button.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("buttonTest");
  });
});
