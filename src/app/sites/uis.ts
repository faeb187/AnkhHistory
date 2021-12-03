// @todo centralize ALL events (why add it here, when bound anyway later)
import { v4 as uuidv4 } from "uuid";
import { observer } from "core";

import {
  buttonSliderToggle,
  buttonSliderToggleX,
} from "components/button.component";
import { footer, header, main } from "components/html.component";
import { lang } from "components/lang.component";
import { logo } from "components/image.component";
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

import type {
  AnkhUiArticleOptions,
  AnkhUiOptionMap,
  AnkhUiOverlayOptions,
} from "types/ui.type";

const article: AnkhUiArticleOptions = {
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
const breadcrumb = {
  id: "breadcrumb",
  items: [{ lang: "home" }, { lang: "uis" }],
  parentId: "details-elements-breadcrumb",
  ui: "breadcrumb",
};
const buttonOverlayHide = {
  events: [
    {
      bind: { target: "#buttonOverlayHide", type: "click" },
      name: "ui-button-overlay-hide",
      handler: (args: { event: MouseEvent }): void => {
        observer.f("ui-overlay-hide-overlay", { ...args, id: "overlay" });
      },
    },
  ],
  icon: "close",
  id: "buttonOverlayHide",
  parentId: "ui-overlay-front-overlay",
  ui: "button",
};
const carousel = {
  id: "carousel",
  items: [
    { title: "Bild 01" },
    { title: "Bild 02" },
    { title: "Bild 03" },
    { title: "Bild 04" },
    { title: "Bild 05" },
  ],
  parentId: "details-elements-carousel",
  ui: "carousel",
};
const chart = {
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
    responsive: true,
    type: "bar",
  },
  id: "chart",
  parentId: "details-elements-chart",
  ui: "chart",
};
const context = {
  attributes: { "data-for": "details-elements-context" },
  id: "context",
  menus: [
    {
      events: [
        {
          bind: { target: "#details-elements-context", type: "contextmenu" },
          name: "ui-context-show",
        },
      ],
      items: [{ lang: "first" }, { lang: "second" }, { lang: "third" }],
    },
  ],
  ui: "context",
};
const countdownUi = {
  id: "countdownUi",
  to: new Date(+new Date() + 7000),
  parentId: "details-elements-countdown",
  ui: "countdown",
};
const fab = {
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
const icon = {
  id: "ion-icon",
  icon: "terminal",
  variant: "sharp",
  parentId: "details-elements-icon",
  ui: "icon",
};
const iframe = {
  id: "iframe",
  src: "https://about:blank",
  parentId: "details-elements-iframe",
  ui: "iframe",
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
const list = {
  id: "list",
  items: [
    { icon: "terminal", id: "list-item-1", lang: "i-am-a-terminal" },
    { icon: "cube", id: "list-item-2", lang: "i-am-a-package" },
    { icon: "diamond", id: "list-item-3", lang: "i-am-a-diamond" },
  ],
  parentId: "details-elements-list",
  ui: "list",
};
const map = {
  id: "map",
  parentId: "details-elements-map",
  ui: "map",
};
const overlay: AnkhUiOverlayOptions = {
  id: "overlay",
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
      name: "ui-details-overlay-show-overlay",
      handler: (args: { event: MouseEvent }): void => {
        observer.f("ui-overlay-show-overlay", { ...args, id: "overlay" });
      },
    },
    {
      bind: { target: "#tabs .ui-list a", type: "click" },
      name: `ui-tabs-list-tabs-${uuidv4()}-click`,
      handler: (args: { event: MouseEvent }): void => {
        observer.f("ui-tabs-list-a-click", args);
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
  navMainMobile,

  // sliderMain front
  header,
  logo,
  navMain,
  buttonSliderToggle,

  main,
  tabs,

  ...accordionElements,
  article,
  breadcrumb,
  carousel,
  chart,
  context,
  countdownUi,
  fab,
  icon,
  iframe,
  ...input,

  ...accordionCompounds,
  gallery,
  image,
  list,
  map,
  overlay,
  buttonOverlayHide,
  slideshow,
  table,

  footer,
  lang,
];
