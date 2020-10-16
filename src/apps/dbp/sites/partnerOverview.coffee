import { dbp } from "../designs/dbp"

partnerO = JSON.parse JSON.stringify dbp
partnerO.ids[1].ids[0].ids[1].ids = []

export partnerOverview = partnerO
