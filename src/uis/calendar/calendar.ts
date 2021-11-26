import { twoDollars as $$ } from "twodollars";
import { AnkhUiOptions } from "types/ui.type";

export const calendar = (() => ({
  init: (options: AnkhUiOptions) => {
    const { id } = options;
    const $ui = $$.create("<section/>", { id, class: "ui-calendar" });

    const $days = $$.create("<div/>", { class: "ui-calendar-day" });

    $ui.appendChild($days);

    return $ui;
  },
}))();
