import { copy } from "utils";
import { routes } from "app/routes";

import { footer, header, main } from "components/html.component";
import { lang } from "components/lang.component";
import { navMain } from "components/nav.component";

import type { AnkhUiOptionMap } from "types/ui.type";

const navRoutes = routes.map((route) => ({
  ...route,
  attributes: { href: route.path, "data-lang": route.lang },
}));
const uisNavMain = { ...copy(navMain), items: copy(navRoutes) };

export const home: AnkhUiOptionMap[] = [
  // header
  copy(header),
  { ...copy(uisNavMain), parentId: "header" },

  // main
  copy(main),

  // footer
  copy(footer),
  { ...copy(lang), parentId: "footer" },
];
