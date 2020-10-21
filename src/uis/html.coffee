#
# UI html
#
import { $$, obs } from "../core"

export html =
  (=>
    # @REQUIRE local modules
    # @PRIVATE

    # @DESC   builds new html node
    # @PARAM  classNames  OPT {string}  css class names
    # @PARAM  id          MAN {string}  ui id
    # @PARAM  lang        OPT {string}  lang id (i18n)
    # @PARAM  src         OPT {string}  path to image
    # @PARAM  text        OPT {string}  innerText (bypass i18n)
    init: (options) =>
      { classNames = "", id, lang, src, tag = "div", text } = options
      if !id then return

      $ui = $$ "<#{tag}/>",
        id: id, class: "ui-html ui-html-#{tag} #{classNames}"

      if src
        $ui.setAttribute "src", src
        $ui.setAttribute "data-lang", lang
      else if lang
        $ui.setAttribute "data-lang", lang
      else if text
        $ui.innerText = text
      $ui
  )()
