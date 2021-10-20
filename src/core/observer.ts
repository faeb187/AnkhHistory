export type ObserverEvent = {
  args?: { [prop: string]: unknown };
  bind?: {
    target: HTMLElement | string;
    type: keyof GlobalEventHandlers;
  };
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler?: (...args: any[]) => void;
};

export const observer = (() => {
  let evs: ObserverEvent[] = [];

  return {
    l: (event: ObserverEvent): void => {
      evs.push(event);
      return this;
    },

    f: (eventName: string, dynamicArgs: Record<string, unknown> = {}) => {
      const matchedEvents = evs.filter(
        (ev: ObserverEvent) => ev.name === eventName
      );
      matchedEvents.forEach((matchedEvent: ObserverEvent) => {
        const { args = {}, handler } = matchedEvent;
        handler && handler({ ...args, ...dynamicArgs });
      });
      return this;
    },

    r: (eventName?: string) => {
      evs = evs.filter((ev: ObserverEvent) =>
        eventName ? ev.name === eventName : ev.name[0] !== "_"
      );
      return this;
    },
  };
})();
