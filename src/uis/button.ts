// @todo omit 'classNames'

import { twoDollars as $$ } from "twodollars";
import { v4 as uuidv4 } from "uuid";

import { observer } from "core";
import { icon } from "uis";

import type { AnkhUiButtonOptions } from "types/ui.type";
import type { ObserverEvent } from "core/observer";

export const button = (() => {
  const init = (options: AnkhUiButtonOptions) => {
    const { classNames = "", events = [], icon: iconName, id, lang } = options;
    const $ui = $$.create("<button/>", {
      id,
      class: `ui-button ${classNames}`,
    });

    events.forEach((event: ObserverEvent) => observer.l(event));

    iconName &&
      $ui.appendChild(icon.init({ icon: iconName, id: uuidv4(), ui: "icon" }));
    lang && $ui.setAttribute("data-lang", lang);

    return $ui;
  };

  return { init };
})();
