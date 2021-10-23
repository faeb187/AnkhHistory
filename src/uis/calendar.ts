import { twoDollars } from "twodollars";
import { AnkhUiOptions } from "types/ui.type";

export const calendar = (() => ({
  init: (options: AnkhUiOptions) => {
    const { id } = options;
    const $ui = twoDollars.create("<[uiRoot]/>", { id, class: "ui-calendar" });

    // connect to Google API

    return $ui;
  },
}))();
