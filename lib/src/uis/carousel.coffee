###
  UI carousel
###
module.exports = (->
  $$ = require '../helpers/dom'
  obs = require '../helpers/obs'

  # @DESC   build new carousel
  # @PARAM  opt.id        MAN {string}  UI id
  # @PARAM  opt.items     MAN {[json]}  array of images
  # @PARAM  opt.target    MAN {string}  target node
  init = (opt) ->
    {id, items, target: $t} = opt
    
    if !id or !items or !$t then return
    
    $ui = $$ '<section/>', id: id, 'class': 'ui-carousel'
    $carousel = $$ '<div/>'

    # CALC carousel parts
    itemsLen = items.length
    deg = 0
    ratio = 360 / itemsLen

    # CALC z translation
    z = Math.round(210 / 2) / Math.tan Math.PI / itemsLen

    items.map (item) ->
      # set the items y rotation and z translation
      trf   = 'transform:rotateY(' + deg + 'deg) translateZ(' + z + 'px)'
      deg  += ratio

      # create thumbnail
      $thumb= $$ '<img/>'   , src   : item.thumb
      $fig  = $$ '<figure/>', style : trf

      # append thumbnail to carousel
      $fig.appendChild      $thumb
      $carousel.appendChild $fig

    $ui.appendChild $carousel
    $t.appendChild  $ui
    obs.f 'ankh-ui-ready', 'ui-carousel'
    return

  obs.l 'ui-carousel-init', init
)()