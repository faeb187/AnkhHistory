import { twoDollars as $$ } from "twodollars";

import type { AnkhUiIconOptions } from "types/ui.type";

export const icon = (() => {
  return {
    init: (options: AnkhUiIconOptions) => {
      const { id, icon, variant } = options;
      const iconVariant = variant ? `-${variant}` : "";
      const $ui = $$.create("<ion-icon/>", {
        id,
        class: "ui-icon",
        name: `${icon}${iconVariant}`,
      });
      return $ui;
    },
  };
})();
