import { $$ } from "./dom"
import { obs } from "./obs"

# breakpoints
# [!] in sync with rupture
bps =
  xs: 0
  s: 400
  m: 500
  l: 800
  xl: 1050
  hd: 1800

viewport = ""

throttle =
  delay: 100
  active: false

getViewportName = (vpW) =>
  if vpW >= 0 and vpW < 400 then return "xs"
  if vpW >= 400 and vpW < 500 then return "s"
  if vpW >= 500 and vpW < 800 then return "m"
  if vpW >= 800 and vpW < 1050 then return "l"
  if vpW >= 1050 and vpW < 1800 then return "xl"
  return "hd"

handleResize = (event) ->
  obs.f "ankh-resize", event

  vpW = window.innerWidth
  viewportBefore = viewport
  viewport = getViewportName vpW
  if viewport isnt viewportBefore
    obs.f "ankh-viewport", viewport
  return

export isInViewport = (media = {}) ->
  vpW = window.innerWidth
  min = bps[media.min]
  max = bps[media.max]

  if min and vpW <= min then return false
  if max and vpW > max then return false
  return true

$$.listen window, "resize", =>
  if !throttle.active
    handleResize()
    throttle.active = true

    setTimeout (=> throttle.active = false), throttle.delay
  clearTimeout lastResize
  lastResize = setTimeout (=> handleResize), throttle.delay
