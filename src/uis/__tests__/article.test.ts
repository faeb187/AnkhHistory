import { article } from "uis/article";
import type { AnkhUiArticleOptions } from "types/ui.type";

describe("UI article", () => {
  const author = { username: "altruism" };
  const code = { code: "hello('world');", lang: "typescript" };
  const createdAt = new Date();

  const options: AnkhUiArticleOptions = {
    id: "articleTest",
    paragraphs: [{ lang: "test" }, { ...code }],
    title: "test",
    ui: "article",
  };

  it("[init] returns correct HTMLElement", () => {
    const $ui = article.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("articleTest");
    expect($ui.querySelector("footer")).toBeNull();
  });

  it("[init] adds a <footer> when author|createdAt", () => {
    const $ui = article.init({ ...options, ...author, ...createdAt });
    expect($ui.querySelector("footer")).toBeDefined();
  });
});
