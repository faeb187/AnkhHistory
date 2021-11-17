import { twoDollars as $$ } from "twodollars";
import { v4 as uuidv4 } from "uuid";

import { icon } from "uis";

import type { AnkhUiButtonOptions } from "types/ui.type";

export const button = (() => {
  const init = (options: AnkhUiButtonOptions) => {
    const { classNames = "", icon: iconName, id, lang } = options;
    const $ui = $$.create("<button/>", {
      id,
      class: `ui-button ${classNames}`,
    });

    iconName &&
      $ui.appendChild(icon.init({ icon: iconName, id: uuidv4(), ui: "icon" }));
    lang && $ui.setAttribute("data-lang", lang);

    return $ui;
  };

  return { init };
})();
