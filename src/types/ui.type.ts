import type { AnkhMediaOptions } from "types/media.type";
import type { KeyValue } from "types/basic.type";
import type { ObserverEvent } from "core/observer";

type AnkhUiModules = { [prop: string]: AnkhUi };

type AnkhUi = {
  init: (
    // @todo create a options map then use keyof
    options: AnkhUiOptions | AnkhUiGridOptions | AnkhUiHtmlOptions
  ) => HTMLElement;
};

// @todo extract AnkhUiOptionsCommon
type AnkhUiOptions = {
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

// UI: grid
type AnkhUiGridOptions = AnkhUiOptions & {
  attributes?: KeyValue;
  className?: string;
  element?: keyof HTMLElementTagNameMap;
  inline?: boolean;
  style?: KeyValue;
};

// UI: html
type AnkhUiHtmlOptions = AnkhUiOptions & {
  attributes: KeyValue;
  classNames: string;
  lang: string;
  src?: string; // path to image
  style?: KeyValue;
  tag: string;
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
