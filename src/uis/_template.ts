import { twoDollars } from "twodollars";
import { AnkhUiOptions } from "types/ui.type";

export const uiName = (() => ({
  init: (options: AnkhUiOptions) => {
    const { id } = options;
    const $ui = twoDollars.create("<[uiRoot]/>", { id, class: "ui-[uiName]" });

    return $ui;
  },
}))();
