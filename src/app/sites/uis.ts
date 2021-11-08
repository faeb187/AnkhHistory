// import { copy } from "utils";
import { routes } from "../routes";

import type {
  AnkhUiArticleOptions,
  AnkhUiButtonOptions,
  AnkhUiCarouselOptions,
  AnkhUiChartOptions,
  AnkhUiContextOptions,
  AnkhUiFabOptions,
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
  AnkhUiIFrameOptions,
  AnkhUiLangOptions,
  AnkhUiListOptions,
  AnkhUiNavOptions,
} from "types/ui.type";

const boxStyle = { background: "#eaeaea" };

export const uis: Array<
  | AnkhUiArticleOptions
  | AnkhUiButtonOptions
  | AnkhUiCarouselOptions
  | AnkhUiChartOptions
  | AnkhUiContextOptions
  | AnkhUiFabOptions
  | AnkhUiGridOptions
  | AnkhUiHtmlOptions
  | AnkhUiIFrameOptions
  | AnkhUiLangOptions
  | AnkhUiListOptions
  | AnkhUiNavOptions
> = [
  {
    id: "grid-main",
    ui: "grid",
    style: {
      "grid-row-gap": "1em",
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
    id: "grid-main-5",
    ui: "grid",
    parentId: "grid-main",
  },
  {
    id: "grid-main-6",
    ui: "grid",
    parentId: "grid-main",
  },
  {
    id: "grid-main-7",
    ui: "grid",
    parentId: "grid-main",
  },
  {
    id: "grid-main-8",
    ui: "grid",
    parentId: "grid-main",
  },
  {
    id: "grid-main-9",
    ui: "grid",
    parentId: "grid-main",
  },
  {
    id: "grid-main-10",
    ui: "grid",
    parentId: "grid-main",
  },
  {
    id: "grid-main-11",
    ui: "grid",
    parentId: "grid-main",
  },
  {
    id: "nav-main",
    items: routes.map((route) => ({
      ...route,
      attributes: { href: route.path, "data-lang": route.lang },
    })),
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
    id: "carousel",
    items: [
      { title: "Bild 01" },
      { title: "Bild 02" },
      { title: "Bild 03" },
      { title: "Bild 04" },
      { title: "Bild 05" },
    ],
    parentId: "grid-main-4",
    ui: "carousel",
  },
  {
    chartJs: {
      data: {
        datasets: [
          { data: [4634, 4545, 4527, 4505, 4478], label: "Schweizer Berge" },
        ],
        labels: ["dufourspitze", "dom", "liskamm", "weisshorn", "matterhorn"],
      },
      options: {
        scales: {
          y: { min: 4400 },
        },
      },
      type: "bar",
    },
    id: "chart",
    parentId: "grid-main-5",
    ui: "chart",
  },
  {
    id: "html",
    ui: "html",
    parentId: "grid-main-6",
    text: "UI html (I'm a div)",
  },
  {
    attributes: { "data-for": "html" },
    id: "nav-context",
    menus: [
      {
        events: [
          {
            bind: { target: "#html", type: "contextmenu" },
            name: "ui-context-show",
          },
        ],
        items: [{ lang: "first" }, { lang: "second" }, { lang: "third" }],
      },
    ],
    ui: "context",
  },
  /*{
    id: "iframe-twodollars",
    src: "https://onecommunityglobal.org",
    parentId: "grid-main-9",
    ui: "iframe",
  },*/
  {
    id: "list",
    items: [
      { icon: "terminal", id: "list-item-1", lang: "i-am-a-terminal" },
      { icon: "cube", id: "list-item-2", lang: "i-am-a-package" },
      { icon: "diamond", id: "list-item-3", lang: "i-am-a-diamond" },
    ],
    parentId: "grid-main-10",
    ui: "list",
  },
  {
    id: "lang",
    parentId: "grid-main-11",
    ui: "lang",
  },
  {
    id: "fab",
    items: [
      { icon: "terminal", id: "list-item-1", lang: "i-am-a-terminal" },
      { icon: "cube", id: "list-item-2", lang: "i-am-a-package" },
      { icon: "diamond", id: "list-item-3", lang: "i-am-a-diamond" },
    ],
    toggle: {
      icon: "add",
      id: "fab-toggle",
      ui: "button",
      classNames: "primary",
    },
    ui: "fab",
  },
];
