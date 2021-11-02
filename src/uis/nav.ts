import { twoDollars as $$ } from "twodollars";
import { observer } from "core";
import type { AnkhUiNavOptions } from "types/ui.type";

export const nav = (() => {
  const init = (options: AnkhUiNavOptions) => {
    const { id, items, attributes } = options;
    const $ui = $$.create("<nav/>", { id, class: "ui-nav" });

    attributes && $$.addAttr($ui, attributes);

    items.forEach((item) => {
      const { lang, path: href } = item;
      $ui.appendChild($$.create("<a/>", { href, "data-lang": lang }));
    });

    observer.l({
      name: "core-renderer-rendered",
      handler: () => {
        console.log($$.find(".ui-nav"));
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

    if ($activeBefore) $$.removeClass($activeBefore, "active");
    $$.addClass($activeNow, "active");
  };
  return { init, update };
})();
