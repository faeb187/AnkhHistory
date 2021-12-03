import { twoDollars as $$ } from "twodollars";

import { pieces } from "uis/chess/pieces/unicode";
import { startPosition } from "uis/chess";

import type { AnkhUiOptions } from "types/ui.type";
import type { Move, Position, Square } from "uis/chess";

export const chess = (() => {
  const $board = $$.create("<div/>", { class: "ui-chess-board" });
  const position = startPosition;
  let color = "dark";

  const ui = {
    renderPosition: (position: Position) => {
      position.forEach((square: Square, index: number) => {
        const $square = $$.find(`#ui-chess-board-square-${index}`, $board)[0];

        $square.innerHTML =
          square !== null
            ? `<span class='ui-chess-board-piece'>${pieces[square]}</span>`
            : "";
      });
    },
    toggleColor: () => {
      color = color === "dark" ? "light" : "dark";
    },
  };

  return {
    init: (options: AnkhUiOptions) => {
      const { id } = options;
      const $ui = $$.create("<section/>", { id, class: "ui-chess" });

      let squareId = 0;

      new Array(8)
        .fill("")
        .forEach(() => {
          ui.toggleColor();
          new Array(8)
            .fill("")
            .forEach(() => {
              $board.appendChild(
                $$.create("<div/>", {
                  class: `ui-chess-board-square ui-chess-board-square-${color}`,
                  id: `ui-chess-board-square-${squareId++}`,
                })
              );
              ui.toggleColor();
            });
        });

      ui.renderPosition(position);

      $ui.appendChild($board);

      return $ui;
    },
    renderMove: (move: Move) => {
      position[move[1]] = position[move[0]];
      position[move[0]] = null;
      ui.renderPosition(position);
    },
  };
})();
