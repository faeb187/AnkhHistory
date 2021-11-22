import { observer } from "core";

import { AnkhMediaViewport } from "types/media.type";

const handler = (args: { event: MouseEvent }): void => {
  observer.f("ui-slider-toggle", args);
};

const buttonSliderToggle = {
  events: [
    {
      handler,
      bind: { target: "#buttonSliderToggle", type: "click" },
      name: "ui-button-slider-toggle",
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
      handler,
      bind: { target: "#buttonSliderToggleX", type: "click" },
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
