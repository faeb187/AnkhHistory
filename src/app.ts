// @todo no direct access between CORE modules (handle it here)
// @todo generate a sequence diagram from comments, e.g. // [SEQ] App->Media:init()

// import { ankh } from "./app/ankh";
import "styl/main";
import { loader, logger, media, renderer, observer } from "core";

type SiteLoadEvent = {
  $ui: HTMLElement;
};

const init = (path: string) => {
  loader.loadSite(path);
  renderer.render();
};

logger.title("ANKHORAGE");

// [1] init core modules
loader.init();
media.init();
renderer.init();

// [2] init site
init(location.pathname);

// [3] listen for site requests
observer.l({
  name: "core-site-load",
  handler: (event: SiteLoadEvent) => {
    console.info("siteLoadEvent:", event);
    const { $ui } = event;
    const href = $ui.getAttribute("href");

    return href
      ? init(href)
      : logger.error("core-site-load called without 'href'");
  },
});
