###
  UI list
  @AUTHOR faeb187
###
module.exports = (->

  # @REQUIRE local modules
  # @PRIVATE
  $$      = require '../helpers/dom'
  obs     = require '../helpers/obs'
  state   = require '../helpers/state'
  hammer  = require 'hammerjs'

  # @DEFINE ui  {json}  UI variables/methods
  # @PRIVATE
  ui  =
    # @DESC   returns nesting level count of the list
    # @PARAM  MAN rootItms {json[]} root list items
    getLevelCount: (rootItms) ->
      levelCount = 0
      countLevel = ( itms ) ->
        itms.some ( itm ) ->
          if itm.items then countLevel itm.items
          return levelCount++

      countLevel rootItms
      levelCount

    # @DESC   updates parent active a elements
    # @PARAM  $act  MAN {HTMLElement} most nested active a
    updateParentActive: ( $act ) ->
      $parentLi = $$.parent ($$.parent $act ), 'li'
      if !$parentLi then return

      $parentAct = $$ 'a', $parentLi
      $$.addClass $parentAct, 'active'

    # @DESC   updates active list items
    # @PARAM  $ui {HTMLElement} root list
    updateActive: ( rootId, routingMap ) ->
      pth = location.pathname
      rootSel = '#' + rootId
      actSel = rootSel + "_" + routingMap.get pth
      $act = $$ actSel, $$ rootSel

      # UPDATE active item and its active parents 
      $$.addClass $act, 'active'
      if pth.split("/").length > 1 then ui.updateParentActive $act


    # @DESC   creates routing/id map
    # @PARAM  MAN {itms} list items
    createRoutingMap: ( itms ) ->
      routingMap = new Map()

      handleSubs = (subItms) ->
        subItms.map (subItm) ->
          routingMap.set subItm.path, subItm.id
          if subItm.items then handleSubs subItm.items

      itms.map ( itm ) ->
        routingMap.set itm.path, itm.id
        if itm.items then handleSubs itm.items

      routingMap

    # @DESC   adds list item to list
    # @PARAM  itm                   MAN {json}    list item
    # @PARAM  itm.lang              MAN {string}  lang ref (text or img alt)
    # @PARAM  itm.path              MAN {string}  href
    # @PARAM  itm.type              OPT {string}  adds data-[ type ] = true
    # @PARAM  itm.src               OPT {string}  image src attribute
    # @PARAM  itm.icon              OPT {string}  icon class name
    # @PARAM  itm.events            OPT {json}    custom events
    # @PARAM  itm.events.click      OPT {[json]}  list of 'click' events
    # @PARAM  itm.events.click.ev   OPT {string}  custom event name
    # @PARAM  itm.events.click.arg  OPT {*}       event handler param
    # @PARAM  itms                  OPT {todo}    sub items
    # @PARAM  $ul                   MAN {node}    list parent ul (li target)
    # @TODO   only <a> when click event
    addListItem: ( itm, $ul) ->
      id  = itm.id
      itm = itm or {}
      evs = itm.events
      lang= itm.lang
      src = itm.src
      icon= itm.icon
      href= itm.path
      type= itm.type
      subItms= itm.items

      # MANDATORY lang
      if !lang then return

      # MARKUP list item
      $li = $$ '<li/>'

      if src then $itm = $$ '<img/>', src: src
      else        $itm = $$ '<a/>', id: $ul.rootId + '_' + id
      
      if href then $itm.setAttribute "href", href

      $itm.setAttribute 'data-lang', lang

      if type then $itm.setAttribute 'data-' + type, true
      if icon then $itm.appendChild $$ '<i/>', 'class': icon

      # BIND custom events
      if evs
        $itm.events = evs

        if evs.click
          $itm.onclick = ui.evs.click

          # hand      = hammer $itm
          # hand.add  new hammer.Tap
          # hand.on   'tap', ui.evs.click

      # HANDLE sub items
      if subItms
        $subUl = $$ '<ul/>'
        $subUl.rootId = $ul.rootId
        for subItm in subItms
          if evs then subItm.events = evs
          ui.addListItem subItm, $subUl
        $li.appendChild $subUl

      # APPEND list item to list
      $li.prepend $itm
      $ul.appendChild $li

      return

    # @DEFINE evs {json}  UI events
    evs   :

      # @DESC   fire custom 'click' events
      # @PARAM  e   MAN {event} 'click' event
      # @RETURN {void}
      click : ( e ) ->
        e.preventDefault()

        $elm = e.target
        if $elm.tagName is 'I' then $elm = $$.parent $elm
        
        # FIND custom 'click' events
        evs = $elm.events  or {}
        evs = evs.click

        # NO custom 'click' events
        if !evs or !evs.length then return

        # FIRE custom 'click' events
        obs.f ev.ev, ev.arg or e for ev in evs

  return {

    # @DESC   inits a new list
    # @PARAM  opt.events        OPT {json}      events
    # @PARAM  opt.id            MAN {string}    UI id
    # @PARAM  opt.items         MAN {[json]}    array containing list items
    # @PARAM  opt.target        MAN {node}      target node
    # @RETURN {void}
    # @PUBLIC
    init: ( opt ) ->
      opt     = opt         or {}
      evs     = opt.events  or {}
      id      = opt.id
      itms    = opt.items   or []
      fx      = opt.fx      or {}
      $t      = opt.target


      # MANDATORY (lang ref or icon), id, list items & target
      if !id or !itms.length or !$t then return

      id = "ui-list-" + id

      # CREATE node
      $ui = $$ '<ul/>', id: id, class: 'ui-list'
      $ui.rootId = id
      levelCount = ui.getLevelCount itms
      routingMap = ui.createRoutingMap itms
      
      # APPEND list items
      itms.map ( itm ) ->
        itm.events = itm.events or evs
        ui.addListItem itm, $ui

      # TMP append UI styles from conf
      $$.css $ui, opt.styl

      # APPEND UI to target
      $t.appendChild $ui
      
      obs.l 'ankh-ready', ->
        $$.addClass $ui, 'ui-fx-show'
        ui.updateActive id, routingMap

      return
  }
)()
