import { twoDollars as $$ } from "twodollars";
import { v4 as uuidv4 } from "uuid";

import { button, list } from "uis";

import type { AnkhUiFabOptions } from "types/ui.type";

export const fab = (() => ({
  init: (options: AnkhUiFabOptions) => {
    const { items, toggle } = options;
    const $ui = $$.create("<div/>", { class: "ui-fab" });
    const $button = button.init(toggle);
    const $list = list.init({ items, id: uuidv4(), ui: "list" });

    $ui.appendChild($button);
    $ui.appendChild($list);

    return $ui;
  },
}))();
