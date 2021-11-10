import type { AnkhMediaOptions } from "types/media.type";
import type { KeyValue } from "types/basic.type";
import type { ObserverEvent } from "core/observer";
import { ChartConfiguration } from "chart.js";

type AnkhUiModules = { [prop: string]: AnkhUi };

type AnkhUiOptionMap =
  | AnkhUiAccordionOptions
  | AnkhUiArticleOptions
  | AnkhUiButtonOptions
  | AnkhUiCarouselOptions
  | AnkhUiChartOptions
  | AnkhUiContextOptions
  | AnkhUiCountdownOptions
  | AnkhUiDetailsOptions
  | AnkhUiFabOptions
  | AnkhUiGridOptions
  | AnkhUiHtmlOptions
  | AnkhUiIconOptions
  | AnkhUiLangOptions
  | AnkhUiListOptions
  | AnkhUiSlideshowOptions
  | AnkhUiNavOptions;

type AnkhUi = {
  init: (
    // @todo create a options map then use keyof
    options: AnkhUiOptionMap
  ) => HTMLElement;
};

type AnkhUiOptions = {
  attributes?: KeyValue;
  events?: ObserverEvent[];
  id: string;
  media?: AnkhMediaOptions;
  parentId?: string;
  text?: string;
  ui: string;
};

type AnkhUiNotLoaded = {
  parentId?: string;
  uiOptions: AnkhUiOptions;
  updatedParentId?: string;
};

type AnkhUiLoaded = AnkhUiNotLoaded & { $ui: HTMLElement };

// UI: accordion
type AnkhUiAccordionOptions = AnkhUiOptions & {
  items: AnkhUiDetailsItem[];
};

// UI: article
type AnkhUiArticleParagraph = {
  lang: string; // id to paragraph text or programming lang
  code?: string; // code block with syntax highlighting
};

type AnkhUiArticleAuthor = {
  email?: string;
  username: string;
  website?: string;
};

type AnkhUiArticleOptions = AnkhUiOptions & {
  author?: AnkhUiArticleAuthor;
  createdAt?: Date;
  paragraphs: AnkhUiArticleParagraph[];
  title: string;
};

// UI: button
type AnkhUiButtonOptions = AnkhUiOptions & {
  classNames?: string;
  id: string;
  lang?: string;
  icon?: string; // ion name
  events?: ObserverEvent[];
};

// UI: carousel
type AnkhUiCarouselItem = { text?: string; title?: string };
type AnkhUiCarouselOptions = AnkhUiOptions & { items: AnkhUiCarouselItem[] };

// UI: chart
type AnkhUiChartOptions = AnkhUiOptions & {
  chartJs?: ChartConfiguration;
};

// UI: context
type AnkhUiContextMenu = {
  events: ObserverEvent[];
  items: AnkhUiNavItem[];
};
type AnkhUiContextOptions = AnkhUiOptions & {
  menus: AnkhUiContextMenu[];
};

// UI: countdown
type AnkhUiCountdownOptions = AnkhUiOptions & {
  to: Date;
};

// UI: details
type AnkhUiDetailsItem = {
  id?: string;
  items: string[];
  open?: boolean;
  summary: { lang: string };
};

type AnkhUiDetailsOptions = AnkhUiOptions & AnkhUiDetailsItem;

// UI: fab
type AnkhUiFabOptions = AnkhUiOptions & {
  items: AnkhUiListItem[];
  toggle: AnkhUiButtonOptions;
};

// UI: grid
type AnkhUiGridOptions = AnkhUiOptions & {
  className?: string;
  element?: keyof HTMLElementTagNameMap;
  inline?: boolean;
  style?: KeyValue;
};

// UI: html
type AnkhUiHtmlOptions = AnkhUiOptions & {
  classNames: string;
  lang: string;
  src?: string; // path to image
  style?: KeyValue;
  tag: string;
};

// UI: icon (ion)
type AnkhUiIconVariant = "filled" | "outline" | "sharp";
type AnkhUiIconOptions = AnkhUiOptions & {
  icon: string;
  variant?: AnkhUiIconVariant;
};

// UI: iframe
type AnkhUiIFrameOptions = AnkhUiOptions & {
  src: string;
};

// UI: lang
type AnkhUiLangOptions = AnkhUiOptions & {
  style?: KeyValue;
};

// UI: list
type AnkhUiListItem = {
  attributes?: KeyValue;
  icon?: string;
  id: string;
  items?: AnkhUiListItem[];
  lang: string;
};

type AnkhUiListOptions = AnkhUiOptions & {
  items: AnkhUiListItem[];
  ordered?: boolean;
};

// UI: slideshow
type AnkhUiSlideshowItem = {
  alt: string;
  src: string;
  text?: string;
  title?: string;
};

type AnkhUiSlideshowOptions = AnkhUiOptions & {
  interval: number;
  items: AnkhUiSlideshowItem[];
};

// UI: nav
type AnkhUiNavItem = {
  attributes?: KeyValue;
  events?: ObserverEvent[];
  lang: string;
  path?: string;
  items?: AnkhUiNavItem[];
};

type AnkhUiNavOptions = AnkhUiOptions & {
  items: AnkhUiNavItem[];
};

export {
  AnkhUi,
  AnkhUiLoaded,
  AnkhUiModules,
  AnkhUiNotLoaded,
  AnkhUiOptionMap,
  AnkhUiOptions,
  //
  AnkhUiAccordionOptions,
  AnkhUiArticleOptions,
  AnkhUiButtonOptions,
  AnkhUiCarouselOptions,
  AnkhUiChartOptions,
  AnkhUiContextOptions,
  AnkhUiCountdownOptions,
  AnkhUiDetailsOptions,
  AnkhUiFabOptions,
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
  AnkhUiIconOptions,
  AnkhUiIFrameOptions,
  AnkhUiLangOptions,
  AnkhUiListItem,
  AnkhUiListOptions,
  AnkhUiSlideshowItem,
  AnkhUiSlideshowOptions,
  AnkhUiNavOptions,
};
