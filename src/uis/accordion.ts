import { twoDollars as $$ } from "twodollars";
import { v4 as uuidv4 } from "uuid";

import { details } from "uis";

import type { AnkhUiAccordionOptions } from "types/ui.type";

export const accordion = (() => ({
  init: (options: AnkhUiAccordionOptions) => {
    const { id, items } = options;
    const $ui = $$.create("<section/>", { id, class: "ui-accordion" });

    items.forEach((item) => {
      console.log("item:", item);
      $ui.appendChild(details.init({ id: uuidv4(), ui: "details", ...item }));
    });

    return $ui;
  },
}))();
