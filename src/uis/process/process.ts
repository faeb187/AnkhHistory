import { observer, state } from "core";

import type { AnyObject } from "types/basic.type";
import type { AnkhUiProcessOptions, AnkhUiProcessStep } from "types/ui.type";

export const process = (() => {
  const ui = {
    continue: () => {
      const activeStep = <number>(
        (state.get({ id: "prcCtrl" }) as AnyObject).activeStep
      );
      state.set({ id: "prcCtrl", state: { activeStep: activeStep + 1 } });
      ui.redirect("/processes/openProduct");
    },
    abort: () => {
      state.rm({ id: "prcCtrl" });
      ui.redirect("/");
    },
    back: () => {
      const activeStep = <number>(
        (state.get({ id: "prcCtrl" }) as AnyObject).activeStep
      );
      state.set({ id: "prcCtrl", state: { activeStep: activeStep - 1 } });
      ui.redirect("/processes/openProduct");
    },
    redirect: (path: string) => observer.f("core-site-load", { path }),
    isValidStep: (step: number, steps: AnkhUiProcessStep[]) => {
      if (typeof step !== "number") return false;
      if (step < 0 || step > steps.length - 1) return false;
      return true;
    },
  };

  return {
    init: (options: AnkhUiProcessOptions) => {
      const { gateway = false, steps } = options;
      let activeStep = <number>(
        ((state.get({ id: "prcCtrl" }) || {}) as AnyObject).activeStep
      );

      if (!ui.isValidStep(activeStep, steps)) {
        activeStep = 0;
        state.set({ id: "prcCtrl", state: { activeStep } });
      }
      if (gateway) return ui.redirect(steps[activeStep].path);

      observer.l({ name: "ui-process-continue", handler: ui.continue });
      observer.l({ name: "ui-process-abort", handler: ui.abort });
      observer.l({ name: "ui-process-back", handler: ui.back });

      return;
    },
  };
})();
