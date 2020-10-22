export logger =
  (->
    info: (...messages) -> console.info ...messages
    error: (...messages) -> console.error ...messages
    title: (title) ->
      console.log "log", ""
      console.log "log", title
    group: console.group
    groupEnd: console.groupEnd
  )()
