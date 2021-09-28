import { logger } from "core";

type AnkhStat = {
  label: string;
  start: Date;
  stop: Date;
};

export const measure = (() => {
  // const mapMeasures = new Map();
  let capture: AnkhStat;

  return {
    start: (label: string) => {
      capture.label = label;
      capture.start = new Date();
    },

    stop: () => {
      capture.stop = new Date();
      const resultInMs = Math.abs(+capture.stop - +capture.start);
      logger.info("[stats]", `${capture.label}: ${resultInMs}ms`);
      return resultInMs;
    },
  };
})();
