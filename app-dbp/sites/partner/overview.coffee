import { dbp } from "../../designs/dbp"

_partnerOverview = JSON.parse JSON.stringify dbp
_partnerOverview.ids[1].ids[0].ids[1].ids = []

export partnerOverview = _partnerOverview
