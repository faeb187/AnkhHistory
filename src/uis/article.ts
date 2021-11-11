import { twoDollars as $$ } from "twodollars";
import type { AnkhUiArticleOptions } from "types/ui.type";

export const article = (() => ({
  init: (options: AnkhUiArticleOptions): HTMLElement => {
    let $elm;
    const { author, createdAt, title, paragraphs } = options;
    const $ui = $$.create("<article/>", { class: "ui-article" });

    // ADD article title
    const $title = $$.create("<h2/>", { "data-lang": title });
    $ui.appendChild($title);

    // ADD article items
    paragraphs.forEach((p) => {
      // code block
      if (p.code) {
        const $pre = $$.create("<pre/>");
        const $code = $$.create("<code/>", { class: p.lang });
        $code.innerHTML = p.code;
        $pre.appendChild($code);
        $elm = $$.create("<p/>").appendChild($pre);
      }
      // normal paragraph
      else $elm = $$.create("<p/>", { "data-lang": p.lang });

      $ui.appendChild($elm);
    });

    // article footer required?
    if (author || createdAt) {
      const $footer = $$.create("<footer/>");

      if (author) {
        const $address = $$.create("<address/>");
        $address.innerText = `by ${author.username}`;
        $footer.appendChild($address);
      }
      /*if (createdAt) {
        const $time = $$.create("<time/>", {
          // datetime: createdAt,
          pubdate: "pubdate",
        });
        $time.innerHTML = createdAt.toLocaleDateString();
        $footer.appendChild($time);
      }*/
      $ui.appendChild($footer);
    }
    return $ui;
  },
}))();
