/**
 * UI accordion
 */
import { $$, observer } from "core";

// @PARAM  opt.id      MAN {string}      ui id
// @PARAM  opt.ids     OPT {json}        ui-details configs
// @PARAM  $target     MAN {HTMLElement} ui target
type UiAccordionOptions = {
  id: string;
  $target: HTMLElement;
};

export const accordion = (() => ({
  init: (options: UiAccordionOptions) => {
    const { id, $target } = options;
    return $$("<section/>", { class: "ui-accordion" });
  },
}))();
