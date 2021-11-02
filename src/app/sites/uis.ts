// import { copy } from "utils";
import { routes } from "../routes";

import type {
  AnkhUiArticleOptions,
  AnkhUiButtonOptions,
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
  AnkhUiLangOptions,
  AnkhUiNavOptions,
} from "types/ui.type";

const boxStyle = { background: "#eaeaea" };

export const uis: Array<
  | AnkhUiArticleOptions
  | AnkhUiButtonOptions
  | AnkhUiGridOptions
  | AnkhUiHtmlOptions
  | AnkhUiLangOptions
  | AnkhUiNavOptions
> = [
  {
    id: "grid-main",
    ui: "grid",
    style: {
      "grid-row-gap": "1em",
      "grid-template-rows": "repeat(4,1fr)",
    },
  },
  {
    id: "grid-main-1",
    ui: "grid",
    parentId: "grid-main",
  },
  {
    id: "grid-main-2",
    ui: "grid",
    parentId: "grid-main",
    style: { ...boxStyle },
  },
  {
    id: "grid-main-3",
    ui: "grid",
    parentId: "grid-main",
    style: { ...boxStyle },
  },
  {
    id: "grid-main-4",
    ui: "grid",
    parentId: "grid-main",
  },
  {
    id: "nav-main",
    items: routes,
    parentId: "grid-main-1",
    ui: "nav",
  },
  {
    author: {
      username: "altruism",
    },
    createdAt: new Date(),
    id: "grid-main-1-article",
    paragraphs: [
      { lang: "article-1-p-1" },
      { code: "console.log('yes');", lang: "typescript" },
    ],
    parentId: "grid-main-2",
    title: "article-1-title",
    ui: "article",
  },
  {
    classNames: "primary",
    id: "button-1",
    lang: "clickMe",
    ui: "button",
    parentId: "grid-main-3",
  },
  {
    id: "lang",
    parentId: "grid-main-4",
    ui: "lang",
  },
];
