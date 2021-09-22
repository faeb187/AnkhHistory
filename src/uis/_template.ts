/**
 * UI [uiName]
 */
import { $$ } from "../core";
import { AnkhUiOptions } from "types/ui.type";

export const uiName = (() => ({
  init: (options: AnkhUiOptions) => {
    const { id } = options;
    const $ui = $$("<[uiRoot]/>", { id, class: "ui-[uiName]" });
    //
    return $ui;
  },
}))();
