###
  UI html
###
module.exports =
  (->
    # @REQUIRE local modules
    # @PRIVATE
    $$ = require "../helpers/dom"
    obs = require "../helpers/obs"

    # @DESC   builds new html node
    # @PARAM  id        MAN {string}  ui id
    # @PARAM  lang      OPT {string}  lang id (i18n)
    # @PARAM  text      OPT {string}  innerText (bypass i18n)
    # @PARAM  src       OPT {string}  path to image
    # @PARAM  target    MAN {node}    target node
    init = (opt) ->
      { id, ids = [], lang, src, tag = "div", text, target: $t } = opt
      if !id or !$t then return

      $ui = $$ "<#{tag}/>", id: id, class: "ui-html"

      if src
        $ui.setAttribute "src", src
        $ui.setAttribute "data-lang", lang
      else if lang
        $ui.setAttribute "data-lang", lang
      else if text
        $ui.innerText = text

      ids.forEach (ui) ->
        ui.target = $ui
        obs.f "ui-#{ui.name}-init", ui

      $t.appendChild $ui

      obs.f "ankh-ui-ready", "ui-html##{id}"
      return

    obs.l "ui-html-init", init
    return
  )()
