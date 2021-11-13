import "jest-canvas-mock";

import { accordion } from "uis/accordion";
import type { AnkhUiAccordionOptions } from "types/ui.type";
import { observer } from "core";

describe("🪗 UI accordion", () => {
  const detailsId = "testId";
  const options: AnkhUiAccordionOptions = {
    items: [
      { id: detailsId, items: ["cntId"], summary: { lang: "something" } },
    ],
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

  it(`🔥 [{click}] <details> adds 'open' attribute`, () => {
    const $ui = accordion.init(options);
    const $details = <HTMLDetailsElement>$ui.querySelector(`#${detailsId}`);

    $details.click();

    expect($details.getAttribute("open")).toBe("true");
  });
});
