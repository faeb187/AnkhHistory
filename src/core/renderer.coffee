#
# CORE renderer
#
import { $$, loader, logger, media, observer } from "core"

export renderer =
  (->
    $b = null

    renderDeferred = ($ui) ->
      $placeholder = $$ "#_#{$ui.id}"

      # [1] keep eventual children placeholders
      $placeholder.childNodes?.forEach (childNode) =>
        $ui.appendChild $placeholder.removeChild childNode

      # [2] render the received ui
      $placeholder.replaceWith $ui
      return

    updateVisibility = ->
      loader
        .getAllLoaded()
        .forEach (loadedUi) =>
          { $ui, uiOptions: { media: m } } = loadedUi
          if m
            before = $ui.getAttribute "data-fx"
            after = (media.isInViewport(m) && "in") || "out"
            if before isnt after then $ui.setAttribute "data-fx", after
          return
      return

    #

    init: ->
      $b = $$ "body"
      observer.l "core-loader-ui-ready", renderDeferred
      observer.l "ankh-viewport", updateVisibility
      return

    render: ->
      logger.groupCollapsed "Renderer"

      mapLoaded = loader.getAllLoaded()

      siteName = location.pathname.slice(1).replace /\//g, "-"

      $df = document.createDocumentFragment()
      $ankh = $$ "<div/>", id: "ankh"
      $df.appendChild $ankh

      mapLoaded.forEach (loadedUi) =>
        { $ui, parentId } = loadedUi
        $$("##{parentId}", $df).appendChild $ui

      $$("#ankh").replaceWith $df
      $$("body").setAttribute "data-site", siteName

      observer.f "core-renderer-rendered"

      logger.groupEnd()
      return
  )()
