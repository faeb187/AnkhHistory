import { twoDollars } from "twodollars";

import { loader, logger, media, observer } from "core";
import type { AnkhUiLoaded } from "types/ui.type";

export const renderer = (() => {
  const renderDeferred = ($ui: HTMLElement) => {
    logger.log($ui.id, twoDollars.find(`#_${$ui.id}`)[0]);

    const $placeholder = twoDollars.find(`#_${$ui.id}`)[0];

    // [1] keep eventual children placeholders
    while ($placeholder.firstChild)
      $ui.appendChild($placeholder.removeChild($placeholder.firstChild));

    logger.log("PRESERVED", Array.from($ui.childNodes));

    // [2] render the received ui
    $placeholder.replaceWith($ui);

    // [3] notify subscribers (e.g. lang update)
    observer.f("core-renderer-rendered");
  };
  const updateVisibility = () => {
    logger.title("[renderer::updateVisibility]");
    loader.getAllLoaded().forEach((loadedUi: AnkhUiLoaded) => {
      const {
        $ui,
        uiOptions: { media: m },
      } = loadedUi;

      if (m) {
        const before = $ui.getAttribute("data-fx");
        const after = media.isInViewport(m) ? "in" : "out";
        if (before !== after) $ui.setAttribute("data-fx", after);
      }
    });
  };
  const init = () => {
    observer.l({ name: "core-loader-ui-ready", handler: renderDeferred });
    observer.l({ name: "ankh-viewport", handler: updateVisibility });
  };

  const render = () => {
    logger.groupCollapsed("Renderer");

    const mapLoaded = loader.getAllLoaded();
    const $df = document.createDocumentFragment();

    mapLoaded.forEach((loadedUi: AnkhUiLoaded) => {
      const { $ui, parentId = "" } = loadedUi;
      (twoDollars.find(`#${parentId}`, $df)[0] || $df).appendChild($ui);
    });

    // @todo only render changes
    const $ankh = <HTMLDivElement>twoDollars.find("#ankh")[0];
    $ankh.innerHTML = "";
    $ankh.appendChild($df);

    observer.f("core-renderer-rendered");
    console.groupEnd();
  };

  return { init, render, renderDeferred };
})();
