import { twoDollars as $$ } from "twodollars";
import type { AnkhUiSitemapOptions } from "types/ui.type";

export const sitemap = (() => {
  return {
    init: (options: AnkhUiSitemapOptions) => {
      const { id } = options;
      const $ui = $$.create("<section/>", { id, class: "ui-sitemap" });

      return $ui;
    },
  };
})();
