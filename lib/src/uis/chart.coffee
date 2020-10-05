###
  UI CHART
  @AUTHOR faeb187
###
module.exports = (->

  # @REQUIRE local modules
  $$ = require '../helpers/dom'
 
  # @DEFINE variables
  $ui     = null
  $chart  = null
  draw    =

    # @DESC   draw a pie chart
    # @PARAM  opt.data  MAN {array}   înput data
    # @RETURN {void}
    pie: ( opt ) ->

      opt = opt or {}
      dta = opt.data
      if !dta then return
      
      $chart.className = 'pie'
      $chart.setAttribute 'style', 'animation-delay: -60s'

      return

  return {

    # @DESC     build new diagram
    # @PARAM    opt.id      MAN {string}  UI id
    # @PARAM    opt.type    OPT {string}  chart type
    # @PARAM    opt.target  MAN {string}  target node
    # @RETURN  {void}
    # @PUBLIC
    init: ( opt ) ->
      opt   = opt or {}
      id    = opt.id
      $t    = opt.target
      type  = opt.type or 'row'
      dta   = opt.data

      # MANDATORY id & target
      if !id or !$t then return
     
      # MARKUP chart
      $ui     = $$ '<div/>', 'class': 'ui-chart'
      $chart  = $$ '<div/>'
        
      switch type
        when 'pie' then draw.pie data: dta
      
      # append UI to DOM target
      $ui.appendChild $chart
      $t.appendChild  $ui

      return
  }
)()
