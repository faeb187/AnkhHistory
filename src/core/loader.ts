// @todo (uis as AnkhUiIndex) only once at top (somehow)
// @todo proper types (and not in this file)
// @todo '@core' doesn't work, why?

import { $$, eventer, logger, media, observer, renderer } from "core";
import { camelize } from "utils";
import { routes } from "../app/conf/routes";
import * as sites from "../app/sites";
import * as uis from "uis";

import type { Route } from "../types/basic.type";

type AnkhSite = {
  id: string;
  innerText?: string;
};

type AnkhSiteIndex = { [prop: string]: AnkhSite[] };

type UiOptions = {
  events: any;
  id: string;
  media: any;
  ui: string;
};

type AnkhUi = {
  init?: any;
};

type AnkhUiIndex = { [prop: string]: AnkhUi };

type NotLoadedUi = {
  parentId?: string;
  uiOptions: UiOptions;
  updatedParentId?: string;
  $ui?: HTMLElement;
};

export const loader = (() => {
  let mapLoaded: Map<string, NotLoadedUi>;
  let siteConfigurations: any;

  const getNotLoaded = () =>
    new Map<string, NotLoadedUi>([
      ...Array.from(mapLoaded).filter(([k, v]) => k.startsWith("_")),
    ]);

  const setRoute = (route: Route) => {
    const { path, items: subRoutes = [] } = route;

    const name = camelize(path.slice(1));
    const conf = (sites as AnkhSiteIndex)[name];

    if (conf) siteConfigurations.set(path, conf);
    else if (!subRoutes.length)
      return logger.warn("no config for site:", name, path);

    subRoutes.forEach((subRoute) => setRoute(subRoute));
  };

  const updateDeferred = () => {
    getNotLoaded().forEach(
      (
        notLoadedUi: NotLoadedUi,
        id: string,
        mapNotLoadedUis: Map<string, NotLoadedUi>
      ) => {
        const { uiOptions } = notLoadedUi;
        const { events, media: m, ui } = uiOptions;

        // [1] is the UI now in the viewport?
        if (!m || !media.isInViewport(m)) return;

        // [2] load it
        const $ui = (uis as AnkhUiIndex)[ui].init(uiOptions);
        if (!$ui) return logger.error("UI##{ui} didn't return itself");

        // [3] attach events
        events && eventer.attach(events, $ui);

        // [4] update loaded state
        mapLoaded.set(uiOptions.id, { uiOptions, $ui }).delete(id);

        // [5] delegate rendering
        // @todo setTimeout needed because direct DOM rendering (collect all and then render at once)
        setTimeout(() => renderer.renderDeferred($ui));
      }
    );
  };

  const getRoutesByPath = (path: string) => {
    let routesByPath: Route[] = [];

    const subSearch = (routes: Route[]) => {
      routes.forEach((route: Route) => {
        if (route.path === path) return (routesByPath = route.items || []);
        if (route.items) return subSearch(route.items);
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
    const subSearch = (subRoute: Route) => {
      if (siteConfigurations.get(subRoute.path))
        return (foundPath = subRoute.path);

      if (!foundPath && subRoute.items) subSearch(subRoute.items[0]);
    };

    subSearch(currentRoutes[0]);
    return foundPath;
  };

  const initUi = (uiOptions: any) => {
    const { events, id, ui, media: m, parentId } = uiOptions;

    // [1] identification & classification
    if (!id || !ui)
      return logger.error(`UI 'id:${id}' and 'ui:${ui}' required`);

    // [2] already loaded? ...great
    const loadedUi = mapLoaded.get(id);
    if (loadedUi) {
      logger.log(
        `%ccached %c #${id} (parent: ${parentId})`,
        "color: #bfb",
        "color: #fff"
      );
      return;
    }

    // [3] do we need to load it?
    const hasDeferredParent = !!mapLoaded.get(`_${parentId}`);
    const isVisible = !m || media.isInViewport(m);

    if (hasDeferredParent || !isVisible) {
      const updatedId = `_${id}`;
      const updatedParentId = `${(hasDeferredParent && "_") || ""}${parentId}`;

      if (id === "navToggleX")
        console.log("navToggleX:", updatedId, updatedParentId);

      mapLoaded.set(updatedId, { uiOptions, updatedParentId });
      logger.log(
        `%cdeferred %c ${id} (parent: ${updatedParentId}`,
        "color: #ff0",
        "color: #fff"
      );

      // [3.1] ui or its parent is deferred
      // ...skip loading, set placeholder
      return mapLoaded.set(updatedId, {
        uiOptions,
        $ui: $$("<div/>", { id: updatedId, "data-fx": "out" }),
        parentId: updatedParentId,
      });
    }

    // [4] load it
    const $ui = (uis as AnkhUiIndex)[ui].init(uiOptions);

    // [4][NOK] loading error
    if (!$ui)
      return logger.error(
        `UI '${(uis as AnkhUiIndex)[ui]}' didn't return itself`,
        uiOptions
      );

    // [5] attach events
    events && eventer.attach(events, $ui);

    // [6] register loaded ui
    mapLoaded.set(id, { $ui, uiOptions, parentId });
    logger.info(
      `%cloaded %c #${id} (parent: ${parentId}`,
      "color: #0f0",
      "color: #fff"
    );
  };

  const loadSite = (path: string) => {
    logger.groupCollapsed("Loader:loadSite");

    // [1] get site configuration
    const currentPath = getCurrentPath(path);
    logger.log("currentPath", currentPath);

    const siteUis = siteConfigurations.get(currentPath) || {};
    if (!siteUis) return logger.error("bad config: no site available");
    logger.log("siteUis", siteUis);

    // [2] navigate to current site
    $$.history.go(currentPath, currentPath.split("/").pop()!); // @todo check this again (!)

    // [3] prepare/load the ui's
    siteUis.forEach((ui: any) => initUi(ui));

    logger.log("mapLoaded", mapLoaded);
    logger.log("siteConfigurations", siteConfigurations);
    logger.groupEnd();
  };

  const getAllLoaded = () => mapLoaded;

  const init = () => {
    logger.groupCollapsed("Loader:init");

    // [1] initialize maps
    mapLoaded = new Map<string, NotLoadedUi>();
    siteConfigurations = new Map();

    // [2] set app routes
    routes.forEach((route: Route) => setRoute(route));
    logger.log("siteConfigurations", siteConfigurations);

    // [3] update deferred UI's on viewport change
    observer.l("ankh-viewport", updateDeferred);

    logger.groupEnd();
  };

  return { getAllLoaded, loadSite, init };
})();
