#
# ANKH
# @todo no direct access between CORE modules (handle it here)
#
import { ankh } from "./app/ankh"
import { eventer, loader, logger, media, renderer, observer } from "core"

init = (path) ->
  loader.loadSite path
  renderer.render()
  return

logger.title "ANKHORAGE"

# [1] init core modules
eventer.init()
loader.init()
media.init()
renderer.init()

# [2] init site
init location.pathname

# [3] listen for site requests
observer.l "core-site-load", (options) ->
  init options.event.target.getAttribute "href"
