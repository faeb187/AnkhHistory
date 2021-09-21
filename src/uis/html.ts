/**
 * UI html
 */
import { $$, observer } from "core";

import type { KeyValue } from "types/basic.type";

type UiHtmlOptions = {
  attributes?: object;
  classNames?: string;
  id: string;
  lang?: string;
  src?: string; // path to image
  style?: KeyValue;
  tag?: string; // default: 'div'
  text?: string; // innerText (bypass 'lang')
};

export const html = (() => ({
  init: (options: UiHtmlOptions) => {
    const {
      attributes = {},
      classNames = "",
      id,
      lang,
      src,
      tag = "div",
      style = {},
      text,
    } = options;

    if (!id) return;

    const $ui = $$(`<${tag}/>`, {
      id,
      class: `ui-html ui-html-${tag} ${classNames}`,
    });

    $$.css($ui, style);
    $$.addAttr($ui, attributes);

    // @todo handle images in new Ui?
    if (src) {
      $ui.setAttribute("src", src);
      if (lang) $ui.setAttribute("data-lang", lang);
    } else if (lang) $ui.setAttribute("data-lang", lang);
    else if (text) $ui.innerText = text;

    return $ui;
  },
}))();
