design = require '../designs/bekb'

partnerOverview = JSON.parse JSON.stringify design
partnerOverview.ids[1].ids[0].ids[1].ids = []

module.exports = partnerOverview