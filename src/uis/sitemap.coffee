#
# UI sitemap
#
import { $$ } from "../core"

export sitemap =
  (->
    #
    # PRIVATE
    #
    Ui = nav: require "./nav"
    Conf = nav: require "../conf/nav"
    ui = $tpl: $$ "<section/>", class: "ui-sitemap"

    #
    # PUBLIC
    #
    return (
      # @DESC init sitemap


        init: (opt) ->
          opt = opt or {}
          opt.type = "sitemap"

          navC = Conf.nav
          if !navC then return

          # INIT UI nav with type sitemap
          # (extend options from UI nav)
          Ui.nav.init $$.extend navC, opt
    )
  )()
