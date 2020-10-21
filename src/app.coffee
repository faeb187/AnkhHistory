# require "browsernizr/test/proximity"
# require "browsernizr/test/battery"
# require "browsernizr/test/ambientlight"
# require "browsernizr/test/notification"
import { Modernizr } from "browsernizr"

import { ankh } from "./app/ankh"
import { obs } from "./core/obs"
import { site } from "./core/site"
import { eventer } from "./core/eventer"

document.title = ankh.title

site.init()
eventer.init()
