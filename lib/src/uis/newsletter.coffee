###
  UI NEWSLETTER
  @desc   inits UI form (email & submit)
  @author faeb187
###
module.exports = (->

  #
  # PRIVATE
  #
  Ui  = form: require './form'

  #
  # PUBLIC
  #
  return {

    # @DESC init newsletter
    init: ( opt ) ->
      opt       = opt or {}
      opt.type  = 'newsletter'

      # APPEND email field to form options
      opt.ids = [ id: 'email' ]

      # INIT UI form with type newsletter
      Ui.form.init opt
  }
)()
