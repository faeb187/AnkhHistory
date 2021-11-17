// @todo (uis as AnkhUiIndex) only once at top (somehow)
// @todo proper types (and not in this file)
import { twoDollars as $$ } from "twodollars";

// @todo import renderer??? use observer.f()
import { logger, media, observer, renderer } from "core";
import { camelize } from "utils";
import { routes } from "app/routes";
import * as sites from "app/sites";
import * as uis from "uis";

import type { ObserverEvent } from "core/observer";
import type { AnkhRoute } from "types/route.type";
import type { AnkhSite } from "types/site.type";
import type {
  AnkhUiModules,
  AnkhUiLoaded,
  AnkhUiNotLoaded,
  AnkhUiOptions,
} from "types/ui.type";

export const loader = (() => {
  let mapLoaded: Map<string, AnkhUiLoaded>;
  let siteConfigurations: Map<string, AnkhUiOptions[]>;

  const getNotLoaded = () =>
    new Map<string, AnkhUiNotLoaded>([
      ...Array.from(mapLoaded).filter(([k]) => k.startsWith("_")),
    ]);
  const setRoute = (route: AnkhRoute) => {
    const { path, routes: subRoutes = [] } = route;

    const name = camelize(path.slice(1));
    const conf = (sites as AnkhSite)[name];

    if (conf) siteConfigurations.set(path, conf);
    else if (!subRoutes.length)
      return logger.warn("[loader::setRoute] no config for site:", name, path);

    subRoutes.forEach((subRoute: AnkhRoute) => setRoute(subRoute));
  };
  const updateDeferred = () => {
    getNotLoaded().forEach((notLoadedUi: AnkhUiNotLoaded, id: string) => {
      const {
        uiOptions,
        uiOptions: { media: m, ui },
      } = notLoadedUi;

      // [1] is the UI now in the viewport?
      if (!m || !media.isInViewport(m)) return;

      // [2] load it
      const $ui = (uis as AnkhUiModules)[ui].init(uiOptions);
      if (!$ui)
        return logger.error(
          `[loader::updateDeferred] UI#${ui} didn't return itself`
        );

      // [3] register for event update (after rendering)
      observer.l({ handler: updateEvents, name: "core-renderer-rendered" });

      // [4] update loaded state
      mapLoaded.set(uiOptions.id, { uiOptions, $ui }).delete(id);

      // [5] delegate rendering
      // @todo setTimeout needed because direct DOM rendering (collect all and then render at once)
      // @todo needed? setTimeout(() => renderer.renderDeferred($ui));
      renderer.renderDeferred($ui);
    });
  };
  const getRoutesByPath = (path: string) => {
    let routesByPath: AnkhRoute[] = [];

    const subSearch = (routes: AnkhRoute[]) => {
      routes.forEach((route: AnkhRoute) => {
        if (route.path === path) return (routesByPath = route.routes || []);
        if (route.routes) return subSearch(route.routes);
      });
    };

    subSearch(routes);
    return routesByPath;
  };
  const getCurrentPath = (path: string): string => {
    if (siteConfigurations.get(path)) return path;

    let foundPath = "";
    const currentRoutes = getRoutesByPath(path);

    // default site on 404
    if (!currentRoutes.length) return getCurrentPath(routes[0].path);

    // recursive sub search (only the first item)
    const subSearch = (subRoute: AnkhRoute) => {
      if (siteConfigurations.get(subRoute.path))
        return (foundPath = subRoute.path);

      if (!foundPath && subRoute.routes) subSearch(subRoute.routes[0]);
    };

    subSearch(currentRoutes[0]);
    return foundPath;
  };
  const initUi = (uiOptions: AnkhUiOptions) => {
    const { id, media: m, parentId = "ankh", ui } = uiOptions;

    // [1] already loaded? ...great
    if (mapLoaded.get(id))
      return logger.info(
        `[loader::initUi] %ccached #${id} (parent: ${parentId})`,
        "color: #dbd"
      );

    // [2] do we need to load it?
    const hasDeferredParent = !!mapLoaded.get(`_${parentId}`);
    const isVisible = !m || media.isInViewport(m);

    // [2.1] ui or its parent is deferred
    // ...skip loading, add a placeholder instead
    if (hasDeferredParent || !isVisible) {
      const deferredId = `_${id}`;
      const deferredParentId = `${(hasDeferredParent && "_") || ""}${parentId}`;

      // mapLoaded.set(updatedId, { uiOptions, updatedParentId });
      logger.info(
        `[loader::initUi] %cdeferred ${id} (parent: ${deferredParentId}`,
        "color: #dd8"
      );

      return mapLoaded.set(deferredId, {
        uiOptions,
        $ui: $$.create("<div/>", { id: deferredId, "data-fx": "out" }),
        parentId: deferredParentId,
      });
    }

    // [3] we need to load it – let's go!
    const $ui = (uis as AnkhUiModules)[ui].init(uiOptions);

    // [3.1][ERR] bad UI config – reject
    if (!$ui)
      return logger.error(
        "[loader::initUi]",
        `UI '${ui}' didn't return itself`,
        uiOptions
      );

    // [4] register loaded ui
    mapLoaded.set(id, { $ui, uiOptions, parentId });
    logger.log(
      `[loader::initUi] %cloaded #${id} (parent: ${parentId}`,
      "color: #8d8"
    );
  };
  const loadSite = (path: string) => {
    logger.groupCollapsed("loader::loadSite");

    // [1] get site configuration
    const currentPath = getCurrentPath(path);
    logger.log("[loader::loadSite] currentPath:", currentPath);

    const siteUis = siteConfigurations.get(currentPath) || [];
    if (!siteUis)
      return logger.error("[loader::loadSite] bad config: no site available");
    logger.log("[loader::loadSite] siteUis:", siteUis);

    // [2] navigate to current site
    $$.history.go(currentPath, currentPath);

    // [3] prepare/load the ui's
    logger.groupCollapsed("=> loader::initUi");
    siteUis.forEach((ui: AnkhUiOptions) => initUi(ui));
    logger.groupEnd();

    // [4] register for event upddae (after rendering)
    observer.l({ handler: updateEvents, name: "core-renderer-rendered" });

    logger.log("[loader::loadSite] mapLoaded:", mapLoaded);
    logger.log("[loader::loadSite] siteConfigurations:", siteConfigurations);
    logger.groupEnd();
  };
  const getAllLoaded = () => mapLoaded;
  const init = () => {
    // [1] initialize maps
    mapLoaded = new Map();
    siteConfigurations = new Map();

    // [2] set app routes
    routes.forEach((route: AnkhRoute) => setRoute(route));
    logger.log("[loader::init] siteConfigurations:", siteConfigurations);

    // [3] update deferred UI's on viewport change
    observer.l({ name: "ankh-viewport", handler: updateDeferred });
  };
  // @todo don't update every UI (overhead)
  const updateEvents = () => {
    getAllLoaded().forEach((loadedUi) => {
      if (loadedUi.$ui.id.startsWith("_"))
        return logger.info("[loader::updateEvents] skipped:", loadedUi.$ui.id);

      const {
        uiOptions: { events },
      } = loadedUi;

      if (!events) return;

      logger.log(
        "[loader::updateEvents] UI id: ",
        loadedUi.uiOptions.id,
        events
      );
      events?.forEach((event: ObserverEvent) => observer.r(event).l(event));
    });
  };

  return { getAllLoaded, loadSite, init };
})();
