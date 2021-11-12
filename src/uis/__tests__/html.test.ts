import { html } from "../html";
import type { AnyObject } from "../../types/basic.type";

describe("UI html", () => {
  const options = { ui: "html", id: "htmlTestId" };

  it("should init ", () => {
    const $ui = html.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(() => isHTMLElement($ui)).not.toThrow();
    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("htmlTestId");
  });
});
