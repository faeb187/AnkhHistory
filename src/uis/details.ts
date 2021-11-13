/**
 * @todo innerHTML is set, maybe innerText would be right (HTML is parsed atm)
 */
import { observer } from "core";
import { twoDollars as $$ } from "twodollars";

import type { KeyValue } from "types/basic.type";
import type { AnkhUiDetailsOptions } from "types/ui.type";

export const details = (() => {
  const init = (options: AnkhUiDetailsOptions) => {
    const {
      id,
      items,
      open = false,
      summary: { lang: summaryLang },
    } = options;

    const attributes: KeyValue = { id, class: "ui-details" };
    if (open) attributes.open = "true";

    const $ui = $$.create("<details/>", attributes);
    const $summary = $$.create("<summary/>", { "data-lang": summaryLang });

    $ui.appendChild($summary);
    items.forEach((id: string) => $ui.append($$.create("<div/>", { id })));

    return $ui;
  };
  return { init };
})();
