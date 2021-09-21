type ObserverEvents = {
  [eventName: string]: any[];
};

export const observer = (() => {
  let evs: ObserverEvents = {};

  return {
    l: (ev: string, cb: any) => {
      !evs[ev] ? (evs[ev] = [cb]) : (evs[ev] = evs[ev].concat([cb]));

      return this;
    },
    f: (ev: string, arg: any = {}) => {
      const cbs = evs[ev];
      if (!cbs?.length) return this;

      cbs.forEach((cb) => cb(arg));
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
