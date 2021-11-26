import { chess } from "uis";
import type { AnkhUiChessOptions } from "types/ui.type";

describe("UI Chess", () => {
  const options: AnkhUiChessOptions = {
    id: "chessTest",
    ui: "chess",
  };

  it("[init] returns correct HTMLElement", () => {
    const $ui = chess.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("chessTest");
  });
});
