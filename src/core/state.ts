import { AnyObject } from "types/basic.type";

type State = string | AnyObject;

export const state = (() => {
  const prefix = location.host + "-";
  const ls = {
    set: (id: string, state: State) => {
      if (typeof state !== "string") state = JSON.stringify(state);
      localStorage.setItem(`${prefix}${id}`, state);
    },
    get: (id: string) => {
      const s = localStorage.getItem(`${prefix}${id}`);
      return s && s.slice(0, 1) === "{" ? (JSON.parse(s) as State) : s;
    },
    rm: (id: string) => {
      localStorage.removeItem(`${prefix}${id}`);
    },
  };

  return {
    set: (opt: { id: string; state: State }) => {
      ls.set(opt.id, opt.state);
    },
    get: (opt: { id: string }) => ls.get(opt.id),
    rm: (opt: { id: string }) => ls.rm(opt.id),
  };
})();
