# require "browsernizr/test/proximity"
# require "browsernizr/test/battery"
# require "browsernizr/test/ambientlight"
# require "browsernizr/test/notification"
import { Modernizr } from "browsernizr"

import { site } from "./core"
import { ankh } from "./ankh"
import {
  accordion
  carousel
  details
  html
  iframe
  icon
  lang
  list
  nav
  search
  select
  slider
  table
} from "./uis"

document.title = ankh.title

site.load location.pathname
