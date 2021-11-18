import { v4 as uuidv4 } from "uuid";

import { routes } from "app/routes";

import { AnkhMediaViewport } from "types/media.type";
import { observer } from "core";

const navRoutes = routes.map((route) => ({
  ...route,
  attributes: { href: route.path, "data-lang": route.lang },
}));

const navMain = {
  events: [
    {
      bind: { target: "#navMain a", type: "click" },
      name: `ui-nav-a-click-navMainMobile-${uuidv4()}`,
      handler: (args: { event: MouseEvent }): void => {
        observer.f("ui-nav-a-click", args);
      },
    },
  ],
  id: "navMain",
  items: navRoutes,
  media: { min: AnkhMediaViewport.L },
  parentId: "header",
  ui: "nav",
};

const navMainMobile = {
  events: [
    {
      bind: { target: "#navMainMobile a", type: "click" },
      name: `ui-nav-a-click-navMainMobile-${uuidv4()}`,
      handler: (args: { event: MouseEvent }): void => {
        observer.f("ui-nav-a-click", args);
      },
    },
  ],
  id: "navMainMobile",
  items: navRoutes,
  media: { max: AnkhMediaViewport.L },
  parentId: "ui-slider-back-sliderMain",
  ui: "nav",
};

export { navMain, navMainMobile };
