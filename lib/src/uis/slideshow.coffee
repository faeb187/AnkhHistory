###
  @UI     SLIDESHOW
  @AUTHOR faeb187
###
module.exports = (->
  
  # @REQUIRE local modules
  $$ = require '../helpers/dom'
  
  # @DEFINE $ui {node}  UI node
  $ui = null

  # @DEFINE ui  {json}  UI variables/methods
  # @PRIVATE
  ui =

    # @DEFINE $tpl  {node}  UI template
    $tpl: $$ '<section/>', 'class': 'ui-slideshow'

    # @DESC   appends image to slideshow
    # @PARAM  img     MAN {json}  image
    # @PARAM  $ul     MAN {node}  image target
    addImage: ( img, $ul ) ->

      # DEFINE variables
      img   = img or {}
      src   = img.src
      alt   = img.alt
      title = img.title
      txt   = img.text
      
      # MANDATORY src & target
      if !src or !alt or !$ul then return

      # APPEND image to slider
      $li = $$ '<li/>'
      $img= $$ '<img/>',
        src         : src
        'data-href' : alt

      # APPEND title / text
      if title  then $li.append $$ '<h1/>', 'data-lang': title
      if txt    then $li.append $$ '<p/>' , 'data-lang': txt

      $li.appendChild $img
      $ul.appendChild $li

      return

    # @DESC   handle nav toggle (open/close slide)
    # @PARAM  int   OPT {number}  interval of slides
    # @PARAM  $ul   MAN {node}    image target node
    slide: ( int, $ul ) ->
      
      # DEFINE variables
      itmC  = $$( 'li', $ul ).length
      maxL  = itmC * -100
      pos   = 0
      
      # START slide interval
      setInterval ->

        # GET next position
        pos -= 100

        # LAST image
        if pos is maxL then pos = 0

        # SLIDE to next image
        $$.css $ul, marginLeft: pos + 'vw'

      , int

      return
 
  return {

    # @DESC   build new slideshow
    # @PARAM  opt.id              MAN {string}  UI id
    # @PARAM  opt.items           MAN {array}   images
    # @PARAM  opt.items.$.src     MAN {string}  image path
    # @PARAM  opt.items.$.active  OPT {boolean} default image
    # @PARAM  opt.items.$.title   OPT {string}  lang ref
    # @PARAM  opt.items.$.text    OPT {string}  lang ref
    # @PARAM  opt.interval        OPT {number}  interval in ms
    # @PARAM  opt.target          MAN {node}    target node
    init: ( opt ) ->
      opt   = opt or {}
      id    = opt.id
      itms  = opt.items
      $t    = opt.target
      int   = opt.interval or 8000

      # MANDATORY id, items & target
      if !id or !itms or !$t then return

      # MARKUP slideshow
      $ui = ui.$tpl.cloneNode()
      $ui.id = id
      $ul = $$ '<ul/>'

      # APPEND images to slideshow
      ui.addImage itm, $ul for itm in itms

      # APPEND UI to target
      $ui.appendChild $ul
      $t.appendChild $ui

      # SLIDE images
      ui.slide int, $ul

      return
  }
)()
