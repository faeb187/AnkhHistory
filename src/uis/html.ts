import { twoDollars } from "twodollars";
import type { AnkhUiHtmlOptions } from "types/ui.type";

export const html = (() => {
  const init = (options: AnkhUiHtmlOptions) => {
    const {
      attributes,
      classNames = "",
      id,
      lang,
      src,
      tag = "div",
      style,
      text,
    } = options;

    const $ui = twoDollars.create(`<${tag}/>`, {
      id,
      class: `ui-html ui-html-${tag} ${classNames}`,
    });

    style && twoDollars.css($ui, style);
    attributes && twoDollars.addAttr($ui, attributes);

    // @todo handle images in new Ui?
    if (src) {
      $ui.setAttribute("src", src);
      if (lang) $ui.setAttribute("data-lang", lang);
    } else if (lang) $ui.setAttribute("data-lang", lang);
    else if (text) $ui.innerText = text;

    return $ui;
  };
  return { init };
})();
