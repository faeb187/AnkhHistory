import { dbp } from "../designs/dbp"

reportsO = JSON.parse JSON.stringify dbp
reportsO.ids[1].ids[0].ids[1].ids = []

export reportsOverview = reportsO
