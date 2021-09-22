/**
 * UI breadcrumb
 */
import { $$, observer } from "core";

type AnkhUiBreadcrumb = { lang?: string };

type AnkhUiBreadcrumbOptions = {
  active: number;
  events: any;
  id: string;
  items: AnkhUiBreadcrumb[];
  numbered: boolean;
  readonly: boolean;
  $target: HTMLElement;
};

type AnkhUiBreadcrumbUpdateOptions = {
  active: number;
  $target: HTMLElement;
};

export const breadcrumb = (() => {
  const ui = {
    update: (options: AnkhUiBreadcrumbUpdateOptions) => {
      const { active = 0, $target } = options;
      const $items = $$.find("a", $target);
      const $active = $$.find(".active", $target)[0];

      if ($active) $$.removeClass($active, "active");
      $$.addClass($items[active], "active");
    },

    getItem: (item: AnkhUiBreadcrumb) => {
      const { lang } = item;
      const $item = $$("<a/>");

      if (lang) $item.setAttribute("data-lang", lang);
      return $item;
    },
  };

  return {
    init: (options: AnkhUiBreadcrumbOptions) => {
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

      observer.l("ui-breadcrumb-update", (opts: any) => {
        opts.events.ui.forEach((uiEvent: any) => {
          ui.update({ $target: uiEvent.$target, active: options.active });
        });
      });
      return $ui;
    },
  };
})();
