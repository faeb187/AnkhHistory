#
# CORE loader
#

# import { measure } from "./analytics"
import { $$ } from "./dom"
import { obs } from "./obs"
import { media } from "./media"
import * as uis from "../uis"
import { logger } from "./logger"

export loader =
  (->
    $ankh = null
    mapLoaded = new Map()
    mapNotLoaded = new Map()

    updateLoaded = ->
      mapLoaded.forEach (loadedUi) =>
        { $ui, uiOptions: { media: m } } = loadedUi
        if m
          $ui.setAttribute "data-fx",
            if media.isInViewport m then "in" else "out"

    updateNotLoaded = ->
      mapNotLoaded.forEach (notLoadedUi, id) =>
        { uiOptions, uiOptions: { media: m, ui } } = notLoadedUi

        # there is no case (yet) for unloaded without viewport config
        # ...means that's the only thing to check
        if !media.isInViewport m then return

        $ui = uis[ui].init uiOptions
        if !$ui
          return logger.error(
            "[CORE][loader]"
            "UI '#{ui}' didn't return itself"
          )

        $uiPlaceholder = $$ "##{id}-placeholder", $ankh
        $uiPlaceholder.childNodes?.forEach (childNode) =>
          $ui.appendChild childNode
        $uiPlaceholder.replaceWith $ui

        mapLoaded.set id, { uiOptions, $ui }
        mapNotLoaded.delete id
        return

    obs.l "ankh-viewport", ->
      updateLoaded()
      updateNotLoaded()
      return

    # @desc   initializing of ui's if not yet
    # @param  uiOptions MAN {json}        ui configuration
    # @return               {HTMLElement} initialized ui
    initUi: (uiOptions) ->
      { id, ui, media: m, $target } = uiOptions

      if !id or !ui
        return logger.error(
          "[CORE][loader]"
          "'ui' and/or 'id' missing: ui: #{ui} / id: #{id}"
        )

      if $target.id is "ankh" then $ankh = $target

      # already loaded?
      loadedUi = mapLoaded.get id
      if loadedUi then return loadedUi.$ui

      # not in viewport?
      if m and !media.isInViewport m
        mapNotLoaded.set id, { uiOptions }
        $uiPlaceholder = $$ "<div/>", id: "#{id}-placeholder", "data-fx": "out"
        return $uiPlaceholder

      # load it (all ui's init() only once)
      $ui = uis[ui].init uiOptions
      if !$ui
        return logger.error(
          "[CORE][loader]"
          "UI '#{uis[ui]}' didn't return itself"
        )

      mapLoaded.set id, { $ui, uiOptions }
      $ui

    getAllLoaded: -> mapLoaded
  )()
