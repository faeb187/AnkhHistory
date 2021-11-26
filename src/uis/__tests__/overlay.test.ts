import { overlay } from "uis";
import type { AnkhUiOverlayOptions } from "types/ui.type";

describe("UI Overlay", () => {
  const options: AnkhUiOverlayOptions = {
    id: "overlayTest",
    parentId: "elements-overlay",
    ui: "overlay",
  };

  it("[init] returns correct HTMLElement", () => {
    const $ui = overlay.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(() => isHTMLElement($ui)).not.toThrow();
    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("overlayTest");
  });
});
