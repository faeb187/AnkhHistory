// import { copy } from "utils";
import { routes } from "../routes";

import type {
  AnkhUiArticleOptions,
  AnkhUiButtonOptions,
  AnkhUiCarouselOptions,
  AnkhUiChartOptions,
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
  AnkhUiLangOptions,
  AnkhUiNavOptions,
} from "types/ui.type";

const boxStyle = { background: "#eaeaea" };

export const uis: Array<
  | AnkhUiArticleOptions
  | AnkhUiButtonOptions
  | AnkhUiCarouselOptions
  | AnkhUiChartOptions
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
    id: "lang",
    parentId: "grid-main-6",
    ui: "lang",
  },
];
