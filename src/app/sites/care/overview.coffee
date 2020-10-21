import { dbp } from "../../designs/dbp"

_careOverview = JSON.parse JSON.stringify dbp
_careOverview.ids[1].ids[0].ids[1].ids = [
  id: "careIframePending", ui: "iframe", src: "http://localhost:4000/graphql"
]

export careOverview = _careOverview
