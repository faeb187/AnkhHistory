import { grid } from "uis/grid";
import type { AnkhUiGridOptions } from "types/ui.type";

describe("UI button", () => {
  const options: AnkhUiGridOptions = { ui: "grid", id: "gridTest" };

  it("[init] returns correct HTMLElement", () => {
    const $ui = grid.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("gridTest");
  });
});
