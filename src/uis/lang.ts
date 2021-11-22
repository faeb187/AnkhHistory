// @todo investigate if it's ok this UI access all the others
// ...probably better to fire lang update events
import { twoDollars as $$ } from "twodollars";

import { observer, state } from "core";
import { de, en } from "../app/i18n";

import type { KeyValue } from "types/basic.type";
import type { AnkhUiLangOptions } from "types/ui.type";

type Lang = "de" | "en";

export const lang = (() => {
  const changeLang = (args: { event: MouseEvent }) => {
    const { event } = args;
    event.preventDefault();

    const $a = event.target as HTMLElement;
    const $aParent = $a.parentNode as HTMLElement;

    observer.f("ui-lang-update", { lang: $a.getAttribute("lang") });

    $aParent && $$.removeClass($$.find(".active", $aParent)[0], "active");
    $a.className = "active";
  };
  const def = "de";
  const lib = { de, en };

  const init = (options: AnkhUiLangOptions) => {
    const { id, style = {} } = options;
    const lang = state.get({ id: "lang" }) || def;
    const $ui = $$.create("<nav/>", { id, class: "ui-lang" });

    style && $$.css($ui, style);

    // iterate through language lib
    Object.keys(lib).forEach((k) => {
      const $a = $$.create("<a/>", {
        rel: "alternate",
        hreflang: k,
        lang: k,
      });
      $a.innerText = k;

      if (k === lang) $a.className = "active";

      $ui.appendChild($a);
    });

    observer.l({ name: "ui-lang-change", handler: changeLang });
    observer.l({ name: "ui-lang-update", handler: update });
    observer.l({ name: "core-renderer-rendered", handler: update });

    return $ui;
  };

  const update = (options: { lang: string }) => {
    const { lang: l = "" } = options;

    // language by priority
    // ( direct change > localStorage > default )
    // @todo language by geolocation
    const evaluatedLang = (l || state.get({ id: "lang" }) || def) as Lang;

    // update elements
    $$.find("[data-lang]").forEach((elm: HTMLElement) => {
      const langKey = elm.getAttribute("data-lang") as string;
      const langLib = lib[evaluatedLang] as KeyValue;
      const v = langLib[langKey];

      if (elm.getAttribute("data-lang-rendered"))
        elm.setAttribute("data-lang-rendered", v);
      else if (elm.tagName === "IMG") elm.setAttribute("alt", v);
      else if (elm.tagName === "INPUT")
        elm.getAttribute("type") === "submit"
          ? ((<HTMLInputElement>elm).value = v)
          : elm.setAttribute("placeholder", v);
      else elm.innerHTML = v;
    });

    $$.find("html")[0].setAttribute("lang", evaluatedLang);

    state.set({ id: "lang", state: evaluatedLang });

    observer.f("ui-lang-updated");
  };

  return { init, update };
})();
