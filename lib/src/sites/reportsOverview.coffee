design = require '../designs/bekb'

reportsOverview = JSON.parse JSON.stringify design
reportsOverview.ids[1].ids[0].ids[1].ids = [{id: 'reportsTodo'}]

module.exports = reportsOverview