/**
  ANKH
  @todo no direct access between CORE modules (handle it here)
*/
// import { ankh } from "./app/ankh";
import { loader, logger, media, renderer, observer } from "core";

const init = (path: string) => {
  loader.loadSite(path);
  return renderer.render();
};

logger.title("ANKHORAGE");

// [1] init core modules
loader.init();
media.init();
renderer.init();

// [2] init site
init(location.pathname);

// [3] listen for site requests
observer.l("core-site-load", (options: any) => {
  const href = options.event.target.getAttribute("href");

  if (!href) return logger.error("core-site-load called without 'href'");
  init(href);
});
