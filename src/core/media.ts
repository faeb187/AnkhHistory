import { observer } from "core";
import { debounce } from "utils/basic.util";

import type { AnkhMediaOptions } from "types/media.type";

export const media = (() => {
  // breakpoints
  // [!] in sync with rupture
  const bps = {
    xs: 0,
    s: 400,
    m: 500,
    l: 800,
    xl: 1050,
    hd: 1800,
  };
  let viewport = "";

  const getViewportName = (vpW: number) => {
    if (vpW >= 0 && vpW < 400) return "xs";
    if (vpW >= 400 && vpW < 500) return "s";
    if (vpW >= 500 && vpW < 800) return "m";
    if (vpW >= 800 && vpW < 1050) return "l";
    if (vpW >= 1050 && vpW < 1800) return "xl";
    return "hd";
  };

  const onResizeDone = () => {
    const vpW = window.innerWidth;
    // const viewportBefore = viewport;

    viewport = getViewportName(vpW);

    observer.f("ankh-viewport", { viewport });
  };

  return {
    isInViewport: (mediaOptions: AnkhMediaOptions) => {
      const { max, min } = mediaOptions;
      const vpW = window.innerWidth;
      const minValue = min && bps[min];
      const maxValue = max && bps[max];

      if (minValue && vpW <= minValue) return false;
      if (maxValue && vpW > maxValue) return false;
      return true;
    },
    init: () => {
      window.addEventListener("resize", debounce(onResizeDone));
      observer.l({ name: "core-renderer-rendered", handler: onResizeDone });
    },
  };
})();
