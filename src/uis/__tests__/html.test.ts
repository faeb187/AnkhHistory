import { html } from "uis/html";

describe("UI html", () => {
  const options = { ui: "html", id: "id" };
  it("should", () => {
    const $ui = html.init(options);
    expect(typeof $ui).toBe(HTMLElement);
  });
});
