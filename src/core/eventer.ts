import { twoDollars } from "twodollars";

import { logger, observer } from "core";
import type { ObserverEvent } from "core/observer";

export const eventer = (() => {
  const setAttached = new Set();

  const attach = (events: ObserverEvent[]) =>
    events.forEach((event: ObserverEvent) => attachOne(event));

  const attachOne = (event: ObserverEvent) => {
    const { args = {}, name, bind } = event;

    const handler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      logger.info("[CORE][eventer]", "triggered DOM event");

      observer.f(name, { event: e, args });
    };

    if (bind) {
      const { target, type } = bind;
      const elements: HTMLElement[] =
        typeof target === "string" ? twoDollars.find(target) : [target];

      elements.forEach((element) => element.addEventListener(type, handler));
      setAttached.add(event);
    }
  };
  return { attach };
})();
