import { v4 as uuidv4 } from "uuid";

import { observer } from "core";

const lang = {
  events: [
    {
      bind: { target: "#lang a", type: "click" },
      name: `ui-lang-a-click-${uuidv4()}`,
      handler: (args: { event: MouseEvent }): void => {
        observer.f("ui-lang-change", args);
      },
    },
  ],
  id: "lang",
  parentId: "footer",
  ui: "lang",
};

export { lang };
