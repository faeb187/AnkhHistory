import { observer } from "core";

import {
  buttonSliderToggle,
  buttonSliderToggleX,
} from "components/button.component";
import { footer, header, main } from "components/html.component";
import { logo } from "components/image.component";
import { lang } from "components/lang.component";
import { navMain, navMainMobile } from "components/nav.component";
import { sliderMain } from "components/slider.component";

import type { AnkhUiOptionMap } from "types/ui.type";

const flower = {
  id: "flower",
  parentId: "main",
  ui: "flower",
};

export const home: AnkhUiOptionMap[] = [
  sliderMain,

  // sliderMain back
  buttonSliderToggleX,
  navMainMobile,

  // sliderMain front
  header,
  logo,
  navMain,
  buttonSliderToggle,

  main,
  flower,
  {
    events: [
      {
        bind: { target: ".ui-chess-board-piece", type: "dragstart" },
        name: "ui-chess-board-piece-dragstart-{unique}",
        handler: (args: { event: DragEvent }) =>
          observer.f("ui-chess-board-piece-dragstart", args),
      },
      {
        bind: { target: ".ui-chess-board-square", type: "dragover" },
        name: "ui-chess-board-dragover-obsolete",
        handler: (args: { event: DragEvent }): false => {
          args.event.preventDefault();
          return false;
        },
      },
      {
        bind: { target: ".ui-chess-board-square", type: "drop" },
        name: "ui-chess-board-drop-obsolete",
        handler: (args: { event: DragEvent }): false => {
          args.event.preventDefault();
          observer.f("ui-chess-board-drop", args);
          return false;
        },
      },
    ],
    id: "chess",
    parentId: "main",
    ui: "chess",
  },

  footer,
  lang,
];
