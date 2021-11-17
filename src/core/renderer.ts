import { twoDollars as $$ } from "twodollars";

import { loader, logger, media, observer } from "core";
import type { AnkhUiLoaded } from "types/ui.type";

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
    const mapLoaded = loader.getAllLoaded();
    const $df = document.createDocumentFragment();

    mapLoaded.forEach((loadedUi: AnkhUiLoaded) => {
      const { $ui, parentId = "" } = loadedUi;
      const $foundParent = $$.find(`#${parentId}`, $df)[0];
      const $parent = $foundParent || $df;

      // some UI's have specific in-UI targets
      // ...which should be replaced to keep our HTML clean
      // e.g. Accordion has targets (<detail> elements) and they belong directly inside the accordion <section>
      $foundParent && $foundParent.getAttribute("data-placeholder")
        ? (<HTMLElement>$parent.parentNode).replaceChild($ui, $parent)
        : $parent.appendChild($ui);
    });

    // @todo only render changes
    const $ankh = <HTMLDivElement>$$.find("#ankh")[0];
    $ankh.innerHTML = "";
    $ankh.appendChild($df);

    observer.f("core-renderer-rendered");
  };

  return { init, render, renderDeferred };
})();
