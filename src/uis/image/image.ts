import { twoDollars as $$ } from "twodollars";
import type { AnkhUiImageOptions } from "types/ui.type";

export const image = (() => {
  const init = (options: AnkhUiImageOptions) => {
    const { attributes, id, lang } = options;
    const $ui = $$.create("<img/>", { id, "data-lang": lang, ...attributes });

    return $ui;
  };

  return { init };
})();
