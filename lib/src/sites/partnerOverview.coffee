design = require "../designs/bekb"

partnerO = JSON.parse JSON.stringify design
partnerO.ids[1].ids[0].ids[1].ids = []

export partnerOverview = partnerO
