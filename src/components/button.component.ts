import { observer } from "core";

import { AnkhMediaViewport } from "types/media.type";

const buttonSliderToggleHandler = (args: { event: MouseEvent }): void => {
  observer.f("_ui-slider-toggle", args);
};
const buttonSliderToggle = {
  events: [
    {
      bind: { target: "#buttonSliderToggle", type: "click" },
      name: "ui-button-slider-toggle",
      handler: buttonSliderToggleHandler,
    },
  ],
  icon: "reorder-three",
  id: "buttonSliderToggle",
  media: { max: AnkhMediaViewport.L },
  parentId: "header",
  ui: "button",
};
const buttonSliderToggleX = {
  events: [
    {
      bind: { target: "#buttonSliderToggleX", type: "click" },
      handler: buttonSliderToggleHandler,
      name: "ui-button-slider-toggle-x",
    },
  ],
  id: "buttonSliderToggleX",
  icon: "close",
  media: { max: AnkhMediaViewport.L },
  parentId: "ui-slider-back-sliderMain",
  ui: "button",
};

export { buttonSliderToggle, buttonSliderToggleX };
