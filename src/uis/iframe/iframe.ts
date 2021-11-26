import { twoDollars as $$ } from "twodollars";
import type { AnkhUiIFrameOptions } from "types/ui.type";

export const iframe = (() => ({
  init: (options: AnkhUiIFrameOptions) => {
    const { id, src } = options;

    const $ui = $$.create("<iframe/>", { id, src, class: "ui-iframe" });
    return $ui;
  },
}))();
