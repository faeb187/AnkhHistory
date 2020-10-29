#
# CORE logger
#
export logger =
  (->
    error: (...messages) -> console.error ...messages
    info: (...messages) -> console.info ...messages
    log: (...messages) -> console.log ...messages
    title: (title) ->
      console.log ""
      console.log "%c #{title} ", "background: #fff; color: #000"
    warn: (...messages) -> console.warn ...messages
    group: console.group
    groupCollapsed: console.groupCollapsed
    groupEnd: console.groupEnd
  )()
