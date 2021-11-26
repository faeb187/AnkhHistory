import { twoDollars as $$ } from "twodollars";
import type { AnkhUiArticleOptions } from "types/ui.type";

export const article = (() => ({
  init: (options: AnkhUiArticleOptions): HTMLElement => {
    let $elm;
    const { author, createdAt, id, title, paragraphs } = options;
    const $ui = $$.create("<article/>", { id, class: "ui-article" });

    const $title = $$.create("<h2/>", { "data-lang": title });
    $ui.appendChild($title);

    paragraphs.forEach((p) => {
      if (p.code) {
        const $pre = $$.create("<pre/>");
        const $code = $$.create("<code/>", { class: p.lang });
        $code.innerHTML = p.code;
        $pre.appendChild($code);
        $elm = $$.create("<p/>").appendChild($pre);
      } else $elm = $$.create("<p/>", { "data-lang": p.lang });

      $ui.appendChild($elm);
    });

    if (!author && !createdAt) return $ui;

    const $footer = $$.create("<footer/>");

    if (author) {
      const $address = $$.create("<address/>");
      $address.innerText = `by ${author.username}`;
      $footer.appendChild($address);
    }
    if (createdAt) {
      const $time = $$.create("<time/>", {
        // datetime: createdAt,
        pubdate: "pubdate",
      });
      $time.innerHTML = createdAt.toLocaleDateString("de");
      $footer.appendChild($time);
    }
    $ui.appendChild($footer);
    return $ui;
  },
}))();
