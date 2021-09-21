import { $$, logger, observer } from "core";

export const eventer = (() => {
  const supportedTypes = ["click", "init"];
  const setAttached = new Set();

  const attachOne = (ankhEvent: any) => {
    const { eventName, $target, type, handler } = ankhEvent;

    if (!$target || !type || !handler) {
      logger.warn("event skipped: [#{ankhEvent[1]}]", ankhEvent[0]);
      return;
    }
    $$.listen($target, type, handler);
    setAttached.add({ name: eventName, $target, type, handler });
    return;
  };

  const attach = (events: any, $target: HTMLElement) => {
    Object.keys(events).forEach((type) => {
      if (!supportedTypes.includes(type))
        return logger.warn("[CORE][eventer]", "unsupported type: #{type}");

      events[type].forEach((event: any) => {
        // @todo refactoring event types
        if (type === "init") {
          const { l, f, args = {} } = event;
          observer.l(l, () => observer.f(f, { args, type, $target }));
          return;
        }

        const { name: eventName, args = {} } = event;

        const handler = (e: any) => {
          logger.info("[CORE][eventer]", "triggered: #{eventName}");
          e.preventDefault();
          e.stopPropagation();
          observer.f(eventName, { event: e, args: event.args });
        };

        if (!args.selector)
          return attachOne({ eventName, $target, type, handler });

        $$.find(args.selector, $target).forEach(($subTarget: HTMLElement) => {
          attachOne({ eventName, type, handler, $target: $subTarget });
          return;
        });
      });
    });
  };
  return { attach };
})();
