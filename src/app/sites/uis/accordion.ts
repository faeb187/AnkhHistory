import { observer } from "core";

import type {
  AnkhUiAccordionOptions,
  AnkhUiDetailsOptions,
} from "types/ui.type";

const accElements: AnkhUiAccordionOptions[] = [
  {
    id: "accordion-elements",
    targets: 11,
    parentId: "elements",
    ui: "accordion",
  },
];
const accElementsDetails: AnkhUiDetailsOptions[] = [
  {
    id: "details-elements-article",
    parentId: "accordion-elements-1",
    summary: { lang: "article" },
    ui: "details",
  },
  {
    id: "details-elements-button",
    parentId: "accordion-elements-2",
    summary: { lang: "button" },
    ui: "details",
  },
  {
    id: "details-elements-countdown",
    parentId: "accordion-elements-3",
    summary: { lang: "countdown" },
    ui: "details",
  },
  {
    id: "details-elements-html",
    parentId: "accordion-elements-4",
    summary: { lang: "html" },
    ui: "details",
  },
  {
    id: "details-elements-image",
    parentId: "accordion-elements-5",
    summary: { lang: "image" },
    ui: "details",
  },
  {
    id: "details-elements-input",
    parentId: "accordion-elements-6",
    summary: { lang: "input" },
    ui: "details",
  },
  {
    id: "details-elements-map",
    parentId: "accordion-elements-7",
    summary: { lang: "map" },
    ui: "details",
  },
  {
    id: "details-elements-nav",
    parentId: "accordion-elements-8",
    summary: { lang: "nav" },
    ui: "details",
  },
  {
    id: "details-elements-overlay",
    parentId: "accordion-elements-9",
    summary: { lang: "overlay" },
    ui: "details",
  },
  {
    id: "details-elements-table",
    parentId: "accordion-elements-10",
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
