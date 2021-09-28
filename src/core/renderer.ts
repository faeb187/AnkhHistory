import { $$, loader, logger, media, observer } from "core";
import type { AnkhUiLoaded } from "types/ui.type";

export const renderer = (() => {
  let $ankh: HTMLElement;

  const renderDeferred = ($ui: HTMLElement) => {
    logger.log($ui.id, $$.find(`#_${$ui.id}`)[0]);

    const $placeholder = $$.find(`#_${$ui.id}`)[0];
    console.log("id/placeholder:", $ui.id, $placeholder);

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
    loader.getAllLoaded().forEach((loadedUi: AnkhUiLoaded, id: string) => {
      // ignore placeholders
      if (id.startsWith("_")) return;

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
    $ankh = $$.find("#ankh")[0];

    observer.l("core-loader-ui-ready", renderDeferred);
    observer.l("ankh-viewport", updateVisibility);
  };

  const render = () => {
    logger.groupCollapsed("Renderer");

    const mapLoaded = loader.getAllLoaded();
    const $df = document.createDocumentFragment();

    mapLoaded.forEach((loadedUi: AnkhUiLoaded) => {
      const { $ui, parentId = "" } = loadedUi;
      ($$.find(`#${parentId}`, $df)[0] || $df).appendChild($ui);
    });

    // @todo only render changes
    $ankh.innerHTML = "";
    $ankh.appendChild($df);

    observer.f("core-renderer-rendered");
    console.groupEnd();
  };

  return { init, render, renderDeferred };
})();
