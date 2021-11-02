import type {
  AnkhUiArticleOptions,
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
  AnkhUiLangOptions,
} from "types/ui.type";

const centeredText = { "text-align": "center" };

export const home: Array<
  | AnkhUiArticleOptions
  | AnkhUiGridOptions
  | AnkhUiHtmlOptions
  | AnkhUiLangOptions
> = [
  {
    id: "grid-main",
    ui: "grid",
    style: {
      gap: "2",
      "grid-template-columns": "repeat(2,1fr)",
      "grid-template-rows": "repeat(2,1fr)",
    },
  },
  { id: "grid-main-1", ui: "grid", parentId: "grid-main" },
  { id: "grid-main-2", ui: "grid", parentId: "grid-main" },
  { id: "grid-main-3", ui: "grid", parentId: "grid-main" },
  { id: "grid-main-4", ui: "grid", parentId: "grid-main" },
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
    parentId: "grid-main-1",
    title: "article-1-title",
    ui: "article",
  },
  {
    id: "div-2",
    text: "2",
    ui: "html",
    parentId: "grid-main-2",
    style: centeredText,
  },
  {
    id: "div-3",
    text: "3",
    ui: "html",
    parentId: "grid-main-3",
    style: centeredText,
  },
  {
    id: "div-4",
    text: "4",
    ui: "html",
    parentId: "grid-main-4",
    style: centeredText,
  },
  {
    id: "lang",
    ui: "lang",
  },
];
