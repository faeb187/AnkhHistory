import { twoDollars as $$ } from "twodollars";

import { logger, observer, state } from "core";
import { html, list } from "uis";

import type { AnyObject } from "types/basic.type";
import type {
  AnkhUiListItem,
  AnkhUiListOptions,
  AnkhUiTabsOptions,
} from "types/ui.type";

type AnkhUiListOptionsPartial = Omit<AnkhUiListOptions, "ui">;

export const tabs = (() => {
  const ui = {
    events: {
      click: (args: AnyObject & { event: MouseEvent }) => {
        const { event } = args;
        event.preventDefault();

        const $a = <HTMLAnchorElement>event.target;
        const st = $a.getAttribute("href")!.slice(1);
        const $ui = $$.parent($a, ".ui-tabs");

        ui.update(st, $ui);

        logger.info("[UI:Tabs] selected:", st);
      },
    },
    getSelectedId: (uiId: string, defaultSelectedId: string) => {
      const selectedId = <string>state.get({ id: uiId });
      return selectedId || defaultSelectedId;
    },
    getTabListOptions: (
      tabList: AnkhUiListOptionsPartial,
      tabPanelIds: string[]
    ): AnkhUiListOptions => {
      const tabListMerged = <AnkhUiListOptions>$$.merge(tabList, {
        attributes: { role: "tabList" },
        ui: "list",
      });
      return {
        ...tabListMerged,
        items: tabListMerged.items.map(
          (tabListItem: AnkhUiListItem, i: number) => ({
            ...tabListItem,
            attributes: { href: `#${tabPanelIds[i]}` },
          })
        ),
        ui: "list",
      };
    },
    update: (st: string, $ui: HTMLElement) => {
      state.set({ id: $ui.id, state: st });
      $$.find(".ui-html", $ui).forEach(($tp) => ($tp.style.display = "none"));
      $$.find(`#${st}`, $ui)[0].style.display = "block";
      $$.find("[aria-selected='true']", $ui).forEach(($selectedA) =>
        $selectedA.removeAttribute("aria-selected")
      );
      $$.find(`a[href='#${st}']`, $ui)[0].setAttribute("aria-selected", "true");
    },
  };

  const init = (options: AnkhUiTabsOptions) => {
    const { id, tabList, tabPanels } = options;
    const tabPanelIds = tabPanels.map((tp) => tp.id);
    const $ui = $$.create("<section/>", { id, class: "ui-tabs" });
    const tabListOptions = ui.getTabListOptions(tabList, tabPanelIds);
    const $tabList = list.init(tabListOptions);
    const defaultSelectedId =
      tabList.items.filter(
        (tabListItem: AnkhUiListItem) => tabListItem.selected
      )[0]?.id || tabPanelIds[0];

    $$.find("a", $tabList).forEach(($a: HTMLElement, i: number) => {
      observer.l({
        bind: { target: $a, type: "click" },
        name: `ui-tabs-list-${tabPanelIds[i]}-click`,
        handler: ui.events.click,
      });
      const isSelected =
        ui.getSelectedId(id, defaultSelectedId) ===
        $a.getAttribute("href")!.slice(1);
      $$.addAttr($a, {
        role: "tab",
        tabindex: "-1",
        "aria-selected": isSelected.toString(),
      });
      $$.addAttr($a.parentElement!, { role: "presentation" });
    });

    const $tabPanels = tabPanels.map((tabPanel) =>
      html.init({
        attributes: { role: "tabPanel" },
        id: tabPanel.id!,
        tag: "section",
        ui: "html",
      })
    );

    const selectedId = ui.getSelectedId(id, defaultSelectedId);

    $ui.appendChild($tabList);
    $tabPanels.forEach(($tabPanel) => $ui.appendChild($tabPanel));

    ui.update(selectedId, $ui);

    return $ui;
  };

  return { init };
})();
