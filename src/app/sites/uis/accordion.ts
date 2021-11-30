import { observer } from "core";

import type {
  AnkhUiAccordionOptions,
  AnkhUiDetailsOptions,
} from "types/ui.type";

const accElements: AnkhUiAccordionOptions[] = [
  {
    id: "accordion-elements",
    targets: 13,
    parentId: "elements",
    ui: "accordion",
  },
];
const accElementsDetails: AnkhUiDetailsOptions[] = [
  {
    id: "details-elements-article",
    parentId: "accordion-elements",
    summary: { lang: "article" },
    ui: "details",
  },
  {
    id: "details-elements-breadcrumb",
    parentId: "accordion-elements",
    summary: { lang: "breadcrumb" },
    ui: "details",
  },
  {
    id: "details-elements-button",
    parentId: "accordion-elements",
    summary: { lang: "button" },
    ui: "details",
  },
  {
    id: "details-elements-carousel",
    parentId: "accordion-elements",
    summary: { lang: "carousel" },
    ui: "details",
  },
  {
    id: "details-elements-chart",
    parentId: "accordion-elements",
    summary: { lang: "chart" },
    ui: "details",
  },
  {
    id: "details-elements-context",
    parentId: "accordion-elements",
    summary: { lang: "context" },
    ui: "details",
  },
  {
    id: "details-elements-countdown",
    parentId: "accordion-elements",
    summary: { lang: "countdown" },
    ui: "details",
  },
  {
    id: "details-elements-fab",
    parentId: "accordion-elements",
    summary: { lang: "fab" },
    ui: "details",
  },
  {
    id: "details-elements-icon",
    parentId: "accordion-elements",
    summary: { lang: "icon" },
    ui: "details",
  },
  {
    id: "details-elements-iframe",
    parentId: "accordion-elements",
    summary: { lang: "iframe" },
    ui: "details",
  },
  {
    id: "details-elements-html",
    parentId: "accordion-elements",
    summary: { lang: "html" },
    ui: "details",
  },
  {
    id: "details-elements-image",
    parentId: "accordion-elements",
    summary: { lang: "image" },
    ui: "details",
  },
  {
    id: "details-elements-input",
    parentId: "accordion-elements",
    summary: { lang: "input" },
    ui: "details",
  },
  {
    id: "details-elements-list",
    parentId: "accordion-elements",
    summary: { lang: "list" },
    ui: "details",
  },
  {
    id: "details-elements-map",
    parentId: "accordion-elements",
    summary: { lang: "map" },
    ui: "details",
  },
  {
    id: "details-elements-nav",
    parentId: "accordion-elements",
    summary: { lang: "nav" },
    ui: "details",
  },
  {
    id: "details-elements-overlay",
    parentId: "accordion-elements",
    summary: { lang: "overlay" },
    ui: "details",
  },
  {
    id: "details-elements-table",
    parentId: "accordion-elements",
    summary: { lang: "table" },
    ui: "details",
  },
];

const accCompounds: AnkhUiAccordionOptions[] = [
  {
    id: "accordion-compounds",
    targets: 4,
    parentId: "compounds",
    ui: "accordion",
  },
];
const accCompoundsDetails: AnkhUiDetailsOptions[] = [
  {
    id: "details-compounds-accordion",
    parentId: "accordion-compounds",
    summary: { lang: "accordion" },
    ui: "details",
  },
  {
    id: "details-compounds-gallery",
    parentId: "accordion-compounds",
    summary: { lang: "gallery" },
    ui: "details",
  },
  {
    id: "details-compounds-slideshow",
    parentId: "accordion-compounds",
    summary: { lang: "slideshow" },
    ui: "details",
  },
  {
    id: "details-compounds-tabs",
    parentId: "accordion-compounds",
    summary: { lang: "tabs" },
    ui: "details",
  },
];

const accElementsDetailsWithEvent = accElementsDetails.map(
  (options: AnkhUiDetailsOptions) => ({
    ...options,
    events: [
      {
        bind: { target: `#${options.id}`, type: "click" },
        name: `ui-accordion-details-${options.id}-click`,
        handler: (args: { event: MouseEvent }) =>
          observer.f("ui-accordion-details-click", args),
      },
    ],
  })
);
const accCompoundsDetailsWithEvent = accCompoundsDetails.map(
  (options: AnkhUiDetailsOptions) => ({
    ...options,
    events: [
      {
        bind: { target: `#${options.id}`, type: "click" },
        name: `ui-accordion-details-${options.id}-click`,
        handler: (args: { event: MouseEvent }) =>
          observer.f("ui-accordion-details-click", args),
      },
    ],
  })
);

const accordionElements = [...accElements, ...accElementsDetailsWithEvent];
const accordionCompounds = [...accCompounds, ...accCompoundsDetailsWithEvent];

export { accordionCompounds, accordionElements };
