/**
 * UI [uiName]
 */
import { $$, observer } from "../core";

type UiOptions = {
  id: string;
};

export const uiName = (() => ({
  init: (options: UiOptions) => {
    const { id } = options;

    return $$("<[uiRoot]/>", { id, class: "ui-[uiName]" });
  },
}))();
