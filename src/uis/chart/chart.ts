import {
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Chart,
} from "chart.js";
import { twoDollars as $$ } from "twodollars";

import { observer } from "core";

import type { AnkhUiChartOptions } from "types/ui.type";

export const chart = (() => {
  const ctx = (<HTMLCanvasElement>$$.create("<canvas/>")).getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  return {
    init: (options: AnkhUiChartOptions) => {
      const { chartJs, id } = options;
      const $ui = $$.create("<section/>", { id, class: "ui-chart" });

      // only (well that's a lot) chartJS atm
      if (chartJs) {
        Chart.register(BarController, BarElement, CategoryScale, LinearScale);

        const chh = new Chart(ctx, chartJs);
        $ui.appendChild(chh.canvas);
      }
      observer.l({
        name: "ankh-viewport",
        handler: (x) => console.log("Viewport changed:", x),
      });
      return $ui;
    },
  };
})();
