/**
 * @todo innerHTML is set, maybe innerText would be right (HTML is parsed atm)
 */
import { twoDollars as $$ } from "twodollars";

import { times } from "utils/basic.util";

import type { KeyValue } from "types/basic.type";
import type { AnkhUiDetailsOptions } from "types/ui.type";

export const details = (() => {
  const init = (options: AnkhUiDetailsOptions) => {
    const {
      id,
      open = false,
      summary: { lang: summaryLang },
      targets = 1,
    } = options;

    const attributes: KeyValue = { id, class: "ui-details" };
    if (open) attributes.open = "true";

    const $ui = $$.create("<details/>", { id, ...attributes });
    const $summary = $$.create("<summary/>", { "data-lang": summaryLang });

    $ui.appendChild($summary);

    times(targets)((i: number) =>
      $ui.prepend(
        $$.create("<div/>", { "data-placeholder": "true", id: `${id}-${i}` })
      )
    );
    return $ui;
  };
  return { init };
})();
