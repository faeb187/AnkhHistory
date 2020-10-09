module.exports = (->
  bps =
    xs: 400
    s : 600
    m : 800
    l : 1050
    xl: 1800

  medias = {}

  return
    get: -> medias

    # @PARAM uis  {json[]}  all ui confs (flattened)
    set: (uis) ->
      medias = {}

      uis.map (ui) ->
        media = ui.media or {}
        id = ui.id
        
        min = bps[media.min]
        max = bps[media.max]

        if min isnt undefined or max isnt undefined
          medias[id] = {}
          if min isnt undefined then medias[id].min = min
          if max isnt undefined then medias[id].max = max
      return
)()