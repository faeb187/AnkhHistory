import { html } from "uis";
import type { AnkhUiHtmlOptions } from "types/ui.type";

describe("UI html", () => {
  const options: AnkhUiHtmlOptions = { id: "htmlTest", ui: "html" };

  it("[init] returns correct HTMLElement", () => {
    const $ui = html.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(() => isHTMLElement($ui)).not.toThrow();
    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("htmlTest");
  });
});
