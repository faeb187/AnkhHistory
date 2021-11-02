// import { copy } from "utils";
import { routes } from "../routes";

import type {
  AnkhUiArticleOptions,
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
  AnkhUiLangOptions,
  AnkhUiNavOptions,
} from "types/ui.type";

export const home: Array<
  | AnkhUiArticleOptions
  | AnkhUiGridOptions
  | AnkhUiHtmlOptions
  | AnkhUiLangOptions
  | AnkhUiNavOptions
> = [
  {
    id: "home-grid-main",
    ui: "grid",
    style: {
      "grid-row-gap": "1em",
      "grid-template-rows": "repeat(4,1fr)",
    },
  },
  {
    id: "home-grid-main-1",
    ui: "grid",
    parentId: "home-grid-main",
  },
  {
    id: "home-grid-main-4",
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
    id: "lang",
    parentId: "home-grid-main-4",
    ui: "lang",
  },
];
