import { html } from "uis/html";

describe("UI html", () => {
  const options = { id: "htmlTest", ui: "html" };

  it("[init] returns correct HTMLElement", () => {
    const $ui = html.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(() => isHTMLElement($ui)).not.toThrow();
    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("htmlTest");
  });
});
