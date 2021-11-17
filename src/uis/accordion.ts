import { twoDollars as $$ } from "twodollars";

import { observer } from "core";
import { times } from "utils/basic.util";

import type { AnkhUiAccordionOptions } from "types/ui.type";
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
    const { id, targets = 1 } = options;
    const $ui = $$.create("<section/>", { id, class: "ui-accordion" });

    times(targets)((i: number) => {
      const $details = $$.create("<div/>", {
        "data-placeholder": "true",
        id: `${id}-${i}`,
      });
      $ui.prepend($details);
    });

    observer.l({
      name: "ui-accordion-details-click",
      handler: ui.events.click,
    });

    return $ui;
  };

  return { init };
})();
