import { twoDollars as $$ } from "twodollars";
import type { AnkhUiCountdownOptions } from "types/ui.type";

export const countdown = (() => {
  let $ui: HTMLElement;
  let interval: NodeJS.Timer;
  let remainingSeconds: number;

  const ui = {
    $tpl: $$.create("<div/>", { class: "ui-countdown" }),

    update: (to: Date) => {
      remainingSeconds = new Date(+to - +new Date()).getSeconds();

      if (remainingSeconds <= 0) {
        clearInterval(interval);
        remainingSeconds = 0;
      }

      $ui.innerText = remainingSeconds.toString();
    },
  };

  return {
    init: (options: AnkhUiCountdownOptions) => {
      const { id, to } = options;

      remainingSeconds = new Date(+to - +new Date()).getSeconds();

      $ui = <HTMLElement>ui.$tpl.cloneNode();
      $ui.id = id;
      $ui.innerText = remainingSeconds.toString();

      interval = setInterval(() => ui.update(to), 1000);

      return $ui;
    },
  };
})();
