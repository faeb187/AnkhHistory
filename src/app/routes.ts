import type { AnkhRoute } from "types/route.type";

const home: AnkhRoute = { lang: "home", path: "/home" };
const uis: AnkhRoute = { lang: "uis", path: "/uis" };

export const routes = [home, uis];
