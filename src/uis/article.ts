/**
 * UI article
 */
import { $$ } from "core";

type UiArticleAuthor = {
  username: string;
  email: string;
  website: string;
};

type UiArticleItem = {
  lang: any; // id to paragraph text or programming lang
  code: any; // code block with syntax highlighting
};

type UiArticleOptions = {
  author: UiArticleAuthor;
  createdAt: Date;
  items: UiArticleItem[];
  target: HTMLElement;
  title: string;
};

export const article = (() => ({
  init: (opt: UiArticleOptions) => {
    let $elm;
    const { target, title, items } = opt;
    const $ui = $$("<article/>", { class: "ui-article" });

    // ADD article title
    const $title = $$("<h2/>", { "data-lang": title });
    $ui.appendChild($title);

    // ADD article items
    items.forEach((itm) => {
      // code block
      if (itm.code) {
        const $pre = $$("<pre/>");
        const $code = $$("<code/>", { class: itm.lang });
        $code.innerHTML = itm.code;
        $pre.appendChild($code);
        $elm = $$("<p/>").appendChild($pre);
      }
      // normal paragraph
      else $elm = $$("<p/>", { "data-lang": itm.lang });

      $ui.appendChild($elm);
    });

    // article footer required?
    if (opt.author || opt.createdAt) {
      const $footer = $$("<footer/>");

      // add article author
      if (opt.author) {
        const $address = $$("<address/>");
        $address.innerText = `by ${opt.author.username}`;
        $footer.appendChild($address);
      }

      // add article creation date
      if (opt.createdAt) {
        const $time = $$("<time/>", {
          datetime: opt.createdAt,
          pubdate: "pubdate",
        });

        $time.innerHTML = opt.createdAt.toDateString();
        $footer.appendChild($time);
      }
      $ui.appendChild($footer);
    }
    target.appendChild($ui);
  },
}))();
