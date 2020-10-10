(->
  require "browsernizr/test/proximity"
  require "browsernizr/test/battery"
  require "browsernizr/test/ambientlight"
  require "browsernizr/test/notification"
  Modernizr = require "browsernizr"

  require "./uis/accordion"
  require "./uis/carousel"
  require "./uis/details"
  require "./uis/html"
  require "./uis/iframe"
  require "./uis/icon"
  require "./uis/lang"
  require "./uis/list"
  require "./uis/nav"
  require "./uis/search"
  require "./uis/select"
  require "./uis/slider"
  require "./uis/table"

  ankh = require "./ankh"
  site = require "./helpers/site"

  document.title = ankh.title

  site.load location.pathname
)()
