#
# CORE renderer
#
import { $$ } from "./dom"
import { loader } from "./loader"
import { logger } from "./logger"

export renderer =
  (->
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

        $$("##{parentId}", $df).appendChild $ui.cloneNode true

      $$("#ankh").replaceWith $df

      logger.groupEnd()
      return
  )()
