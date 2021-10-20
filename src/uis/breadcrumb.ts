import $$ from "twodollars";
import type { ObserverEvent } from "core/observer";

type AnkhUiBreadcrumb = { lang?: string };

type AnkhUiBreadcrumbOptions = {
  active: number;
  events: ObserverEvent[];
  id: string;
  items: AnkhUiBreadcrumb[];
  numbered: boolean;
  readonly: boolean;
  target: string;
};

type AnkhUiBreadcrumbUpdateOptions = {
  active: number;
  target: HTMLElement;
};

export const breadcrumb = (() => {
  const ui = {
    update: (options: AnkhUiBreadcrumbUpdateOptions) => {
      const { active = 0, target } = options;
      const $items = $$.find("a", target);
      const $active = $$.find(".active", target)[0];

      if ($active) $$.removeClass($active, "active");
      $$.addClass($items[active], "active");
    },

    getItem: (item: AnkhUiBreadcrumb) => {
      const { lang } = item;
      const $item = $$.create("<a/>");

      if (lang) $item.setAttribute("data-lang", lang);
      return $item;
    },
  };

  return {
    init: (options: AnkhUiBreadcrumbOptions) => {
      const {
        // active = 0,
        id,
        items,
        events = [],
        numbered,
        readonly,
      } = options;

      const $ui = $$.create("<nav/>", { id: id, class: "ui-breadcrumb" });

      if (numbered) $$.addClass($ui, "numbered");
      if (readonly) $$.addClass($ui, "readonly");

      items.forEach((item) => $ui.appendChild(ui.getItem(item)));

      const updateEvent: ObserverEvent = {
        args: { id },
        name: "ui-breadcrumb-update",
      };
      events.push(updateEvent);
      /*
      observer.l("ui-breadcrumb-update", (opts: { events: AnkhEvent[] }) => {
        opts.events.forEach((event: AnkhEvent) => {
          console.log("@todo");
        });
      });
      */
      return $ui;
    },
  };
})();
