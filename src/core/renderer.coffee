#
# CORE renderer
#
import { $$, loader, logger, media, observer } from "core"

export renderer =
  (->
    $ankh = undefined

    renderDeferred = ($ui) ->
      $placeholder = $$("#_#{$ui.id}")[0]

      # [1] keep eventual children placeholders
      $placeholder.childNodes?.forEach (childNode) =>
        $ui.appendChild $placeholder.removeChild childNode

      # [2] render the received ui
      $placeholder.replaceWith $ui

      # [3] notify subscribers (e.g. lang update)
      observer.f "core-renderer-rendered"
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

    init: ->
      $ankh = $$("#ankh")[0]

      observer.l "core-loader-ui-ready", renderDeferred
      observer.l "ankh-viewport", updateVisibility
      return
    render: ->
      logger.groupCollapsed "Renderer"

      mapLoaded = loader.getAllLoaded()
      $df = document.createDocumentFragment()

      mapLoaded.forEach (loadedUi) =>
        { $ui, parentId } = loadedUi
        ($$("##{parentId}", $df)[0] or $df).appendChild $ui

      $ankh.innerHTML = ""
      $ankh.appendChild $df

      observer.f "core-renderer-rendered"

      console.groupEnd()
      return
  )()
