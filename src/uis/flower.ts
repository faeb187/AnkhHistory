import { twoDollars as $$ } from "twodollars";
import type { AnkhUiOptions } from "types/ui.type";

export const flower = (() => ({
  init: (options: AnkhUiOptions) => {
    const { id } = options;
    const $ui = $$.create("<section/>", { id, class: "ui-flower" });
    const ids = [
      "m",
      "n-n",
      "n-ne",
      "n-se",
      "n-s",
      "n-sw",
      "n-nw",
      "o-n",
      "o-ne1",
      "o-ne2",
      "o-nw1",
      "o-nw2",
      "o-s",
      "o-se1",
      "o-se2",
      "o-sw1",
      "o-sw2",
      "o-w",
      "o-e",
    ];
    ids.forEach((id: string) => {
      $ui.appendChild($$.create("<div/>", { id }));
    });
    return $ui;
  },
}))();
