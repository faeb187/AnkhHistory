import { copy } from "utils";
import { routes } from "app/routes";

import { footer, header, main } from "components/html.component";
import { lang } from "components/lang.component";
import { navMain } from "components/nav.component";

import type { AnkhUiOptionMap } from "types/ui.type";

// @todo redundant (home)
const navRoutes = routes.map((route) => ({
  ...route,
  attributes: { href: route.path, "data-lang": route.lang },
}));
// @todo redundant (home)
const uisNavMain = { ...copy(navMain), items: copy(navRoutes) };

// @todo redundant layout (home)
export const uis: AnkhUiOptionMap[] = [
  // header
  copy(header),
  { ...copy(uisNavMain), parentId: "header" },

  // main
  copy(main),
  {
    id: "accordion",
    items: [
      { p: { lang: "first" }, summary: { lang: "first" } },
      { p: { lang: "second" }, summary: { lang: "second" } },
      { p: { lang: "third" }, summary: { lang: "third" } },
    ],
    parentId: "main",
    ui: "accordion",
  },

  // footer
  copy(footer),
  { ...copy(lang), parentId: "footer" },
];

// @test some UI configs
/*
const uiArticle = {
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
};

const uiButton = {
    classNames: "primary",
    id: "button-1",
    lang: "clickMe",
    ui: "button",
    parentId: "grid-main-3",
  },
  
const uiCarousel = {
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

const uiChart = {
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

const uiIFrame = {
    id: "iframe-twodollars",
    src: "https://onecommunityglobal.org",
    parentId: "grid-main-9",
    ui: "iframe",
  };
  
const uiContext = {
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
  
const uiSlideshow = {
    id: "slideshow",
    items: [
      ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => ({
        alt: "Kitten",
        src: "https://placekitten.com/100/150",
        text: "txt-kitten",
        title: "kitten",
      })),
    ],
    ui: "slideshow",
  },
  
const uiList = {
    id: "list",
    items: [
      { icon: "terminal", id: "list-item-1", lang: "i-am-a-terminal" },
      { icon: "cube", id: "list-item-2", lang: "i-am-a-package" },
      { icon: "diamond", id: "list-item-3", lang: "i-am-a-diamond" },
    ],
    parentId: "grid-main-10",
    ui: "list",
  },
  
const uiFab = {
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
];
*/
