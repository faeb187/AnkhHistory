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
import { eventer, loader, logger, media, site, obs } from "./core"

document.title = ankh.title

logger.title "ANKHORAGE"

# [1]
# set breakpoints and...
# initiate viewport management
media.init()

# [2]
# build site definition...
# (flattened UI options of one route)
site.init()
site.load location.pathname

# [3]
# load UI's based on site definition
loader.load()

# [4]
# attach events to loaded & visible UI's
eventer.init()

# [5]
# render site
# renderer.render()

# [6]
# listen to site requests and load site
obs.l "core-site-load", (options) ->
  site.load options.event.target.getAttribute "href"
  loader.load()
  # ....?
