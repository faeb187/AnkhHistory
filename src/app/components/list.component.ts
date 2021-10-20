import { routes } from "../conf/routes";

export const navMobile = {
  ui: "list",
  items: routes,
  role: "navigation",
  style: {
    gridColumn: "2 / 24",
    gridRow: "4 / -4",
  },
  events: [{ name: "core-site-load", selector: "a", type: "click" }],
};
