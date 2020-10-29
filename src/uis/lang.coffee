#
# UI lang
#
import { $$, observer, state } from "core"
import { de, en } from "../app/i18n"

export lang =
  (->
    # @desc   click event to switch lang # @PARAM  event {Event} click on anchor
    # @param  event MAN {Event} click event of lang switch
    changeLang = (event) ->
      { target: $a } = event

      if !$a then return

      event.preventDefault()
      observer.f "ui-lang-update", lang: $a.getAttribute "lang"

      $$.removeClass $$(".active", $a.parentNode), "active"
      $a.className = "active"
      return

    def = "de"
    lib = de: de, en: en

    # @DESC   build new language switcher
    # @PARAM  opt.id      MAN {string}  UI id
    # @RETURN {void}
    init: (opt) ->
      { id, style = {} } = opt

      if !id then return

      lang = state.get({ id }) or def

      $ui = $$ "<nav/>", id: id, class: "ui-lang"

      $$.style $ui, style

      # iterate through language lib
      idx = 0
      for k, v of lib
        $a = $$ "<a/>",
          rel: "alternate"
          hreflang: k
          lang: k

        $a.innerText = k

        if k is lang then $a.className = "active"

        $$.listen $a, "click", changeLang
        $ui.appendChild $a

      observer.l "ui-lang-update", @update
      observer.l "core-renderer-rendered", @update

      $ui

    # @DESC   update language
    # @PARAM  opt.lang  OPT {string}  language code
    # @RETURN {void}
    update: (opt = {}) ->
      { lang = "" } = opt

      # language by priority
      # ( direct change > localStorage > default )
      # !TODO language by geolocation
      lang = lang or state.get(id: "lang") or def

      # update elements
      for elm, index in $$ "[data-lang]"
        v = lib[lang][elm.getAttribute "data-lang"]

        if elm.getAttribute "data-lang-rendered"
          elm.setAttribute "data-lang-rendered", v
        else if elm.tagName is "IMG"
          elm.setAttribute "alt", v
        else if elm.tagName is "INPUT"
          elm.setAttribute "placeholder", v
        else
          elm.innerHTML = v

      $$("html").setAttribute "lang", lang

      state.set id: "lang", state: lang
      # observer.l "_ankh-viewport-changed", update
      observer.f "ui-lang-updated"
      return
  )()
