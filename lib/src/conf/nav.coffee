###
  @CONF   nav
###
routes = require "./routes"

module.exports =
  id: "nav"
  name: "nav"
  events:
    click: [ev: "_helper-site-load"]
  items: routes
