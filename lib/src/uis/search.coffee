###
  UI search
###
import { $$ } from "../helpers/dom"
import { obs } from "../helpers/obs"

module.exports =
  (->
    # @desc   build new search box
    # @param  opt.placeholder   {string}      lang reference
    # @param  opt.target        {HTMLElement} ui target
    init = (opt) ->
      { id, placeholder, target: $t } = opt
      if !id or !$t then return

      $ui = $$ "<input/>", id: id, class: "ui-search", type: "search"
      if placeholder then $ui.setAttribute "data-lang", placeholder

      $t.appendChild $ui
      obs.f "ankh-ui-ready", "ui-search"
      return

    obs.l "_ui-search-init", init
  )()
