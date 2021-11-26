import { twoDollars as $$ } from "twodollars";

import { observer } from "core";
import type { AnkhUiOverlayOptions } from "types/ui.type";

export const overlay = (() => {
  const ui = {
    create: (id: string) => {
      const $ui = $$.create("<div/>", {
        "data-fx": "out",
        id,
        class: "ui-overlay",
      });

      $ui.innerHTML = `
          <div id="ui-overlay-back-${id}" class="ui-overlay-back"></div>
          <div id="ui-overlay-front-${id}" class="ui-overlay-front"></div>`;

      return $ui;
    },
    get: (id: string) => $$.find(`#${id}`)[0],
    hide: (args: { event: MouseEvent; id: string }) => {
      const { event, id } = args;
      event.stopPropagation();
      ui.get(id).setAttribute("data-fx", "out");
    },
    show: (args: { event: MouseEvent; id: string }) => {
      const { event, id } = args;
      event.stopPropagation();
      ui.get(id).setAttribute("data-fx", "in");
    },
  };

  const init = (options: AnkhUiOverlayOptions) => {
    const { id } = options;

    observer.l({ name: `ui-overlay-hide-${id}`, handler: ui.hide });
    observer.l({ name: `ui-overlay-show-${id}`, handler: ui.show });

    return ui.create(id);
  };

  return { init };
})();
