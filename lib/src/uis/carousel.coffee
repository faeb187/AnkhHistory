###
  UI CAROUSEL
  @AUTHOR faeb187
###
module.exports = (->

  # @REQUIRE local modules
  $$ = require '../helpers/dom'
  
  return {

    # @DESC   build new carousel
    # @PARAM  opt.id        MAN {string}  UI id
    # @PARAM  opt.items     MAN {[json]}  array of images
    # @PARAM  opt.target    MAN {string}  target node
    # @RETURN {void}
    # @PUBLIC
    init: ( opt ) ->
      opt   = opt or {}
      id    = opt.id
      itms  = opt.items
      $t    = opt.target

      # MANDATORY id, itms & target
      if !id or !itms or !$t then return

      # MARKUP UI
      $ui       = $$ '<section/>', 'class': 'ui-carousel'
      $carousel = $$ '<div/>'

      # CALC carousel parts
      itmsLen = itms.length
      deg     = 0
      ratio   = 360 / itmsLen

      # CALC z translation
      z = Math.round( 210 / 2 ) / Math.tan Math.PI / itmsLen

      for itm in itms

        # set the items y rotation and z translation
        trf   = 'transform:rotateY(' + deg + 'deg) translateZ(' + z + 'px)'
        deg  += ratio

        # create thumbnail
        $thumb= $$ '<img/>'   , src   : itm.thumb
        $fig  = $$ '<figure/>', style : trf

        # append thumbnail to carousel
        $fig.appendChild      $thumb
        $carousel.appendChild $fig

      # append UI to DOM target
      $ui.appendChild $carousel
      $t.appendChild  $ui

      return
  }
)()
