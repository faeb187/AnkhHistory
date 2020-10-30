#
# ANKH
# @todo no direct access between CORE modules (handle it here)
#

# require "browsernizr/test/proximity"
# require "browsernizr/test/battery"
# require "browsernizr/test/ambientlight"
# require "browsernizr/test/notification"
import { Modernizr } from "browsernizr"

import { ankh } from "./app/ankh"
import { eventer, loader, logger, media, renderer, site, observer } from "core"

init = (path) ->
  site.load path
  loader.load()
  renderer.render()
  return

# @todo flexible title per site
document.title = ankh.title

logger.title "ANKHORAGE"

# [1] init core modules
eventer.init()
loader.init()
media.init()
renderer.init()
site.init()

# [2] init site
init location.pathname

# [3] listen for site requests
observer.l "core-site-load", (options) ->
  init options.event.target.getAttribute "href"
