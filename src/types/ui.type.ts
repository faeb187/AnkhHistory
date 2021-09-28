import type { AnkhMediaOptions } from "types/media.type";
import type { KeyValue } from "types/basic.type";
import type { AnkhEventDom } from "types/event.type";

type AnkhUiModules = { [prop: string]: AnkhUi };

type AnkhUi = {
  init: (
    // @todo create a options map then use keyof
    options: AnkhUiOptions | AnkhUiGridOptions | AnkhUiHtmlOptions
  ) => HTMLElement;
};

// @todo extract AnkhUiOptionsCommon
type AnkhUiOptions = {
  events?: AnkhEventDom[];
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

// UI: grid
type AnkhUiGridOptions = AnkhUiOptions & {
  attributes: KeyValue;
  className: string;
  element: keyof HTMLElementTagNameMap;
  inline: boolean;
  style: KeyValue;
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

export {
  AnkhUiModules,
  AnkhUi,
  AnkhUiLoaded,
  AnkhUiNotLoaded,
  AnkhUiOptions,
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
};
