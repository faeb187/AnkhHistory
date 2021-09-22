/**
 * UI html
 */
import { $$ } from "core";
import type { AnkhUiHtmlOptions } from "types/ui.type";

export const html = (() => ({
  init: (options: AnkhUiHtmlOptions) => {
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
