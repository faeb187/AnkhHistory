import type { AnkhMediaOptions } from "types/media.type";
import type { KeyValue } from "types/basic.type";
import type { AnkhRoute } from "types/route.type";
import type { ObserverEvent } from "core/observer";

type AnkhUiModules = { [prop: string]: AnkhUi };

type AnkhUi = {
  init: (
    // @todo create a options map then use keyof
    options:
      | AnkhUiOptions
      | AnkhUiArticleOptions
      | AnkhUiButtonOptions
      | AnkhUiGridOptions
      | AnkhUiHtmlOptions
      | AnkhUiLangOptions
      | AnkhUiNavOptions
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

// UI: article
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

// UI: lang
type AnkhUiLangOptions = AnkhUiOptions & {
  style?: KeyValue;
};

// UI: nav
type AnkhUiNavOptions = AnkhUiOptions & {
  items: AnkhRoute[];
  attributes?: KeyValue;
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
  AnkhUiGridOptions,
  AnkhUiHtmlOptions,
  AnkhUiLangOptions,
  AnkhUiNavOptions,
};
