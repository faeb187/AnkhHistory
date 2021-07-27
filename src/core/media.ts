import { observer } from "core";

type Breakpoints = {
  [bp: string]: number;
};

type Media = {
  max: string;
  min: string;
};

export const media = (() => {
  // breakpoints
  // [!] in sync with rupture
  let bps: Breakpoints = {
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
    const viewportBefore = viewport;

    viewport = getViewportName(vpW);

    if (viewport !== viewportBefore) observer.f("ankh-viewport", viewport);
  };

  return {
    isInViewport: (media: Media) => {
      const vpW = window.innerWidth;
      const min = bps[media.min];
      const max = bps[media.max];

      if (min && vpW <= min) return false;
      if (max && vpW > max) return false;
      return true;
    },
    init: () => {
      const resizeTimeout = setTimeout(onResizeDone, 200);
      const handleResize = () => {
        clearTimeout(resizeTimeout);
      };
      window.addEventListener("resize", handleResize);
    },
  };
})();
