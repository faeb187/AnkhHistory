# require "browsernizr/test/proximity"
# require "browsernizr/test/battery"
# require "browsernizr/test/ambientlight"
# require "browsernizr/test/notification"
import { Modernizr } from "browsernizr"

import { ankh } from "./app/ankh"
import { eventer, media, site, obs } from "./core"

document.title = ankh.title

media.init()
site.init()
eventer.init()
