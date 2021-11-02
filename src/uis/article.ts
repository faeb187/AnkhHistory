import { twoDollars } from "twodollars";
import type { AnkhUiArticleOptions } from "types/ui.type";

export const article = (() => ({
  init: (options: AnkhUiArticleOptions): HTMLElement => {
    let $elm;
    const { author, createdAt, title, paragraphs } = options;
    const $ui = twoDollars.create("<article/>", { class: "ui-article" });

    // ADD article title
    const $title = twoDollars.create("<h2/>", { "data-lang": title });
    $ui.appendChild($title);

    // ADD article items
    paragraphs.forEach((p) => {
      // code block
      if (p.code) {
        const $pre = twoDollars.create("<pre/>");
        const $code = twoDollars.create("<code/>", { class: p.lang });
        $code.innerHTML = p.code;
        $pre.appendChild($code);
        $elm = twoDollars.create("<p/>").appendChild($pre);
      }
      // normal paragraph
      else $elm = twoDollars.create("<p/>", { "data-lang": p.lang });

      $ui.appendChild($elm);
    });

    // article footer required?
    if (author || createdAt) {
      const $footer = twoDollars.create("<footer/>");

      if (author) {
        const $address = twoDollars.create("<address/>");
        $address.innerText = `by ${author.username}`;
        $footer.appendChild($address);
      }
      if (createdAt) {
        const $time = twoDollars.create("<time/>", {
          // datetime: opt.createdAt,
          pubdate: "pubdate",
        });
        $time.innerHTML = createdAt.toDateString();
        $footer.appendChild($time);
      }
      $ui.appendChild($footer);
    }
    return $ui;
  },
}))();
