import { twoDollars } from "twodollars";
import type { AnkhUi, AnkhUiGridOptions } from "types/ui.type";

export const grid: AnkhUi = (() => {
  return {
    init: (options: AnkhUiGridOptions) => {
      const {
        attributes = {},
        className = "",
        element = "div",
        id,
        inline = false,
        style,
      } = options;

      const cn = `ui-grid${inline ? "-inline" : ""} ${className}`;
      const $ui = twoDollars.create(`<${element}/>`, { id, class: cn });

      style && twoDollars.css($ui, style);
      twoDollars.addAttr($ui, attributes);

      return $ui;
    },
  };
})();
