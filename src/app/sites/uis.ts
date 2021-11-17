// @todo centralize ALL events (why add it here, when bound anyway later)

import { routes } from "app/routes";
import { observer } from "core";

import { footer, header, main } from "components/html.component";
import { lang } from "components/lang.component";
import {
  inputBirthday,
  inputColor,
  inputEmail,
  inputFirstName,
  inputName,
  inputSubmit,
  inputTel,
} from "components/input.component";
import { accordionCompounds, accordionElements } from "./uis/accordion";
import { navMain, navMainMobile } from "components/nav.component";
import { sliderMain } from "components/slider.component";

import { AnkhMediaViewport } from "types/media.type";
import type {
  AnkhUiArticleOptions,
  AnkhUiOptionMap,
  AnkhUiOverlayOptions,
} from "types/ui.type";

const navRoutes = routes.map((route) => ({
  ...route,
  attributes: { href: route.path, "data-lang": route.lang },
}));
const uisArticle: AnkhUiArticleOptions = {
  author: { username: "altruism" },
  createdAt: new Date(),
  id: "articleUis",
  paragraphs: [
    { lang: "article-1-p-1" },
    { code: "console.log('yes');", lang: "typescript" },
  ],
  parentId: "details-elements-article",
  title: "article",
  ui: "article",
};
const uisNavMain = { ...navMain, items: navRoutes };
const uisNavMainMobile = { ...navMainMobile, items: navRoutes };

const buttonOverlayHide = {
  events: [
    {
      bind: { target: "#buttonOverlayHide", type: "click" },
      name: "ui-button-overlay-hide",
      handler: (args: { event: MouseEvent }): void => {
        observer.f("ui-overlay-hide-overlayUis", { ...args, id: "overlayUis" });
      },
    },
  ],
  icon: "close",
  id: "buttonOverlayHide",
  parentId: "ui-overlay-front-overlayUis",
  ui: "button",
};
const buttonSliderToggleHandler = (args: { event: MouseEvent }): void => {
  observer.f("_ui-slider-toggle", args);
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
      handler: buttonSliderToggleHandler,
      name: "ui-button-slider-toggle-x",
    },
  ],
  id: "buttonSliderToggleX",
  icon: "close",
  media: { max: AnkhMediaViewport.L },
  parentId: "ui-slider-back-sliderMain",
  ui: "button",
};
const countdownUi = {
  id: "countdownUi",
  to: new Date(+new Date() + 7000),
  parentId: "details-elements-countdown",
  ui: "countdown",
};
const gallery = {
  id: "gallery",
  items: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(() => ({
    alt: "Kitten",
    src: "https://source.unsplash.com/random/320x180?graffiti",
    text: "txt-kitten",
    title: "kitten",
  })),
  parentId: "details-compounds-gallery",
  ui: "gallery",
};
const image = {
  attributes: { src: "https://placekitten.com/80/165" },
  id: "imgKitten",
  lang: "kitten",
  parentId: "details-elements-image",
  ui: "image",
};
const input = [
  {
    id: "form",
    parentId: "details-elements-input",
    tag: "form",
    ui: "html",
  },
  inputName,
  inputFirstName,
  inputEmail,
  inputBirthday,
  inputTel,
  inputColor,
  inputSubmit,
];
const map = {
  id: "map",
  parentId: "details-elements-map",
  ui: "map",
};
const overlay: AnkhUiOverlayOptions = {
  id: "overlayUis",
  parentId: "details-elements-overlay",
  ui: "overlay",
};
const slideshow = {
  id: "slideshow",
  items: [0, 1, 2, 3].map(() => ({
    alt: "Kitten",
    src: "https://source.unsplash.com/random/960x400?nature",
    text: "txt-kitten",
    title: "kitten",
  })),
  parentId: "details-compounds-slideshow",
  ui: "slideshow",
};
const table = {
  cols: [{ lang: "name" }, { lang: "firstName" }, { lang: "email" }],
  data: [
    { name: "Gartenmann", firstName: "Fabio", email: "test@tester.com" },
    { name: "Mustermann", firstName: "Max", email: "max@mustermann.de" },
  ],
  id: "tableUis",
  parentId: "details-elements-table",
  ui: "table",
};
const tabs = {
  events: [
    {
      bind: { target: "#details-elements-overlay", type: "click" },
      name: "ui-details-overlay-show-overlayUis",
      handler: (args: { event: MouseEvent }): void => {
        observer.f("ui-overlay-show-overlayUis", { ...args, id: "overlayUis" });
      },
    },
  ],
  id: "tabs",
  parentId: "main",
  tabList: {
    id: "tabList",
    items: [
      { id: "tabList-elements", lang: "elements" },
      { id: "tabList-compounds", lang: "compounds" },
    ],
  },
  tabPanels: [{ id: "elements" }, { id: "compounds" }],
  ui: "tabs",
};

export const uis: AnkhUiOptionMap[] = [
  sliderMain,

  // sliderMain back
  buttonSliderToggleX,
  uisNavMainMobile,

  // sliderMain front
  header,
  uisNavMain,
  buttonSliderToggle,

  main,
  tabs,

  ...accordionElements,
  uisArticle,
  countdownUi,
  ...input,

  ...accordionCompounds,
  gallery,
  image,
  map,
  overlay,
  buttonOverlayHide,
  slideshow,
  table,

  footer,
  lang,
];

// @test some UI configs
/*
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
    src: "https://about:blank",
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
    id: "ion-icon",
    icon: "terminal",
    variant: "sharp",
    parentId: "home-grid-main-4",
    ui: "icon",
  },
];
*/
