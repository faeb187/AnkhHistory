import {
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Chart,
} from "chart.js";
import { twoDollars as $$ } from "twodollars";

// import { observer } from "core";

import type { AnkhUiChartOptions } from "types/ui.type";

export const chart = (() => {
  const ctx = (<HTMLCanvasElement>$$.create("<canvas/>")).getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  /*observer.l({
    name: "ankh-viewport",
    handler: (x) => console.log("Viewport changed:", x),
  });*/

  return {
    init: (options: AnkhUiChartOptions) => {
      const { chartJs } = options;
      const $ui = $$.create("<div/>", { class: "ui-chart" });

      // only (well that's a lot) chartJS atm
      if (chartJs) {
        Chart.register(BarController, BarElement, CategoryScale, LinearScale);

        const $chart = new Chart(ctx, chartJs).canvas;
        $ui.appendChild($chart);
      }
      return $ui;
    },
  };
})();
