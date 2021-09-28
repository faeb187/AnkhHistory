/**
 * UI accordion
 */
import { $$ } from "core";

type AnkhUiAccordionOptions = {
  id: string;
  $target: HTMLElement;
};

export const accordion = (() => ({
  init: (options: AnkhUiAccordionOptions) => {
    const { id, $target } = options;
    const $ui = $$("<section/>", { class: "ui-accordion" });

    // @todo
    console.log(id, $target);

    return $ui;
  },
}))();
