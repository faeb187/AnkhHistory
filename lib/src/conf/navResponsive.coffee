###
  @CONF mobile nav
###
nav = require './nav'
navResponsive = JSON.parse JSON.stringify nav
navResponsive.id = 'navResponsive'

module.exports = navResponsive
