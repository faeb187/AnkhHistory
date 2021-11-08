import { twoDollars as $$ } from "twodollars";
import { v4 as uuidv4 } from "uuid";

import { observer } from "core";
import { icon } from "uis";

import type { AnyObject } from "types/basic.type";
import type { AnkhUiListItem, AnkhUiListOptions } from "types/ui.type";

export const list = (() => {
  const ui = {
    update: (args: AnyObject) => {
      // const { event } = args;
      console.log("list-update", args);
      /*
        const $actBefore = $$.find(".active", $target)[0];

        $actBefore && $$.removeClass($actBefore, "active");

        const pth = location.pathname;
        const $actLi = $$.find("[href='#{pth}']", $target)[0].parentNode;

        $$.addClass($actLi, "active");

        const $parentUl = $actLi.parentNode;

        if($$.hasClass($parentUl, "ui-list"))return;
        if($$.hasClass($parentUl.parentNode, "ui-list") return;

        const $parentLi = $$.parent($actLi, "li");
        $$.addClass($parentLi, "active");
        */
    },
    addListItem: (item: AnkhUiListItem, $ul: HTMLElement) => {
      const {
        attributes = {},
        icon: iconName,
        id,
        items: subItms,
        lang,
      } = item;
      const $li = $$.create("<li/>", { id });
      let $a, $span;

      if (attributes.href) {
        $a = $$.create("<a/>");
        if (iconName) {
          $span = $$.create("<span/>", { "data-lang": lang });
          $a.appendChild($span);
        } else $a.setAttribute("data-lang", lang);
      } else {
        $span = $$.create("<span/>", { "data-lang": lang });
      }

      iconName &&
        ($a || $li).prepend(
          icon.init({ icon: iconName, id: uuidv4(), ui: "icon" })
        );

      if (subItms) {
        const $subUl = <HTMLUListElement>$$.create("<ul/>");

        subItms.forEach((subItm) => ui.addListItem(subItm, $subUl));

        $li.appendChild($subUl);
      }
      $li.append(($a || $span) as HTMLElement);
      $ul.appendChild($li);
    },
  };

  return {
    init: (options: AnkhUiListOptions) => {
      const { id, items, ordered = false } = options;
      const $ui = $$.create(ordered ? "<ol/>" : "<ul/>", {
        id,
        class: "ui-list",
      });

      items.forEach((item) => ui.addListItem(item, $ui));

      observer.l({ name: "ui-list-update", handler: ui.update });

      return $ui;
    },
  };
})();
