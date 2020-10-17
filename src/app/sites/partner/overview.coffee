import { dbp } from "../../designs/dbp"

_overview = JSON.parse JSON.stringify dbp
_overview.ids[1].ids[0].ids[1].ids = []

export overview = _overview
