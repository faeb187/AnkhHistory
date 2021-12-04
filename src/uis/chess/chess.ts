import { twoDollars as $$ } from "twodollars";

import { logger, observer } from "core";
import { pieces } from "uis/chess/pieces/unicode";
import { startPosition } from "uis/chess";

import type { AnkhUiOptions } from "types/ui.type";
import type { Move, Square } from "uis/chess";

export const chess = (() => {
  const position = startPosition;
  let color = "dark";

  const ui = {
    events: {
      dragstart: (args: { event: DragEvent }) => {
        const { event } = args;
        const $target = <HTMLElement>event.target;
        const $startSquare = <HTMLElement>$target.parentNode;

        (<DataTransfer>event.dataTransfer).setData(
          "startSquare",
          <string>$startSquare.getAttribute("data-index")
        );
      },
      drop: (args: { event: DragEvent; $elm: HTMLElement }) => {
        const { event } = args;
        const $target = <HTMLElement>event.target;

        logger.warn("DROP TARGET.", $target);
        const moveStart = parseInt(
          (<DataTransfer>event.dataTransfer).getData("startSquare")
        );
        const moveTarget = parseInt(<string>$target.getAttribute("data-index"));
        const $board = $$.parent($target, ".ui-chess-board");

        ui.renderMove([moveStart, moveTarget], $board);
      },
    },
    renderMove: (move: Move, $board: HTMLElement) => {
      console.log("Position/Move", position, move);
      position[move[1]] = position[move[0]];
      position[move[0]] = null;

      const $targetSquare = $$.find(`[data-index='${move[1]}']`, $board)[0];

      /*while ($targetSquare.firstChild)
        $targetSquare.removeChild($targetSquare.firstChild);*/

      const $startSquare = $$.find(
        `[data-index='${move[0]}'] > .ui-chess-board-piece`,
        $board
      )[0];
      $targetSquare.appendChild($startSquare);
    },
    renderPosition: ($board: HTMLElement) => {
      position.forEach((square: Square, index: number) => {
        const $square = $$.find(`[data-index='${index}']`, $board)[0];

        $square.innerHTML =
          square === null
            ? ""
            : `<span draggable='true' class='ui-chess-board-piece'>${pieces[square]}</span>`;
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
      const $board = $$.create("<div/>", { class: "ui-chess-board" });

      let index = 0;

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
                  "data-index": (index++).toString(),
                })
              );
              ui.toggleColor();
            });
        });

      observer.l({
        name: "ui-chess-board-piece-dragstart",
        handler: ui.events.dragstart,
      });
      observer.l({ name: "ui-chess-board-drop", handler: ui.events.drop });

      ui.renderPosition($board);

      $ui.appendChild($board);

      return $ui;
    },
    renderMove: ui.renderMove,
  };
})();
