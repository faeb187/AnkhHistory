import { $$ } from "core";
import type { KeyValue } from "types";

type UIGridInitOptions = {
  attributes: any;
  className: string;
  element: string;
  id: string;
  inline: false;
  style?: KeyValue;
};

export const grid = (() => {
  return {
    init: (options: UIGridInitOptions) => {
      const {
        attributes = {},
        id,
        className = "",
        element = "div",
        style = {},
        inline = false,
      } = options;

      const cn = `ui-grid${inline ? "-inline" : ""} ${className}`;
      const $ui = $$(`<${element}/>`, { id, class: cn });

      $$.css($ui, style);
      $$.addAttr($ui, attributes);

      return $ui;
    },
  };
})();
