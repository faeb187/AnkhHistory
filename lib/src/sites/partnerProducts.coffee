design = require "../designs/bekb"

partnerP = JSON.parse JSON.stringify design
partnerP.ids[1].ids[0].ids[1].ids = []

export partnerProducts = partnerP
