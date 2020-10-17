import { dbp } from "../../designs/dbp"

careO = JSON.parse JSON.stringify dbp
careO.ids[1].ids[0].ids[1].ids = [
  id: "careIframePending", ui: "iframe", src: "localhost:5000"
]

export overview = careO
