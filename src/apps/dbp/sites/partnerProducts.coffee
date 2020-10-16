import { dbp } from "../designs/dbp"

partnerP = JSON.parse JSON.stringify dbp
partnerP.ids[1].ids[0].ids[1].ids = []

export partnerProducts = partnerP
