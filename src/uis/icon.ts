import { twoDollars as $$ } from "twodollars";

import type { AnkhUiIconOptions } from "types/ui.type";

export const icon = (() => {
  return {
    init: (options: AnkhUiIconOptions) => {
      const { id, icon, variant = "filled" } = options;
      const $ui = $$.create("<ion-icon/>", {
        id,
        class: "ui-icon",
        name: `${icon}-${variant}`,
      });
      return $ui;
    },
  };
})();
