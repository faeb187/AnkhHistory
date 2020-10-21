#
# CORE loader
#

# import { measure } from "./analytics"
import { $$ } from "./dom"
import { obs } from "./obs"
import { isInViewport } from "./media"
import * as uis from "../uis"

$ankh = null
mapLoaded = new Map()
mapNotLoaded = new Map()

updateLoaded = =>
  mapLoaded.forEach (loadedUi) =>
    { $ui, uiOptions: { media } } = loadedUi

    if !media then return

    $ui.setAttribute "data-fx", if isInViewport media then "in" else "out"
    return

updateNotLoaded = =>
  mapNotLoaded.forEach (notLoadedUi, id) =>
    { uiOptions, uiOptions: { media, ui } } = notLoadedUi

    # there is no case (yet) for unloaded without viewport config
    # ...means that's the only thing to check
    if !isInViewport media then return

    $ui = uis[ui].init uiOptions
    if !$ui then return

    $uiPlaceholder = $$ "##{id}-placeholder", $ankh
    $uiPlaceholder.childNodes?.forEach (childNode) => $ui.appendChild childNode
    $uiPlaceholder.replaceWith $ui

    mapLoaded.set id, { uiOptions, $ui }
    mapNotLoaded.delete id
    return

obs.l "ankh-viewport", =>
  updateLoaded()
  updateNotLoaded()
  return

# @desc   initializing of ui's if not yet
# @param  uiOptions MAN {json}        ui configuration
# @return               {HTMLElement} initialized ui
export initUi = (uiOptions) =>
  { id, ui, media, $target } = uiOptions

  if !id or !ui
    throw new Error(
      "[CORE][loader]"
      "'ui' and/or 'id' missing"
      "ui: #{ui} / id: #{id}"
    )

  if $target.id is "ankh" then $ankh = $target

  # already loaded?
  loadedUi = mapLoaded.get id
  if loadedUi then return loadedUi.$ui

  # not in viewport?
  if media and !isInViewport media
    mapNotLoaded.set id, { uiOptions }
    $uiPlaceholder = $$ "<div/>", id: "#{id}-placeholder", "data-fx": "out"
    return $uiPlaceholder

  # load it (all ui's init() only once)
  $ui = uis[ui].init uiOptions
  if !$ui then return

  mapLoaded.set id, { $ui, uiOptions }
  $ui

export getAllLoaded = => mapLoaded
