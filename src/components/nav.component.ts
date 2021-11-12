import { AnkhMediaViewport } from "types/media.type";

const navMain = {
  id: "navMain",
  media: { min: AnkhMediaViewport.L },
  parentId: "header",
  ui: "nav",
};

const navMainMobile = {
  id: "navMainMobile",
  media: { max: AnkhMediaViewport.L },
  parentId: "ui-slider-back-sliderMain",
  ui: "nav",
};

export { navMain, navMainMobile };

/*
export const navPartner = {
  ...common,
  id: "navPartner",
  attributes: {
    "aria-label": "Partner",
    "data-level": 1,
  },
  items: [
    {
      lang: "products",
      path: "/partner/products",
    },
    {
      lang: "additionalProducts",
      path: "/partner/additionalProducts",
    },
  ],
};
*/
