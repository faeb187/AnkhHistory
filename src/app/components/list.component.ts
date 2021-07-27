import { routes } from "../conf/routes";

export const navMobile = {
  ui: "list",
  items: routes,
  role: "navigation",
  style: {
    gridColumn: "2 / 24",
    gridRow: "4 / -4",
  },
  events: {
    click: [{ name: "core-site-load", args: { selector: "a" } }],
    init: [{ l: "core-renderer-rendered", f: "ui-list-update" }],
  },
};
