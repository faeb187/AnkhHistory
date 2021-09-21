/**
 * UI breadcrumb
 */
import { $$, observer } from "core";

import type { ObserverCoreBreadcrumbUpdateOptions } from "types/observer.type";

type UiBreadCrumbItem = {
  lang?: string; // lang reference of innerText
};

type UiBreadcrumbOptions = {
  active?: number; // index of active item (default: 0)
  events?: any;
  id: string;
  items: UiBreadCrumbItem[];
  numbered: boolean; // items are numbered
  readonly: boolean; // no click events
  $target: HTMLElement;
};

type UiBreadcrumbUpdateOptions = {
  active?: number;
  $target: HTMLElement;
};

export const breadcrumb = (() => {
  const ui = {
    update: (options: UiBreadcrumbUpdateOptions) => {
      const { active = 0, $target } = options;
      const $items = $$.find("a", $target);
      const $active = $$.find(".active", $target)[0];

      if ($active) $$.removeClass($active, "active");
      $$.addClass($items[active], "active");
    },

    getItem: (item: UiBreadCrumbItem) => {
      const { lang } = item;
      const $item = $$("<a/>");

      if (lang) $item.setAttribute("data-lang", lang);
      return $item;
    },
  };

  return {
    init: (options: UiBreadcrumbOptions) => {
      const {
        active = 0,
        id,
        items,
        events,
        numbered,
        readonly,
        $target,
      } = options;
      // if !id or !items?.length or !$target then return
      const $ui = $$("<nav/>", { id: id, class: "ui-breadcrumb" });

      if (numbered) $$.addClass($ui, "numbered");
      if (readonly) $$.addClass($ui, "readonly");

      items.forEach((item) => $ui.appendChild(ui.getItem(item)));

      const updateEvent = { name: "ui-breadcrumb-update", target: id };
      if (!events) options.events = {};
      options.events.ui = [updateEvent];

      observer.l(
        "ui-breadcrumb-update",
        (opts: ObserverCoreBreadcrumbUpdateOptions) => {
          opts.events.ui.forEach((uiEvent) => {
            ui.update({ $target: uiEvent.$target, active: options.active });
          });
        }
      );
      return $ui;
    },
  };
})();
