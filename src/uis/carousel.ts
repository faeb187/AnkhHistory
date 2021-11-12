import { twoDollars as $$ } from "twodollars";

import type { AnkhUiCarouselOptions } from "types/ui.type";

export const carousel = (() => ({
  init: (options: AnkhUiCarouselOptions) => {
    const { id, items } = options;

    const $ui = $$.create("<div/>", { id, class: "ui-carousel" });
    const itemCount = items.length;
    const ratio = 360 / itemCount;
    const z = Math.round(400 / 2) / Math.tan(Math.PI / itemCount);
    const $carousel = $$.create("<div/>", {
      style: `transform: translateZ(-${z}px)`,
    });

    let deg = 0;

    items.forEach((item) => {
      const { text, title } = item;

      deg += ratio;

      const $item = $$.create("<div/>", {
        class: "ui-carousel-item",
        style: `transform:rotateY(${deg}deg) translateZ(${z}px)`,
      });

      title && $item.appendChild($$.create("<h4/>", { "data-lang": title }));
      text && $item.appendChild($$.create("<p/>", { innerText: text }));

      $carousel.appendChild($item);
    });
    $ui.appendChild($carousel);
    return $ui;
  },
}))();
