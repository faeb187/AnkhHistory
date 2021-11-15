import { routes } from "app/routes";
import { observer } from "core";

import { footer, header, main } from "components/html.component";
import { lang } from "components/lang.component";
import { navMain, navMainMobile } from "components/nav.component";
import { sliderMain } from "components/slider.component";

import { AnkhMediaViewport } from "types/media.type";
import type { AnkhUiOptionMap } from "types/ui.type";

// @todo redundant (home)
const navRoutes = routes.map((route) => ({
  ...route,
  attributes: { href: route.path, "data-lang": route.lang },
}));
const uisNavMain = { ...navMain, items: navRoutes };
const uisNavMainMobile = { ...navMainMobile, items: navRoutes };

const buttonSliderToggleHandler = (args: { event: MouseEvent }): void => {
  observer.f("_ui-slider-toggle", { ...args });
};
const buttonSliderToggle = {
  events: [
    {
      bind: { target: "#buttonSliderToggle", type: "click" },
      name: "ui-button-slider-toggle",
      handler: buttonSliderToggleHandler,
    },
  ],
  icon: "reorder-three",
  id: "buttonSliderToggle",
  media: { max: AnkhMediaViewport.L },
  parentId: "header",
  ui: "button",
};
const buttonSliderToggleX = {
  events: [
    {
      bind: { target: "#buttonSliderToggleX", type: "click" },
      name: "ui-button-slider-toggle-x",
      handler: buttonSliderToggleHandler,
    },
  ],
  id: "buttonSliderToggleX",
  icon: "close",
  media: { max: AnkhMediaViewport.L },
  parentId: "ui-slider-back-sliderMain",
  ui: "button",
};

export const home: AnkhUiOptionMap[] = [
  sliderMain,

  // sliderMain back
  buttonSliderToggleX,
  uisNavMainMobile,

  // sliderMain front
  header,
  uisNavMain,
  buttonSliderToggle,

  main,

  footer,
  { ...lang, parentId: "footer" },
];
