import { $$, observer, state } from "core";
import { de, en } from "../app/i18n";

import type { ClickEvent, KeyValue } from "types/basic.type";

type AnkhUiLangOptions = {
  id: string;
  style: KeyValue;
};
type AnkhUiLangUpdateOptions = { lang: string };

export const lang = (() => {
  const changeLang = (event: ClickEvent) => {
    event.preventDefault();

    const { target: $a } = event;
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
    const $ui = $$("<nav/>", { id, class: "ui-lang" });

    style && $$.css($ui, style);

    // iterate through language lib
    const idx = 0;
    Object.keys(lib).forEach((k) => {
      const $a = $$("<a/>", {
        rel: "alternate",
        hreflang: k,
        lang: k,
      });

      $a.innerText = k;

      if (k === lang) $a.className = "active";

      $$.listen($a, "click", changeLang);
      $ui.appendChild($a);
    });

    observer.l("ui-lang-update", update);
    observer.l("core-renderer-rendered", update);

    return $ui;
  };

  const update = (options: AnkhUiLangUpdateOptions) => {
    const { lang: l = "" } = options;

    // language by priority
    // ( direct change > localStorage > default )
    // @TODO language by geolocation
    const evaluatedLang: "de" | "en" = l || state.get({ id: "lang" }) || def;

    // update elements
    $$.find("[data-lang]").forEach((elm: HTMLElement, index: number) => {
      const langKey = elm.getAttribute("data-lang") as string;
      const langLib = lib[evaluatedLang] as KeyValue;
      const v = langLib[langKey];

      if (elm.getAttribute("data-lang-rendered"))
        elm.setAttribute("data-lang-rendered", v);
      else if (elm.tagName === "IMG") elm.setAttribute("alt", v);
      else if (elm.tagName === "INPUT") elm.setAttribute("placeholder", v);
      else elm.innerHTML = v;
    });

    $$.find("html")[0].setAttribute("lang", evaluatedLang);

    state.set({ id: "lang", state: evaluatedLang });

    observer.l("core-renderer-rendered", update);
    observer.f("ui-lang-updated");
  };
})();
