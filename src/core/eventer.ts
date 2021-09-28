import { $$, logger, observer } from "core";
import type { AnkhEventDom } from "types/event.type";

export const eventer = (() => {
  const setAttached = new Set();

  const attachOne = (ankhEvent: AnkhEventDom) => {
    $$.listen(ankhEvent);
    setAttached.add(ankhEvent);
    return;
  };

  const attach = (events: AnkhEventDom[], target: HTMLElement) => {
    events.forEach((event: AnkhEventDom) => {
      const { args = {}, name, type } = event;

      const handler = (e: Event) => {
        logger.info("[CORE][eventer]", "triggered: #{eventName}");
        e.preventDefault();
        e.stopPropagation();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        observer.f(name!, { event: e, args });
      };
      if (!args.selector) return attachOne(event);

      $$.find(args.selector, target).forEach((subTarget: HTMLElement) => {
        attachOne({
          name,
          target: subTarget,
          type,
          handler,
        });
        return;
      });
    });
  };
  return { attach };
})();
