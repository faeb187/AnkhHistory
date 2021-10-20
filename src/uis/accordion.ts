import $$ from "twodollars";

type AnkhUiAccordionOptions = {
  id: string;
  $target: HTMLElement;
};

export const accordion = (() => ({
  init: (options: AnkhUiAccordionOptions) => {
    const { id, $target } = options;
    const $ui = $$.create("<section/>", { class: "ui-accordion" });

    // @todo
    console.log(id, $target);

    return $ui;
  },
}))();
