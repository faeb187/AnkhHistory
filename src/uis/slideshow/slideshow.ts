import { twoDollars as $$ } from "twodollars";

import type {
  AnkhUiSlideshowItem,
  AnkhUiSlideshowOptions,
} from "types/ui.type";

export const slideshow = (() => {
  const ui = {
    addItem: (img: AnkhUiSlideshowItem, $slider: HTMLElement) => {
      const { alt, src, title, text } = img;
      const $figure = $$.create("<figure/>");
      const $img = $$.create("<img/>", { src, "data-href": alt });
      const $figCaption = $$.create("<figcaption/>");

      title &&
        $figCaption.appendChild($$.create("<h1/>", { "data-lang": title }));

      text && $figCaption.appendChild($$.create("<p/>", { "data-lang": text }));

      $figure.appendChild($img);
      $figure.appendChild($figCaption);
      $slider.appendChild($figure);
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
    init: (options: AnkhUiSlideshowOptions) => {
      const { id, interval = 8000, items } = options;
      const $ui = $$.create("<section/>", { id, class: "ui-slideshow" });
      const $slider = $$.create("<figure/>");

      items.forEach((item) => ui.addItem(item, $slider));

      ui.slide(interval, $slider);

      $ui.appendChild($slider);

      return $ui;
    },
  };
})();
