/**
 * @todo don't export 'update', only the nav itself can update, provide an event instead
 */
import { twoDollars as $$ } from "twodollars";

import { observer } from "core";

import type { AnkhUiNavOptions } from "types/ui.type";

export const nav = (() => {
  const ui = {
    handleClick: (args: { event: MouseEvent }) => {
      console.log("clicked", args);
      const { event } = args;
      event.preventDefault();
      observer.f("core-site-load", { $ui: args.event.target });
    },
  };

  const init = (options: AnkhUiNavOptions) => {
    const { id, items, attributes } = options;
    const $ui = $$.create("<nav/>", { id, class: "ui-nav" });

    attributes && $$.addAttr($ui, attributes);

    items.forEach((item) => {
      const { lang, path } = item;
      const common = { "data-lang": lang };
      const attributes = path ? { ...common, href: path } : common;

      $ui.appendChild($$.create("<a/>", attributes));
    });

    observer
      .l({ name: "ui-nav-a-click", handler: ui.handleClick })
      .l({
        name: "core-renderer-rendered",
        handler: () => {
          $$.find(".ui-nav").forEach(($nav) => nav.update($nav));
        },
      });
    return $ui;
  };
  const update = ($ui: HTMLElement) => {
    const level = parseInt($ui.getAttribute("data-level") || "0");
    const $activeBefore = $$.find(".active", $ui)[0];
    const active = location.pathname.slice(1).split("/")[level];
    const $activeNow = $$.find(`[href*='/${active}']`, $ui)[0];

    $activeBefore && $$.removeClass($activeBefore, "active");
    $activeNow && $$.addClass($activeNow, "active");
  };
  return { init, update };
})();
