type ObserverEvents = {
  [eventName: string]: ObserverEventHandler[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ObserverEventHandler = (options: any) => void;

export const observer = (() => {
  const evs: ObserverEvents = {};

  return {
    l: (ev: string, cb: ObserverEventHandler) => {
      evs[ev] = !evs[ev] ? [cb] : evs[ev].concat([cb]);
      return this;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f: (ev: string, args?: any) => {
      const cbs = evs[ev];

      if (cbs?.length) cbs.forEach((cb) => cb(args));
      return this;
    },

    r: (ev?: string) => {
      // REMOVE ONE event
      if (ev) return delete evs[ev];

      // REMOVE ALL events
      // ...except the ones with a leading underscore
      Object.keys(evs).forEach((name) => name[0] !== "_" && delete evs[name]);

      return this;
    },
  };
})();
