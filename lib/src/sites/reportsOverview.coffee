design = require "../designs/bekb"

reportsO = JSON.parse JSON.stringify design
reportsO.ids[1].ids[0].ids[1].ids = []

export reportsOverview = reportsO
