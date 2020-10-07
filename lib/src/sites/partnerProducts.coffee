design = require '../designs/bekb'

partnerProducts = JSON.parse JSON.stringify design
partnerProducts.ids[1].ids[0].ids[1].ids = []

module.exports = partnerProducts