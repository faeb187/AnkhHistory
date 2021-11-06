/**
 * @desc there is only one UI context, which handles everything
 * @desc ...don't try to init a new one for each menu
 *
 * @todo update markup asap > caniuse.com: <menu>
 * @todo prevent multi init() for this UI
 * @todo only load matrix at the beginning (if no rightclick, why load?)
 * @todo support ESC to hide()
 * @todo what about mobile?
 */
import { twoDollars as $$ } from "twodollars";
import { v4 as uuidv4 } from "uuid";

import { observer } from "core";
import { nav } from "uis/nav";

import type { AnyObject, Position } from "types/basic.type";
import type { AnkhUiContextOptions } from "types/ui.type";

export const context = (() => {
  const ui = {
    hide: () => {
      window.removeEventListener("click", ui.hide);

      $$.find(".ui-context")[0].style.display = "none";
    },
    show: () => {
      const $ui = $$.find(".ui-context")[0];

      $ui.style.display = "block";

      window.addEventListener("click", ui.hide);
    },
    updatePosition: ({ x, y }: Position) => {
      const $ui = $$.find(".ui-context")[0];

      $$.css($ui, { left: `${x}px`, top: `${y}px` }).addClass($ui, "active");

      return ui;
    },
  };

  return {
    init: (options: AnkhUiContextOptions) => {
      const { id, menus } = options;
      const $ui = $$.create("<div/>", { id, class: "ui-context" });

      menus.forEach((menu) =>
        $ui.appendChild(nav.init({ ...menu, id: uuidv4(), ui: "nav" }))
      );

      observer.l({
        name: "ui-context-show",
        handler: (args: AnyObject & { event: MouseEvent }) => {
          const {
            event,
            event: { clientX: x, clientY: y },
          } = args;
          event.preventDefault();

          ui.updatePosition({ x, y }).show();
        },
      });

      observer.l({
        name: "core-renderer-rendered",
        handler: () =>
          menus.forEach((menu) =>
            menu.events.forEach((event) => observer.l(event))
          ),
      });
      return $ui;
    },
  };
})();
