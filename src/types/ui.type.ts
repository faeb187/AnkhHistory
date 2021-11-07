import type { AnkhMediaOptions } from "types/media.type";
import type { KeyValue } from "types/basic.type";
import type { ObserverEvent } from "core/observer";
import { ChartConfiguration } from "chart.js";

type AnkhUiModules = { [prop: string]: AnkhUi };

type AnkhUi = {
  init: (
    // @todo create a options map then use keyof
    options:
      | AnkhUiOptions
      | AnkhUiArticleOptions
      | AnkhUiButtonOptions
      | AnkhUiCarouselOptions
      | AnkhUiChartOptions
      | AnkhUiContextOptions
      | AnkhUiCountdownOptions
      | AnkhUiGridOptions
      | AnkhUiHtmlOptions
      | AnkhUiLangOptions
      | AnkhUiNavOptions
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
  lang: string;
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

// UI: lang
type AnkhUiLangOptions = AnkhUiOptions & {
  style?: KeyValue;
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
  AnkhUiModules,
  AnkhUi,
  AnkhUiLoaded,
  AnkhUiNotLoaded,
  AnkhUiOptions,
  //
  AnkhUiArticleOptions,
  AnkhUiButtonOptions,
  AnkhUiCarouselOptions,
  AnkhUiChartOptions,
  AnkhUiContextOptions,
  AnkhUiCountdownOptions,
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
  AnkhUiLangOptions,
  AnkhUiNavOptions,
};
