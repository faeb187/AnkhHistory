import { twoDollars as $$ } from "twodollars";
import { v4 as uuidv4 } from "uuid";

import { logger, observer } from "core";
import { details } from "uis";

import type { AnkhUiAccordionOptions, AnkhUiDetailsItem } from "types/ui.type";
import type { AnyObject } from "types/basic.type";

export const accordion = (() => {
  const ui = {
    events: {
      click: (args: AnyObject & { event: MouseEvent }) => {
        const { event } = args;
        const $details = event.currentTarget;

        event.preventDefault();

        ui.closeAll($$.parent(<HTMLElement>$details, ".ui-accordion"));
        ui.open(<HTMLDetailsElement>$details);
      },
    },
    closeAll: ($ui: HTMLElement) => {
      $$.find("[open]", $ui).forEach(($elm) => $elm.removeAttribute("open"));
    },
    open: ($details: HTMLDetailsElement) => {
      $details.setAttribute("open", "true");
    },
  };

  const init = (options: AnkhUiAccordionOptions) => {
    const { id, items } = options;
    const $ui = $$.create("<section/>", { id, class: "ui-accordion" });

    items.forEach((item: AnkhUiDetailsItem) => {
      const $details = details.init({ id: uuidv4(), ui: "details", ...item });

      observer.l({
        bind: { target: $details, type: "click" },
        name: `ui-accordion-details-${$details.id}-click`,
        handler: ui.events.click,
      });
      $ui.appendChild($details);
    });

    return $ui;
  };

  return { init };
})();
