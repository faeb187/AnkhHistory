(->
  # ANKH config
  ANKH =
    title: "BeKB"
    networkAdapter: "apollo"

  # REQUIRE npm modules
  require 'browsernizr/test/proximity'
  require 'browsernizr/test/battery'
  require 'browsernizr/test/ambientlight'
  require 'browsernizr/test/notification'
  Modernizr = require 'browsernizr'

  # REQUIRE local files
  site= require './helpers/site'
  
  document.title = ANKH.title
  
  site.load location.pathname
)()
