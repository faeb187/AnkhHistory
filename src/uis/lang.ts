import { twoDollars } from "twodollars";

import { observer, state } from "core";
import { de, en } from "../app/i18n";

import type { AnkhUi, AnkhUiLangOptions } from "types/ui.type";

type Lang = "de" | "en";

export const lang: AnkhUi = (() => {
  const changeLang = (event: MouseEvent) => {
    event.preventDefault();

    const $a = event.target as HTMLElement;
    const $aParent = $a.parentNode as HTMLElement;

    observer.f("ui-lang-update", { lang: $a.getAttribute("lang") });

    $aParent &&
      twoDollars.removeClass(twoDollars.find(".active", $aParent)[0], "active");
    $a.className = "active";
  };

  const def = "de";
  const lib = { de, en };

  const init = (options: AnkhUiLangOptions) => {
    const { id, style = {} } = options;
    const lang = state.get({ id: "lang" }) || def;
    const $ui = twoDollars.create("<nav/>", { id, class: "ui-lang" });

    style && twoDollars.css($ui, style);

    // iterate through language lib
    Object.keys(lib).forEach((k) => {
      const $a = twoDollars.create("<a/>", {
        rel: "alternate",
        hreflang: k,
        lang: k,
      });

      $a.innerText = k;

      if (k === lang) $a.className = "active";

      $a.addEventListener("click", changeLang);
      $ui.appendChild($a);
    });

    observer.l({ name: "ui-lang-update", handler: update });
    observer.l({ name: "core-renderer-rendered", handler: update });

    return $ui;
  };

  type AnkhUiLangUpdateOptions = { lang: string };

  const update = (options: AnkhUiLangUpdateOptions) => {
    const { lang: l = "" } = options;

    // language by priority
    // ( direct change > localStorage > default )
    // @TODO language by geolocation
    const evaluatedLang = (l || state.get({ id: "lang" }) || def) as Lang;

    // update elements
    twoDollars.find("[data-lang]").forEach((elm: HTMLElement) => {
      const langKey = elm.getAttribute("data-lang") as string;
      const langLib = lib[evaluatedLang] as Record<string, string>;
      const v = langLib[langKey];

      if (elm.getAttribute("data-lang-rendered"))
        elm.setAttribute("data-lang-rendered", v);
      else if (elm.tagName === "IMG") elm.setAttribute("alt", v);
      else if (elm.tagName === "INPUT") elm.setAttribute("placeholder", v);
      else elm.innerHTML = v;
    });

    twoDollars.find("html")[0].setAttribute("lang", evaluatedLang);

    state.set({ id: "lang", state: evaluatedLang });

    observer.l({ name: "core-renderer-rendered", handler: update });
    observer.f("ui-lang-updated");
  };

  return { init, update };
})();
