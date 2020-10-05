###
  STATE OF MINED
  @author faeb187
###
module.exports = (->

  #
  # PRIVATE
  #
  
  # DEFINE variables
  state   = {}
  prefix  = location.host + '-'
  ls      =

    # @DESC   set/update item in localStorage
    # @PARAM  id    MAN {string}  id of UI
    # @PARAM  state MAN {object}  current state
    # @RETURN {void}
    set: ( id, state ) ->
      if !id or !state then return
      if typeof state isnt 'string' then state = JSON.stringify state
      localStorage.setItem prefix + id, state
      return

    # @DESC   get item from localStorage
    # @PARAM  id  MAN {string}  id of UI
    # @RETURN {json|null}       current UI state or null
    get: ( id ) ->
      if !id then return
      s = localStorage.getItem prefix + id
      if s and s.slice( 0, 1 ) is '{' then JSON.parse s else s

    # @DESC   remove item from localStorage
    # @PARAM  id    MAN {string}  id of UI
    # @RETURN {void}
    rm: ( id ) ->
      if !id then return
      localStorage.removeItem prefix + id
      return

  #
  # PUBLIC
  #
  return {

    # @DESC   set/update UI state
    # @PARAM  opt.id    MAN {string}  id of UI
    # @PARAM  opt.state MAN {string}  current state
    # @RETURN {void}
    set: ( opt ) ->
      opt   = opt or {}
      id    = opt.id
      state = opt.state

      # MANDATORY id & state
      if !id or !state then return
      
      # SET state in localStorage
      ls.set id, state

    # @DESC   get current UI state
    # @PARAM  opt.id  MAN {string}  id of UI
    # @RETURN {json}  current UI state or {}
    get: ( opt ) ->
      opt = opt or {}
      id  = opt.id

      # MANDATORY id
      if !id then return
      
      # GET state from localStorage
      ls.get( id )

    # @DESC   remove UI state
    # @PARAM  opt.id  MAN {string} id of UI
    # @RETURN {void}
    rm: ( opt ) ->
      opt = opt or {}
      id  = opt.id

      # MANDATORY id
      if !id then return

      ls.rm id
  }
)()
