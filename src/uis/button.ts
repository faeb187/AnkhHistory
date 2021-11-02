// @todo omit 'classNames'

import { twoDollars as $$ } from "twodollars";

import { observer } from "core";

import type { AnkhUiButtonOptions } from "types/ui.type";
import type { ObserverEvent } from "core/observer";

export const button = (() => {
  const init = (options: AnkhUiButtonOptions) => {
    const { classNames = "", events = [], icon, id, lang } = options;
    const $ui = $$.create("<button/>", {
      id,
      class: `ui-button ${classNames}`,
    });

    events.forEach((event: ObserverEvent) => observer.l(event));

    icon
      ? $ui.appendChild($$.create("<i/>", { class: icon }))
      : $ui.setAttribute("data-lang", lang);

    return $ui;
  };

  return { init };
})();
