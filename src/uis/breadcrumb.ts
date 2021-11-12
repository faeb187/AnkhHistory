import { twoDollars } from "twodollars";
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
      const $items = twoDollars.find("a", target);
      const $active = twoDollars.find(".active", target)[0];

      if ($active) twoDollars.removeClass($active, "active");
      twoDollars.addClass($items[active], "active");
    },

    getItem: (item: AnkhUiBreadcrumb) => {
      const { lang } = item;
      const $item = twoDollars.create("<a/>");

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

      const $ui = twoDollars.create("<nav/>", {
        id: id,
        class: "ui-breadcrumb",
      });

      if (numbered) twoDollars.addClass($ui, "numbered");
      if (readonly) twoDollars.addClass($ui, "readonly");

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
