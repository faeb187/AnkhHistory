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
  {
    id: "flower",
    parentId: "main",
    ui: "flower",
  },
  {
    id: "chess",
    parentId: "main",
    ui: "chess",
  },

  footer,
  lang,
];
