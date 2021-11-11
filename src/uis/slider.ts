import { twoDollars as $$ } from "twodollars";
import { observer } from "core";

import type { AnkhUiSliderOptions } from "types/ui.type";

export const slider = (() => {
  const ui = {
    events: {
      toggle: (args: { event: MouseEvent; side: string }) => {
        const { side = "left" } = args;
        console.log(">>>>>><toggle:", args);

        // @todo dynamic 'sliderMain'
        $$.toggleClass(
          $$.find(`#ui-slider-front-sliderMain`)[0],
          `from-${side}`
        );
      },
    },
  };

  return {
    init: (options: AnkhUiSliderOptions) => {
      const { id } = options;
      const $back = $$.create("<div/>", {
        id: `ui-slider-back-${id}`,
        class: "ui-slider-back",
      });
      const $front = $$.create("<div/>", {
        id: `ui-slider-front-${id}`,
        class: "ui-slider-front",
      });
      const $ui = $$.create("<div/>", { id, class: "ui-slider" });

      observer.l({ name: "_ui-slider-toggle", handler: ui.events.toggle });

      $ui.appendChild($back);
      $ui.appendChild($front);

      return $ui;
    },
  };
})();
