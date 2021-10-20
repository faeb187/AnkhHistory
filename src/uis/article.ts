import $$ from "twodollars";

type AnkhUiArticle = {
  lang: string; // id to paragraph text or programming lang
  code: string; // code block with syntax highlighting
};

type AnkhUiArticleAuthor = {
  email: string;
  username: string;
  website: string;
};

type AnkhUiArticleOptions = {
  author: AnkhUiArticleAuthor;
  createdAt: Date;
  items: AnkhUiArticle[];
  target: HTMLElement;
  title: string;
};

export const article = (() => ({
  init: (opt: AnkhUiArticleOptions) => {
    let $elm;
    const { target, title, items } = opt;
    const $ui = $$.create("<article/>", { class: "ui-article" });

    // ADD article title
    const $title = $$.create("<h2/>", { "data-lang": title });
    $ui.appendChild($title);

    // ADD article items
    items.forEach((itm) => {
      // code block
      if (itm.code) {
        const $pre = $$.create("<pre/>");
        const $code = $$.create("<code/>", { class: itm.lang });
        $code.innerHTML = itm.code;
        $pre.appendChild($code);
        $elm = $$.create("<p/>").appendChild($pre);
      }
      // normal paragraph
      else $elm = $$.create("<p/>", { "data-lang": itm.lang });

      $ui.appendChild($elm);
    });

    // article footer required?
    if (opt.author || opt.createdAt) {
      const $footer = $$.create("<footer/>");

      // add article author
      if (opt.author) {
        const $address = $$.create("<address/>");
        $address.innerText = `by ${opt.author.username}`;
        $footer.appendChild($address);
      }

      // add article creation date
      if (opt.createdAt) {
        const $time = $$.create("<time/>", {
          // datetime: opt.createdAt,
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
