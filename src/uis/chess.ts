import { twoDollars as $$ } from "twodollars";
import type { AnkhUiOptions } from "types/ui.type";

export const chess = (() => {
  let color = "dark";

  const ui = {
    toggleColor: () => {
      color = color === "dark" ? "light" : "dark";
    },
  };

  return {
    init: (options: AnkhUiOptions) => {
      const { id } = options;
      const $ui = $$.create("<section/>", { id, class: "ui-chess" });
      const $board = $$.create("<div/>", { class: "ui-chess-board" });

      new Array(8)
        .fill("")
        .forEach(() => {
          ui.toggleColor();
          new Array(8)
            .fill("")
            .forEach(() => {
              $board.appendChild(
                $$.create("<div/>", {
                  class: `ui-chess-board-square-${color}`,
                })
              );
              ui.toggleColor();
            });
        });

      $ui.appendChild($board);
      return $ui;
    },
  };
})();
