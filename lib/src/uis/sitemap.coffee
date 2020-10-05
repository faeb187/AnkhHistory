###
  UI SITEMAP
  @desc   adds individual sitemap params and inits UI nav
  @author faeb187
###
module.exports = (->

  #
  # PRIVATE
  #
  Ui      = nav: require './nav'
  Conf    = nav: require '../conf/nav'
  $$      = require '../helpers/dom'
  ui      =

    $tpl: $$ '<section/>', 'class': 'ui-sitemap'

  #
  # PUBLIC
  #
  return {

    # @DESC init sitemap
    init: ( opt ) ->
      opt = opt or {}
      opt.type = 'sitemap'

      navC = Conf.nav
      if !navC then return

      # INIT UI nav with type sitemap
      # (extend options from UI nav)
      Ui.nav.init $$.extend navC, opt
  }
)()
