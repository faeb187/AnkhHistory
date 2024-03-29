import { twoDollars as $$ } from "twodollars";
import type { AnkhUiGalleryItem, AnkhUiGalleryOptions } from "types/ui.type";

export const gallery = (() => {
  const ui = {
    addImage: (img: AnkhUiGalleryItem, $ul: HTMLElement) => {
      const { alt, src, title, text } = img;
      const $li = $$.create("<li/>");
      const $img = $$.create("<img/>", {
        src,
        "data-href": alt,
      });

      title && $li.appendChild($$.create("<h1/>", { "data-lang": title }));
      text && $li.appendChild($$.create("<p/>", { "data-lang": text }));

      $li.appendChild($img);
      $ul.appendChild($li);
    },
    slide: (interval: number, $ul: HTMLElement) => {
      const itmC = $$.find("li", $ul).length;
      const maxL = itmC * -100;
      let pos = 0;

      // START slide interval
      setInterval(() => {
        // GET next position
        pos -= 100;

        // LAST image
        pos === maxL && (pos = 0);

        // SLIDE to next image
        $$.css($ul, { marginLeft: `${pos}vw` });
      }, interval);
    },
  };

  return {
    init: (options: AnkhUiGalleryOptions) => {
      const { id, interval = 8000, items } = options;
      const $ui = $$.create("<section/>", { class: "ui-gallery" });
      const $ul = $$.create("<ul/>");

      $ui.id = id;

      items.forEach((item) => ui.addImage(item, $ul));

      $ui.appendChild($ul);

      ui.slide(interval, $ul);

      return $ui;
    },
  };
})();
