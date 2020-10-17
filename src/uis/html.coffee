#
# UI html
#
import { $$, obs, media } from "../core"

export html =
  (->
    # @REQUIRE local modules
    # @PRIVATE

    # @DESC   builds new html node
    # @PARAM  classNames  OPT {string}  css class names
    # @PARAM  id          MAN {string}  ui id
    # @PARAM  lang        OPT {string}  lang id (i18n)
    # @PARAM  src         OPT {string}  path to image
    # @PARAM  target      MAN {node}    target node
    # @PARAM  text        OPT {string}  innerText (bypass i18n)
    init = (opt) ->
      {
        classNames = ""
        id
        ids = []
        lang
        media: m
        src
        tag = "div"
        text
        target: $t
      } = opt
      if !id or !$t then return
      if m and !media.isInViewport m
        return obs.f "_ankh-ui-not-loaded", opt

      $ui = $$ "<#{tag}/>",
        id: id, class: "ui-html ui-html-#{tag} #{classNames}"

      if src
        $ui.setAttribute "src", src
        $ui.setAttribute "data-lang", lang
      else if lang
        $ui.setAttribute "data-lang", lang
      else if text
        $ui.innerText = text

      ids.forEach (ui) ->
        ui.target = $ui
        obs.f "_ui-#{ui.ui}-init", ui

      $t.appendChild $ui

      obs.f "_ankh-ui-loaded", opt
      obs.f "ankh-ui-ready", "ui-html##{id}"
      return

    obs.l "_ui-html-init", init
    return
  )()
