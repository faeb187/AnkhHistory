###
  @CONF   navResponsive
  @AUTHOR faeb187
###
nav = require './nav'
navResponsive = JSON.parse JSON.stringify nav
navResponsive.id = 'navResponsive'

module.exports = navResponsive
