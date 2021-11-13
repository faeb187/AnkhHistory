import { copy } from "utils";
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
const uisNavMain = { ...copy(navMain), items: copy(navRoutes) };
const uisNavMainMobile = { ...copy(navMainMobile), items: copy(navRoutes) };

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
  copy(sliderMain),

  // sliderMain back
  buttonSliderToggleX,
  copy(uisNavMainMobile),

  // sliderMain front
  copy(header),
  copy(uisNavMain),
  buttonSliderToggle,

  copy(main),

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
