import { twoDollars as $$ } from "twodollars";

import { loader, logger, media, observer } from "core";
import type { AnkhUiLoaded, AnkhUiOptionMap } from "types/ui.type";

export const renderer = (() => {
  const renderDeferred = ($ui: HTMLElement) => {
    logger.log("[renderer::renderDeferred]", $ui.id, $$.find(`#_${$ui.id}`)[0]);

    const $placeholder = $$.find(`#_${$ui.id}`)[0];

    // [1] keep eventual children placeholders
    while ($placeholder.firstChild)
      $ui.appendChild($placeholder.removeChild($placeholder.firstChild));

    logger.log(
      "[renderer::renderDeferred] PRESERVED",
      Array.from($ui.childNodes)
    );

    // [2] render the received ui
    $placeholder.replaceWith($ui);

    // [3] notify subscribers (e.g. lang update)
    observer.f("core-renderer-rendered");
  };
  const updateVisibility = () => {
    loader.getAllLoaded().forEach((loadedUi: AnkhUiLoaded) => {
      const {
        uiOptions: { id, media: m },
      } = loadedUi;

      if (m) {
        const $element = $$.find(`#${id}`)[0];
        if (!$element) return;

        const before = $element.getAttribute("data-fx");
        const after = media.isInViewport(m) ? "in" : "out";
        if (before !== after) $element.setAttribute("data-fx", after);
      }
    });
  };
  const init = () => {
    // @todo do we want this?
    // observer.l({ name: "core-loader-ui-ready", handler: renderDeferred });
    observer.l({ name: "ankh-viewport", handler: updateVisibility });
  };

  const render = () => {
    const siteConfigurations = <AnkhUiOptionMap[]>(
      loader.getSiteConfigurations().get(location.pathname)
    );
    const mapLoaded = loader.getAllLoaded();
    // @todo only render changes
    const $df = document.createDocumentFragment();
    // const $df = $$.create("<div/>");
    const $ankh = <HTMLDivElement>$$.find("#ankh")[0];
    $ankh.innerHTML = "";

    siteConfigurations.forEach((siteConfiguration) => {
      const { id } = siteConfiguration;
      const uiLoaded =
        <AnkhUiLoaded>mapLoaded.get(id) || mapLoaded.get(`_${id}`);
      if (!uiLoaded) return;

      const { parentId = "", $ui } = uiLoaded;
      const $parent = $$.find(`#${parentId}`, $df)[0] || $df;
      $parent.appendChild($ui.cloneNode(true));
    });

    // @todo assume this will lose all loaded references (on site load)
    $ankh.appendChild($df);
    // $ankh.innerHTML = $df.innerHTML; // @todo  this loses the events

    observer.f("core-renderer-rendered");
  };

  return { init, render, renderDeferred };
})();
