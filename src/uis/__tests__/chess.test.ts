import { twoDollars as $$ } from "twodollars";

import { chess } from "uis";

import type { AnkhUiChessOptions } from "types/ui.type";
import type { Move } from "uis/chess";

describe("UI Chess", () => {
  const moves: Move[] = [[52, 36]]; // e4
  const options: AnkhUiChessOptions = { id: "chessTest", ui: "chess" };

  it("[init] returns correct HTMLElement", () => {
    const $ui = chess.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("chessTest");
  });

  it("[renderMove] 1 e4", () => {
    const $ui = chess.init(options);
    const $board = $$.find(".ui-chess-board", $ui)[0];

    moves.forEach((move: Move) => chess.renderMove(move, $board));

    const $e4 = $$.find("[data-index='36'] > span", $ui)[0];
    const $e2 = $$.find("[data-index='52']", $ui)[0];

    expect($e4.className).toBe("ui-chess-board-piece");
    expect($e2.innerHTML).toBeFalsy();
  });
});
