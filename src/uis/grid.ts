import $$ from "twodollars";
import type { AnkhUiGridOptions } from "types/ui.type";

export const grid = (() => {
  return {
    init: (options: AnkhUiGridOptions) => {
      const {
        attributes = {},
        className = "",
        element = "div",
        id,
        inline = false,
        style = {},
      } = options;

      const cn = `ui-grid${inline ? "-inline" : ""} ${className}`;
      const $ui = $$.create(`<${element}/>`, { id, class: cn });

      $$.css($ui, style);
      $$.addAttr($ui, attributes);

      return $ui;
    },
  };
})();
