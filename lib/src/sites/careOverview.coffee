design = require "../designs/bekb"

careO = JSON.parse JSON.stringify design
careO.ids[1].ids[0].ids[1].ids = [
  id: "careIframePending", name: "iframe", src: "localhost:5000"
]

export careOverview = careO
