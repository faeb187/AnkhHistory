import {
  buttonSliderToggle,
  buttonSliderToggleX,
} from "components/button.component";
import { footer, header, main } from "components/html.component";
import { lang } from "components/lang.component";
import { navMain, navMainMobile } from "components/nav.component";
import { sliderMain } from "components/slider.component";

import { AnkhMediaViewport } from "types/media.type";
import type { AnkhUiOptionMap } from "types/ui.type";

const logo = {
  attributes: { src: "assets/img/logo.png" },
  id: "logo",
  lang: "ankhorage",
  media: { max: AnkhMediaViewport.L },
  parentId: "header",
  ui: "image",
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

  footer,
  lang,
];
