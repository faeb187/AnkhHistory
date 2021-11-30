import type { AnkhMediaOptions } from "types/media.type";
import type { AnyObject, KeyValue } from "types/basic.type";
import type { ObserverEvent } from "core/observer";
import { ChartConfiguration } from "chart.js";

type AnkhUiModules = { [prop: string]: AnkhUi };

type AnkhUiOptionMap =
  | AnkhUiAccordionOptions
  | AnkhUiArticleOptions
  | AnkhUiBreadcrumbOptions
  | AnkhUiButtonOptions
  | AnkhUiCarouselOptions
  | AnkhUiChartOptions
  | AnkhUiChessOptions
  | AnkhUiContextOptions
  | AnkhUiCountdownOptions
  | AnkhUiDetailsOptions
  | AnkhUiFabOptions
  | AnkhUiGalleryOptions
  | AnkhUiGridOptions
  | AnkhUiHtmlOptions
  | AnkhUiImageOptions
  | AnkhUiInputOptions
  | AnkhUiIconOptions
  | AnkhUiLangOptions
  | AnkhUiListOptions
  | AnkhUiMapOptions
  | AnkhUiNavOptions
  | AnkhUiOverlayOptions
  | AnkhUiProcessOptions
  | AnkhUiSitemapOptions
  | AnkhUiSliderOptions
  | AnkhUiSlideshowOptions
  | AnkhUiTableOptions
  | AnkhUiTabsOptions;

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
  targets?: number;
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
// UI: breadcrumb
type AnkhUiBreadcrumbItem = { lang?: string };
type AnkhUiBreadcrumbOptions = AnkhUiOptions & {
  active: number;
  items: AnkhUiBreadcrumbItem[];
  numbered: boolean;
  readonly: boolean;
};
type AnkhUiBreadcrumbUpdateOptions = {
  active: number;
  target: HTMLElement;
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
// UI: chess
type AnkhUiChessOptions = AnkhUiOptions;
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
type AnkhUiDetailsOptions = AnkhUiOptions & {
  id: string;
  open?: boolean;
  summary: { lang: string };
  targets?: number;
};
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
  attributes?: KeyValue;
  classNames?: string;
  lang?: string;
  src?: string; // path to image
  style?: KeyValue;
  tag?: string;
  text?: string;
};
// UI: icon (ion)
type AnkhUiIconVariant = "filled" | "outline" | "sharp";
type AnkhUiIconOptions = AnkhUiOptions & {
  icon: string;
  variant?: AnkhUiIconVariant;
};
// UI: image
type AnkhUiImageOptions = AnkhUiOptions & {
  lang: string; // i18n 'alt' attribute
  attributes: { src: string };
};
// UI: input
type AnkhUiInputItem = {
  value: string;
};
type AnkhUiInputOptions = AnkhUiOptions & {
  attributes: AnyObject;
  disabled?: boolean;
  icon?: string;
  items?: AnkhUiInputItem[];
  label?: string;
  lang?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
};
// UI: iframe
type AnkhUiIFrameOptions = AnkhUiOptions & {
  src: string;
};
// UI: gallery
type AnkhUiGalleryItem = {
  alt: string;
  src: string;
  text?: string;
  title?: string;
};
type AnkhUiGalleryOptions = AnkhUiOptions & {
  interval?: number;
  items: AnkhUiSlideshowItem[];
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
  selected?: boolean;
};
type AnkhUiListOptions = AnkhUiOptions & {
  items: AnkhUiListItem[];
  ordered?: boolean;
};
// UI: map
type AnkhUiMapMarker = {
  color: string;
  icon: string;
  location: string;
  shadow: boolean;
  size: string;
};
type AnkhUiMapOptions = {
  center?: string;
  id: string;
  height: number;
  markers: AnkhUiMapMarker[];
  width: number;
  zoom: number; // zoom level (0-22)
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
// UI: overlay
type AnkhUiOverlayOptions = AnkhUiOptions;
// UI: process
type AnkhUiProcessStep = {
  path: string;
};
type AnkhUiProcessOptions = AnkhUiOptions & {
  gateway?: boolean;
  steps: AnkhUiProcessStep[];
};
// UI: sitemap
type AnkhUiSitemapOptions = AnkhUiOptions;
// UI: slider
type AnkhUiSliderOptions = AnkhUiOptions;
// UI: slideshow
type AnkhUiSlideshowItem = {
  alt: string;
  src: string;
  text?: string;
  title?: string;
};
type AnkhUiSlideshowOptions = AnkhUiOptions & {
  interval?: number;
  items: AnkhUiSlideshowItem[];
};
// UI: table
type AnkhUiTableColumn = {
  currency?: string;
  date?: boolean;
  lang?: string;
  right?: boolean;
  svg?: string;
  width?: string;
};
type AnkhUiTableRow = {
  [key: string]: string;
};
type AnkhUiTableOptions = AnkhUiOptions & {
  cols: AnkhUiTableColumn[];
  data: AnkhUiTableRow[];
};

type AnkhUiTabsOptions = AnkhUiOptions & {
  tabList: Omit<AnkhUiListOptions, "ui">;
  tabPanels: Omit<AnkhUiHtmlOptions, "ui">[];
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
  AnkhUiBreadcrumbItem,
  AnkhUiBreadcrumbOptions,
  AnkhUiBreadcrumbUpdateOptions,
  AnkhUiButtonOptions,
  AnkhUiCarouselOptions,
  AnkhUiChartOptions,
  AnkhUiChessOptions,
  AnkhUiContextOptions,
  AnkhUiCountdownOptions,
  AnkhUiDetailsOptions,
  AnkhUiFabOptions,
  AnkhUiGalleryItem,
  AnkhUiGalleryOptions,
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
  AnkhUiIconOptions,
  AnkhUiIFrameOptions,
  AnkhUiImageOptions,
  AnkhUiInputOptions,
  AnkhUiLangOptions,
  AnkhUiListItem,
  AnkhUiListOptions,
  AnkhUiMapOptions,
  AnkhUiNavOptions,
  AnkhUiOverlayOptions,
  AnkhUiProcessOptions,
  AnkhUiProcessStep,
  AnkhUiSlideshowItem,
  AnkhUiSlideshowOptions,
  AnkhUiSliderOptions,
  AnkhUiSitemapOptions,
  AnkhUiTableColumn,
  AnkhUiTableOptions,
  AnkhUiTableRow,
  AnkhUiTabsOptions,
};
