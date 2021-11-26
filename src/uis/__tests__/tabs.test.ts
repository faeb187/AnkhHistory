import { tabs } from "uis";
import type { AnkhUiTabsOptions } from "types/ui.type";

describe("UI tabs", () => {
  const options: AnkhUiTabsOptions = {
    id: "tabsTest",
    tabList: {
      id: "tabsTabList",
      items: [
        { id: "tabsTabList-1", lang: "{placeholder}" },
        { id: "tabsTabList-2", lang: "{placeholder}" },
        { id: "tabsTabList-3", lang: "{placeholder}" },
      ],
    },
    tabPanels: [
      { id: "tabsTabPanel-1" },
      { id: "tabsTabPanel-2" },
      { id: "tabsTabPanel-3" },
    ],
    ui: "tabs",
  };

  it("[init] returns correct HTMLElement", () => {
    const $ui = tabs.init(options);
    const isHTMLElement = (element: HTMLElement) =>
      element instanceof HTMLElement;

    expect(isHTMLElement($ui)).toBe(true);
    expect($ui.id).toBe("tabsTest");
  });
});
