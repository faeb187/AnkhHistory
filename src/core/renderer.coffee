#
# CORE renderer
#
import { $$, loader, logger, observer } from "core"

export renderer =
  (->
    $b = null
    init: -> $b = $$ "body"
    render: ->
      logger.groupCollapsed "Renderer"

      mapLoaded = loader.getAllLoaded()
      mapNotLoaded = loader.getAllNotLoaded()
      logger.log "%cloaded%c #{mapLoaded.size}", "color: #0f0", "color: #fff"
      logger.log(
        "%cdeferred%c #{mapNotLoaded.size}"
        "color: #ff0"
        "color: #ƒff"
      )

      $df = document.createDocumentFragment()
      $ankh = $$ "<div/>", id: "ankh"
      $df.appendChild $ankh

      mapLoaded.forEach (loadedUi, index) =>
        { $ui, parentId } = loadedUi

        logger.log "ui:", $ui.id, "parentId:", parentId

        $$("##{parentId}", $df).appendChild $ui

      $$("#ankh").replaceWith $df
      $$("body").setAttribute(
        "data-site"
        location.pathname.slice(1).replace /\//g, "-"
      )

      observer.f "core-renderer-rendered"

      logger.groupEnd()
      return
  )()
