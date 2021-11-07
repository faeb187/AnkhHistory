// import { copy } from "utils";
import { routes } from "../routes";

import type {
  AnkhUiArticleOptions,
  AnkhUiCountdownOptions,
  AnkhUiDetailsOptions,
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
  AnkhUiIconOptions,
  AnkhUiLangOptions,
  AnkhUiNavOptions,
} from "types/ui.type";

export const home: Array<
  | AnkhUiArticleOptions
  | AnkhUiCountdownOptions
  | AnkhUiDetailsOptions
  | AnkhUiGridOptions
  | AnkhUiHtmlOptions
  | AnkhUiIconOptions
  | AnkhUiLangOptions
  | AnkhUiNavOptions
> = [
  {
    id: "home-grid-main",
    ui: "grid",
    style: {
      "grid-row-gap": "1em",
    },
  },
  {
    id: "home-grid-main-1",
    ui: "grid",
    parentId: "home-grid-main",
  },
  {
    id: "home-grid-main-2",
    ui: "grid",
    parentId: "home-grid-main",
  },
  {
    id: "home-grid-main-3",
    ui: "grid",
    parentId: "home-grid-main",
  },
  {
    id: "home-grid-main-4",
    ui: "grid",
    parentId: "home-grid-main",
  },
  {
    id: "home-grid-main-5",
    ui: "grid",
    parentId: "home-grid-main",
  },
  {
    id: "nav-main",
    items: routes,
    ui: "nav",
    parentId: "home-grid-main-1",
  },
  {
    id: "countdown",
    to: new Date(+new Date() + 7000),
    parentId: "home-grid-main-2",
    ui: "countdown",
  },
  {
    id: "details",
    // open: true,
    p: { lang: "txt-p" },
    parentId: "home-grid-main-3",
    summary: { lang: "txt-summary" },
    ui: "details",
  },
  {
    id: "ion-icon",
    icon: "terminal",
    variant: "sharp",
    parentId: "home-grid-main-4",
    ui: "icon",
  },
  {
    id: "lang",
    parentId: "home-grid-main-5",
    ui: "lang",
  },
];
